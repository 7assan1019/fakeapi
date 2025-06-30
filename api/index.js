// Import necessary Node.js modules for file handling
const path = require('path');
const fs = require('fs').promises;

// The main handler function for all API requests
module.exports = async (req, res) => {
    // Set CORS headers to allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate'); // Cache for 1 minute

    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const dataDir = path.join(process.cwd(), '_data');
        
        // --- Route Handling Logic ---

        // 1. Handle /api/health for health checks
        if (url.pathname === '/api/health') {
            return res.status(200).json({
                status: 'ok',
                timestamp: new Date().toISOString(),
                region: process.env.VERCEL_REGION || 'local'
            });
        }
        
        // 2. Handle /api/db to return all data combined
        else if (url.pathname === '/api/db') {
            const files = await fs.readdir(dataDir);
            const allData = {};
            
            for (const file of files) {
                if (file.endsWith('.json')) {
                    const resourceName = file.replace('.json', '');
                    const filePath = path.join(dataDir, file);
                    const fileContent = await fs.readFile(filePath, 'utf8');
                    allData[resourceName] = JSON.parse(fileContent);
                }
            }
            return res.status(200).json(allData);
        }
        
        // 3. Handle /api to list all available endpoints for the explorer
        else if (url.pathname === '/api' || url.pathname === '/api/') {
            const files = await fs.readdir(dataDir);
            const endpoints = files
                .filter(file => file.endsWith('.json'))
                .map(file => `/api/${file.replace('.json', '')}`);
            return res.status(200).json({ endpoints });
        }
        
        // 4. Handle all other resource requests (e.g., /api/users, /api/products/1)
        else {
            const pathParts = url.pathname.split('/').filter(p => p);

            if (pathParts[0] !== 'api' || pathParts.length < 2) {
                return res.status(404).json({ error: 'Resource not found. Use /api/[resource]' });
            }

            let primaryResourceName = pathParts[1];
            const primaryResourceId = !isNaN(pathParts[2]) ? parseInt(pathParts[2], 10) : null;
            const nestedResourceName = primaryResourceId ? pathParts[3] : null;

            const dataPath = path.join(dataDir, `${primaryResourceName}.json`);
            let data;
            try {
                const fileContent = await fs.readFile(dataPath, 'utf8');
                data = JSON.parse(fileContent);
            } catch (error) {
                return res.status(404).json({ error: `Resource '${primaryResourceName}' not found.` });
            }
            
            let result = [...data];

            if (nestedResourceName) {
                const nestedDataPath = path.join(dataDir, `${nestedResourceName}.json`);
                let nestedData;
                try {
                    const nestedFileContent = await fs.readFile(nestedDataPath, 'utf8');
                    nestedData = JSON.parse(nestedFileContent);
                } catch (error) {
                    return res.status(404).json({ error: `Nested resource '${nestedResourceName}' not found.` });
                }
                const foreignKey = `${primaryResourceName.slice(0, -1)}Id`;
                result = nestedData.filter(item => item[foreignKey] === primaryResourceId);
            } 
            else if (primaryResourceId) {
                const item = result.find(d => d.id === primaryResourceId);
                return item ? res.status(200).json(item) : res.status(404).json({ error: 'Item not found' });
            }

            const query = url.searchParams;
            const searchQuery = query.get('q');
            if (searchQuery) {
                const lowerCaseQuery = searchQuery.toLowerCase();
                result = result.filter(item => 
                    Object.values(item).some(value => 
                        String(value).toLowerCase().includes(lowerCaseQuery)
                    )
                );
            }

            query.forEach((value, key) => {
                if (!key.startsWith('_') && key !== 'q') {
                    if(key.endsWith('_gte')) {
                        const field = key.replace('_gte', '');
                        result = result.filter(item => item[field] >= parseFloat(value));
                    } else if(key.endsWith('_lte')) {
                         const field = key.replace('_lte', '');
                        result = result.filter(item => item[field] <= parseFloat(value));
                    } else if(key.endsWith('_ne')) {
                         const field = key.replace('_ne', '');
                        result = result.filter(item => String(item[key]) !== value);
                    }
                    else {
                        result = result.filter(item => String(item[key]) === value);
                    }
                }
            });

            const sortKey = query.get('_sort');
            if (sortKey) {
                const order = query.get('_order')?.toLowerCase() === 'desc' ? -1 : 1;
                result.sort((a, b) => {
                    if (a[sortKey] < b[sortKey]) return -1 * order;
                    if (a[sortKey] > b[sortKey]) return 1 * order;
                    return 0;
                });
            }

            const page = parseInt(query.get('_page'), 10) || 1;
            const limit = parseInt(query.get('_limit'), 10) || result.length;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            result = result.slice(startIndex, endIndex);

            return res.status(200).json(result);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An internal server error occurred' });
    }
};
