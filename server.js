const jsonServer = require('json-server');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const express = require('express');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
    static: './public',
    logger: false
});

// Security headers
server.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https:"]
        }
    }
}));

// CORS - Allow both HTTP and HTTPS
server.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow localhost and common development ports
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001', 
            'http://localhost:8080',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3001',
            'https://localhost:3000',
            'https://localhost:3001',
            'https://127.0.0.1:3000',
            'https://127.0.0.1:3001'
        ];
        
        // Allow Vercel preview URLs
        if (origin.includes('vercel.app')) {
            return callback(null, true);
        }
        
        // Allow GitHub Pages
        if (origin.includes('github.io')) {
            return callback(null, true);
        }
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Compression
server.use(compression());

// Logging
server.use(morgan('combined'));

// Body parser
server.use(jsonServer.bodyParser);

// Custom middleware to add API info
server.use('/api', (req, res, next) => {
    if (req.path === '/') {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const apiInfo = {
            name: "Curdor Mock API",
            version: "1.0.0",
            description: "A comprehensive mock REST API service for learning and development",
            baseUrl: `${baseUrl}/api`,
            documentation: `${baseUrl}/docs.html`,
            health: `${baseUrl}/health`,
            endpoints: [
                "/users", "/products", "/hotels", "/jobs", "/apartments",
                "/companies", "/schools", "/hospitals", "/cars", "/pets",
                "/services", "/posts", "/comments", "/orders", "/reviews",
                "/books", "/albums", "/photos", "/events", "/restaurants"
            ],
            features: [
                "Filtering (?field=value)",
                "Pagination (?_page=1&_limit=10)",
                "Sorting (?_sort=field&_order=desc)",
                "Search (?q=term)",
                "Nested routes (/posts/1/comments)"
            ],
            examples: {
                "Get all users": `${baseUrl}/api/users`,
                "Get user by ID": `${baseUrl}/api/users/1`,
                "Filter hotels": `${baseUrl}/api/hotels?stars=5`,
                "Search products": `${baseUrl}/api/products?q=laptop`,
                "Sort jobs by salary": `${baseUrl}/api/jobs?_sort=salary&_order=desc`,
                "Paginated results": `${baseUrl}/api/users?_page=1&_limit=5`
            }
        };
        res.json(apiInfo);
    } else {
        next();
    }
});

// Health check endpoint
server.get('/health', (req, res) => {
    const uptime = process.uptime();
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: uptime,
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Serve static files
server.use('/', express.static(path.join(__dirname, 'public')));

// Use default middlewares
server.use(middlewares);

// Use router
server.use('/api', router);

// Error handling
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message,
        availableEndpoints: '/api'
    });
});

// 404 handler
server.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: `The endpoint ${req.originalUrl} does not exist`,
        availableEndpoints: '/api'
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    const baseUrl = `http://localhost:${PORT}`;
    console.log('🚀 Curdor Mock API Server is running on port', PORT);
    console.log('📖 API Documentation:', `${baseUrl}/api`);
    console.log('🏥 Health Check:', `${baseUrl}/health`);
    console.log('🌐 Frontend:', `${baseUrl}/`);
    console.log('📚 Full Docs:', `${baseUrl}/docs.html`);
    console.log('✨ Available endpoints:');
    console.log('   GET    /api/users');
    console.log('   GET    /api/products');
    console.log('   GET    /api/hotels');
    console.log('   GET    /api/jobs');
    console.log('   ... and many more!');
    console.log('🔍 Try: curl', `${baseUrl}/api/users`);
    console.log('💡 Tip: This API supports both HTTP and HTTPS!');
}); 