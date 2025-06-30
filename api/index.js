const jsonServer = require('json-server');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

// Import our database
const db = require('../db.json');

// Create json-server instance
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults({
  logger: false
});

// Apply middlewares
server.use(helmet());
server.use(cors());
server.use(compression());
server.use(morgan('combined'));

// Use json-server middlewares
server.use(middlewares);

// Add custom routes before json-server router
server.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount json-server router
server.use('/', router);

// Export for Vercel serverless function
module.exports = (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
    return;
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle the request
  server(req, res);
}; 