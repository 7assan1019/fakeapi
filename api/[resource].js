const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Get the resource name from the URL
  const resource = req.query.resource || req.url.split('/').pop();
  
  // List of available resources
  const availableResources = [
    'users', 'categories', 'products', 'reviews', 'orders', 
    'posts', 'comments', 'books', 'albums', 'photos', 
    'apartments', 'companies', 'jobs', 'events', 'restaurants', 
    'hotels', 'schools', 'hospitals', 'cars', 'pets', 'services'
  ];
  
  // Check if resource exists
  if (!availableResources.includes(resource)) {
    res.status(404).json({
      error: 'Resource not found',
      available: availableResources
    });
    return;
  }
  
  // Path to the JSON file
  const filePath = path.join(process.cwd(), 'public', 'api', `${resource}.json`);
  
  try {
    // Read and parse the JSON file
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    
    // Set content type
    res.setHeader('Content-Type', 'application/json');
    
    // Return the data
    res.status(200).json(jsonData);
    
  } catch (error) {
    console.error(`Error reading ${resource}.json:`, error);
    res.status(500).json({
      error: 'Internal server error',
      message: `Failed to load ${resource} data`
    });
  }
}; 