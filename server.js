const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './public',
  logger: false // Disable json-server's default logger
});
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

// Set default middlewares (logger, static, cors and etc)
server.use(middlewares);

// Security middleware
server.use(helmet({
  contentSecurityPolicy: false // Allow inline styles for our frontend
}));

// CORS configuration
server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Compression middleware
server.use(compression());

// Logging middleware
server.use(morgan('combined'));

// Serve our custom frontend at root
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Custom routes
server.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Curdor Mock API',
    version: '1.0.0',
    description: 'Professional mock REST API service with rich, realistic data',
    endpoints: {
      users: '/api/users',
      categories: '/api/categories',
      products: '/api/products',
      reviews: '/api/reviews',
      orders: '/api/orders',
      posts: '/api/posts',
      comments: '/api/comments',
      books: '/api/books',
      albums: '/api/albums',
      photos: '/api/photos',
      apartments: '/api/apartments',
      companies: '/api/companies',
      jobs: '/api/jobs',
      events: '/api/events',
      restaurants: '/api/restaurants',
      hotels: '/api/hotels',
      schools: '/api/schools',
      hospitals: '/api/hospitals',
      cars: '/api/cars',
      pets: '/api/pets',
      services: '/api/services'
    },
    features: [
      'Full CRUD operations',
      'Filtering and pagination',
      'Search functionality',
      'Rich, realistic data',
      'Cross-origin support'
    ]
  });
});

// Health check endpoint
server.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Custom middleware for API versioning
server.use('/api', (req, res, next) => {
  // Add API version header
  res.setHeader('X-API-Version', '1.0.0');
  next();
});

// Use default router
server.use('/api', router);

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
server.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.originalUrl} does not exist`,
    availableEndpoints: '/api'
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Curdor Mock API Server is running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`🌐 Frontend: http://localhost:${PORT}/`);
  console.log(`\n✨ Available endpoints:`);
  console.log(`   GET    /api/users`);
  console.log(`   GET    /api/products`);
  console.log(`   GET    /api/hotels`);
  console.log(`   GET    /api/jobs`);
  console.log(`   ... and many more!`);
  console.log(`\n🔍 Try: curl http://localhost:${PORT}/api/users`);
}); 