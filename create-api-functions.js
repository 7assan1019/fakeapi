const fs = require('fs');
const path = require('path');

const endpoints = [
    'users', 'categories', 'products', 'reviews', 'orders', 
    'posts', 'comments', 'books', 'albums', 'photos', 
    'apartments', 'companies', 'jobs', 'events', 'restaurants', 
    'hotels', 'schools', 'hospitals', 'cars', 'pets', 'services'
];

// Create api directory if it doesn't exist
if (!fs.existsSync('api')) {
    fs.mkdirSync('api');
}

endpoints.forEach(endpoint => {
    const functionContent = `const ${endpoint} = [
  {
    "id": 1,
    "name": "Sample ${endpoint.slice(0, -1)}",
    "description": "This is a sample ${endpoint.slice(0, -1)} for testing"
  },
  {
    "id": 2,
    "name": "Another ${endpoint.slice(0, -1)}",
    "description": "Another sample ${endpoint.slice(0, -1)} for testing"
  }
];

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(${endpoint});
};`;
    
    fs.writeFileSync(`api/${endpoint}.js`, functionContent);
    console.log(`Created api/${endpoint}.js`);
});

console.log('All API serverless functions created successfully!'); 