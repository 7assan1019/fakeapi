const db = require('../db.json');

// Helper function to get resources
function getResources(resourceName, query = {}) {
  let resources = db[resourceName] || [];
  
  // Handle filtering
  Object.keys(query).forEach(key => {
    if (key.startsWith('_')) return; // Skip json-server params
    
    if (key.endsWith('_gte')) {
      const field = key.replace('_gte', '');
      const value = parseFloat(query[key]);
      resources = resources.filter(item => item[field] >= value);
    } else if (key.endsWith('_lte')) {
      const field = key.replace('_lte', '');
      const value = parseFloat(query[key]);
      resources = resources.filter(item => item[field] <= value);
    } else if (key === 'q') {
      const searchTerm = query[key].toLowerCase();
      resources = resources.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm)
        )
      );
    } else {
      const value = query[key];
      resources = resources.filter(item => item[key] == value);
    }
  });
  
  // Handle pagination
  const page = parseInt(query._page) || 1;
  const limit = parseInt(query._limit) || resources.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  
  // Handle sorting
  if (query._sort) {
    const order = query._order === 'desc' ? -1 : 1;
    resources.sort((a, b) => {
      if (a[query._sort] < b[query._sort]) return -1 * order;
      if (a[query._sort] > b[query._sort]) return 1 * order;
      return 0;
    });
  }
  
  return resources.slice(start, end);
}

// Helper function to get single resource
function getResource(resourceName, id) {
  const resources = db[resourceName] || [];
  return resources.find(item => item.id == id);
}

// Helper function to get nested resources
function getNestedResources(resourceName, parentId, nestedResource) {
  const resources = db[nestedResource] || [];
  return resources.filter(item => item[`${resourceName}Id`] == parentId);
}

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const query = Object.fromEntries(searchParams.entries());
    
    // Health check endpoint
    if (pathname === '/health') {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      });
      return;
    }
    
    // API root endpoint
    if (pathname === '/') {
      res.status(200).json({
        message: 'Fake API - A comprehensive mock REST API',
        version: '1.0.0',
        endpoints: Object.keys(db),
        totalResources: Object.keys(db).reduce((sum, key) => sum + db[key].length, 0),
        documentation: '/docs.html'
      });
      return;
    }
    
    // Parse API routes
    const pathParts = pathname.split('/').filter(Boolean);
    
    if (pathParts.length === 1) {
      // GET /users, GET /products, etc.
      const resourceName = pathParts[0];
      if (db[resourceName]) {
        const resources = getResources(resourceName, query);
        res.status(200).json(resources);
        return;
      }
    } else if (pathParts.length === 2) {
      // GET /users/1, GET /products/5, etc.
      const [resourceName, id] = pathParts;
      if (db[resourceName]) {
        const resource = getResource(resourceName, id);
        if (resource) {
          res.status(200).json(resource);
          return;
        }
      }
    } else if (pathParts.length === 3) {
      // GET /users/1/posts, GET /users/1/comments, etc.
      const [resourceName, id, nestedResource] = pathParts;
      if (db[resourceName] && db[nestedResource]) {
        const nestedResources = getNestedResources(resourceName, id, nestedResource);
        res.status(200).json(nestedResources);
        return;
      }
    }
    
    // Not found
    res.status(404).json({ error: 'Resource not found' });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 