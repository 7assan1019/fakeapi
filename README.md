# 🚀 Curdor Mock API

A **professional, comprehensive mock REST API service** designed to help developers learn and test REST APIs with rich, realistic data. Think of it as a superior alternative to jsonplaceholder - but with more features, better documentation, and real-world examples.

## ✨ Why This Project?

### 🎯 **Real Working API**
Unlike static documentation sites, this is a **fully functional API** that you can actually make HTTP requests to. Users can:

- **Copy any endpoint** from the documentation
- **Make real HTTP requests** using fetch, axios, or curl
- **Get actual JSON responses** they can work with
- **Test all features** like filtering, pagination, sorting, and search

### 🏗️ **Why We Use npm/Node.js**
This project uses npm dependencies because we need a **real server** to:
- Serve the REST API endpoints using `json-server`
- Handle CORS for cross-origin requests
- Provide security headers with `helmet`
- Enable compression for better performance
- Log requests for debugging

**This is NOT a static site** - it's a working API server that users can interact with!

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd curdor
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Access Your API
- **API Base URL**: `http://localhost:3000/api`
- **Frontend**: `http://localhost:3000/`
- **Documentation**: `http://localhost:3000/docs.html`
- **Health Check**: `http://localhost:3000/health`

## 🎯 Try It Right Now!

### Basic Examples
```javascript
// Get all users
fetch('http://localhost:3000/api/users')
  .then(res => res.json())
  .then(data => console.log(data));

// Get a specific user
fetch('http://localhost:3000/api/users/1')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Advanced Features
```javascript
// Filtering
fetch('http://localhost:3000/api/hotels?stars=5')

// Sorting
fetch('http://localhost:3000/api/jobs?_sort=salary&_order=desc')

// Search
fetch('http://localhost:3000/api/products?q=laptop')

// Pagination
fetch('http://localhost:3000/api/users?_page=1&_limit=10')

// Complex queries
fetch('http://localhost:3000/api/apartments?bedrooms_gte=2&price_lte=2000&_sort=price&_order=asc')
```

## 📊 Available Resources

| Resource | Endpoint | Count | Description |
|----------|----------|-------|-------------|
| Users | `/api/users` | 30 | User profiles with addresses |
| Products | `/api/products` | 30 | E-commerce products |
| Hotels | `/api/hotels` | 30 | Hotel accommodations |
| Jobs | `/api/jobs` | 40 | Job listings |
| Apartments | `/api/apartments` | 35 | Real estate listings |
| Companies | `/api/companies` | 30 | Business profiles |
| Schools | `/api/schools` | 30 | Educational institutions |
| Hospitals | `/api/hospitals` | 30 | Healthcare facilities |
| Cars | `/api/cars` | 30 | Vehicle listings |
| Pets | `/api/pets` | 30 | Pet profiles |
| Services | `/api/services` | 29 | Service providers |
| Posts | `/api/posts` | 30 | Blog posts |
| Comments | `/api/comments` | 30 | Post comments |
| Orders | `/api/orders` | 30 | E-commerce orders |
| Reviews | `/api/reviews` | 30 | Product reviews |
| Books | `/api/books` | 30 | Book catalog |
| Albums | `/api/albums` | 30 | Music albums |
| Photos | `/api/photos` | 30 | Photo gallery |
| Events | `/api/events` | 30 | Event listings |
| Restaurants | `/api/restaurants` | 30 | Restaurant listings |

**Total: 21 resources with 527+ data items**

## ⚡ Advanced Features

### 🔍 Filtering
```bash
# Exact match
GET /api/hotels?stars=5

# Greater than/less than
GET /api/products?price_gte=100&price_lte=500

# Array contains
GET /api/hotels?amenities_like=Pool

# Nested object filtering
GET /api/users?address.city=Cairo
```

### 📄 Pagination
```bash
# Limit results
GET /api/users?_limit=10

# Page navigation
GET /api/users?_page=2&_limit=10

# Skip results
GET /api/users?_start=20&_limit=10
```

### 🔄 Sorting
```bash
# Ascending order
GET /api/products?_sort=price&_order=asc

# Descending order
GET /api/hotels?_sort=rating&_order=desc

# Multiple fields
GET /api/jobs?_sort=salary,title&_order=desc,asc
```

### 🔎 Search
```bash
# Full-text search
GET /api/products?q=laptop
GET /api/hotels?q=resort
GET /api/jobs?q=developer
```

### 🔗 Nested Routes
```bash
# Get user's posts
GET /api/users/1/posts

# Get post's comments
GET /api/posts/1/comments

# Get product's reviews
GET /api/products/1/reviews
```

## 🧪 Testing

Run the comprehensive test suite to verify all features:

```bash
node test-api.js
```

This will test:
- ✅ API information
- ✅ Basic CRUD operations
- ✅ Filtering capabilities
- ✅ Sorting functionality
- ✅ Search features
- ✅ Pagination
- ✅ Complex queries
- ✅ Nested routes
- ✅ Health check

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Deploy automatically

The `vercel.json` configuration is already included for seamless deployment.

### Other Platforms
This works on any Node.js hosting platform:
- Heroku
- Railway
- DigitalOcean App Platform
- AWS Elastic Beanstalk

## 🛠️ Development

### Project Structure
```
curdor/
├── server.js          # Main server file
├── db.json           # Database with 527+ items
├── package.json      # Dependencies
├── public/           # Static files
│   ├── index.html    # Frontend showcase
│   └── docs.html     # Documentation
├── test-api.js       # Test suite
├── vercel.json       # Deployment config
└── README.md         # This file
```

### Available Scripts
```bash
npm start          # Start production server
npm run dev        # Start with nodemon (development)
npm run serve      # Start basic json-server
```

## 🎨 Frontend Features

### Interactive Showcase
- **Category-based examples** (E-commerce, Social, Real Estate, etc.)
- **Copy-to-clipboard** functionality for all code snippets
- **Real-time API stats** and live examples
- **Responsive design** that works on all devices

### Documentation
- **Comprehensive API docs** with examples
- **Interactive examples** you can copy and use
- **Feature explanations** with real use cases
- **Error handling** examples

## 🔒 Security & Performance

- **CORS enabled** for cross-origin requests
- **Security headers** with Helmet
- **Response compression** for faster loading
- **Request logging** for debugging
- **Error handling** with helpful messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning, development, or production!

## 🙏 Acknowledgments

Built with ❤️ for the developer community. This project aims to make API learning accessible and practical for everyone.

---

**Ready to start building?** 🚀

```bash
git clone <your-repo-url>
cd curdor
npm install
npm start
```

Then visit `http://localhost:3000` and start exploring the API! 