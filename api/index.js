// Import necessary Node.js modules for file handling
const path = require('path');
const fs = require('fs').promises;

// The main handler function for all API requests
module.exports = async (req, res) => {
    // Set CORS headers to allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache for 1 day

    try {
        // --- 1. Parse Request URL ---
        // Example URL: /api/users/1/posts?_sort=date&_limit=5
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathParts = url.pathname.split('/').filter(p => p); // -> ['api', 'users', '1', 'posts']

        // Check if it's a valid API request
        if (pathParts[0] !== 'api' || pathParts.length < 2) {
            return res.status(404).json({ error: 'Resource not found. Use /api/[resource]' });
        }

        // --- 2. Determine Resources ---
        let primaryResourceName = pathParts[1]; // -> 'users'
        const primaryResourceId = !isNaN(pathParts[2]) ? parseInt(pathParts[2], 10) : null; // -> 1
        const nestedResourceName = primaryResourceId ? pathParts[3] : null; // -> 'posts'

        // --- 3. Load Data ---
        const dataPath = path.join(process.cwd(), '_data', `${primaryResourceName}.json`);
        let data;
        try {
            const fileContent = await fs.readFile(dataPath, 'utf8');
            data = JSON.parse(fileContent);
        } catch (error) {
            return res.status(404).json({ error: `Resource '${primaryResourceName}' not found.` });
        }
        
        let result = [...data];

        // --- 4. Handle Nested Resources (e.g., /users/1/posts) ---
        if (nestedResourceName) {
            const nestedDataPath = path.join(process.cwd(), '_data', `${nestedResourceName}.json`);
            let nestedData;
            try {
                const nestedFileContent = await fs.readFile(nestedDataPath, 'utf8');
                nestedData = JSON.parse(nestedFileContent);
            } catch (error) {
                return res.status(404).json({ error: `Nested resource '${nestedResourceName}' not found.` });
            }
            // The foreign key is assumed to be `${primaryResourceNameSingular}Id`, e.g., 'userId'
            const foreignKey = `${primaryResourceName.slice(0, -1)}Id`;
            result = nestedData.filter(item => item[foreignKey] === primaryResourceId);
        } 
        // --- 5. Handle Primary Resource ID (e.g., /users/1) ---
        else if (primaryResourceId) {
            const item = result.find(d => d.id === primaryResourceId);
            return item ? res.status(200).json(item) : res.status(404).json({ error: 'Item not found' });
        }

        // --- 6. Handle Query Parameters (Filtering, Sorting, Searching, Pagination) ---
        const query = url.searchParams;

        // Full-text search (q=...)
        const searchQuery = query.get('q');
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            result = result.filter(item => 
                Object.values(item).some(value => 
                    String(value).toLowerCase().includes(lowerCaseQuery)
                )
            );
        }

        // Generic Filtering (e.g., categoryId=1, status=active)
        query.forEach((value, key) => {
            if (!key.startsWith('_') && key !== 'q') {
                 // Handle numeric comparisons (gte, lte, ne)
                if(key.endsWith('_gte')) {
                    const field = key.replace('_gte', '');
                    result = result.filter(item => item[field] >= parseFloat(value));
                } else if(key.endsWith('_lte')) {
                     const field = key.replace('_lte', '');
                    result = result.filter(item => item[field] <= parseFloat(value));
                } else if(key.endsWith('_ne')) {
                     const field = key.replace('_ne', '');
                    result = result.filter(item => item[field] != value);
                }
                // Handle exact match
                else {
                    result = result.filter(item => String(item[key]) === value);
                }
            }
        });

        // Sorting (_sort=..., _order=...)
        const sortKey = query.get('_sort');
        if (sortKey) {
            const order = query.get('_order')?.toLowerCase() === 'desc' ? -1 : 1;
            result.sort((a, b) => {
                if (a[sortKey] < b[sortKey]) return -1 * order;
                if (a[sortKey] > b[sortKey]) return 1 * order;
                return 0;
            });
        }

        // Pagination (_page=..., _limit=...)
        const page = parseInt(query.get('_page'), 10) || 1;
        const limit = parseInt(query.get('_limit'), 10) || result.length; // Default to all if no limit
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        result = result.slice(startIndex, endIndex);

        // --- 7. Send Response ---
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};
