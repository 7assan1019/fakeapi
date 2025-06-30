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
  static: './public',
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

// Mount json-server router under /api
server.use('/api', router);

// Export the serverless function
module.exports = server; 