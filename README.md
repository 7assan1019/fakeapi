# Curdor Mock API

A professional, comprehensive mock REST API service with rich, realistic data. Built for developers who need high-quality test data for their applications.

## 🚀 Features

- **21 Different Resources** - From users and products to hotels and hospitals
- **527+ Rich Items** - Realistic, interconnected data across multiple domains
- **Full CRUD Operations** - Create, Read, Update, Delete for all resources
- **Advanced Filtering** - Query by any field with complex filters
- **Pagination Support** - Built-in pagination for large datasets
- **Search Functionality** - Full-text search across resources
- **CORS Enabled** - Cross-origin requests supported
- **Security Headers** - Enhanced security with Helmet.js
- **Compression** - Gzip compression for better performance
- **Logging** - Request logging with Morgan
- **Health Checks** - Built-in health monitoring
- **Beautiful UI** - Modern frontend for exploring the API
- **Comprehensive Docs** - Beginner-friendly documentation

## 🌐 Live Demo

- **Homepage:** [https://your-project.vercel.app/](https://your-project.vercel.app/)
- **Documentation:** [https://your-project.vercel.app/docs.html](https://your-project.vercel.app/docs.html)
- **API Base:** [https://your-project.vercel.app/api](https://your-project.vercel.app/api)

## 📊 Available Resources

| Resource | Count | Description |
|----------|-------|-------------|
| Users | 30 | User profiles with addresses and avatars |
| Categories | 8 | Product categories |
| Products | 30 | E-commerce products with reviews |
| Reviews | 30 | Product reviews and ratings |
| Orders | 30 | Customer orders with items |
| Posts | 30 | Social media posts |
| Comments | 30 | Post comments |
| Books | 40 | Book catalog with authors |
| Albums | 35 | Music albums with artists |
| Photos | 40 | Photo gallery |
| Apartments | 35 | Real estate listings |
| Companies | 30 | Business profiles |
| Jobs | 40 | Job listings |
| Events | 24 | Event calendar |
| Restaurants | 10 | Restaurant listings |
| Hotels | 30 | Hotel accommodations |
| Schools | 30 | Educational institutions |
| Hospitals | 30 | Healthcare facilities |
| Cars | 30 | Vehicle listings |
| Pets | 30 | Pet profiles |
| Services | 29 | Service providers |

## 🛠️ Quick Start

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/curdor-mock-api.git
   cd curdor-mock-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Access the API:**
   - API: http://localhost:3000/api
   - Frontend: http://localhost:3000/
   - Documentation: http://localhost:3000/docs.html
   - Health Check: http://localhost:3000/health

### Using the API

```bash
# Get all users
curl https://your-project.vercel.app/api/users

# Get 5-star hotels
curl https://your-project.vercel.app/api/hotels?stars=5

# Search for products
curl https://your-project.vercel.app/api/products?q=laptop

# Pagination
curl https://your-project.vercel.app/api/users?_page=1&_limit=10
```

## 📡 API Endpoints

### Base URL
```
https://your-project.vercel.app/api
```

### Available Endpoints
- `GET /api` - API information and endpoints list
- `GET /health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/1` - Get user by ID
- `GET /api/products` - Get all products
- `GET /api/hotels` - Get all hotels
- `GET /api/jobs` - Get all jobs
- ... and many more!

## 🔍 Query Examples

### Basic Filtering
```bash
# Get users from Cairo
GET /api/users?address.city=Cairo

# Get products with rating > 4
GET /api/products?rating_gte=4

# Get hotels with 5 stars
GET /api/hotels?stars=5
```

### Pagination
```bash
# Get first 10 users
GET /api/users?_page=1&_limit=10

# Get users 11-20
GET /api/users?_page=2&_limit=10
```

### Sorting
```bash
# Sort products by price (ascending)
GET /api/products?_sort=price&_order=asc

# Sort hotels by rating (descending)
GET /api/hotels?_sort=rating&_order=desc
```

### Search
```bash
# Search for products containing "laptop"
GET /api/products?q=laptop

# Search for hotels with "resort" in name
GET /api/hotels?q=resort
```

### Complex Queries
```bash
# Get 5-star hotels in Cairo with pool
GET /api/hotels?stars=5&address.city=Cairo&amenities_like=Pool

# Get products with price between 100-500
GET /api/products?price_gte=100&price_lte=500
```

## 🎯 Use Cases

- **Frontend Development** - Mock data for React, Vue, Angular apps
- **Mobile App Development** - API testing for iOS/Android apps
- **API Testing** - Integration testing with realistic data
- **Prototyping** - Quick prototypes with full CRUD operations
- **Education** - Learning REST APIs with real examples
- **Documentation** - API documentation examples

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

### Customization
- Edit `db.json` to modify data
- Update `server.js` for custom routes
- Modify CORS settings in `server.js`

## 📚 Documentation

- **API Documentation:** [docs.html](docs.html) - Comprehensive API guide
- **Deployment Guide:** [DEPLOYMENT.md](DEPLOYMENT.md) - Step-by-step deployment
- **API Reference:** [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Detailed endpoint reference

## 🛡️ Security Features

- **CORS Protection** - Configurable cross-origin policies
- **Security Headers** - Helmet.js for HTTP security
- **Input Validation** - JSON Server built-in validation
- **Rate Limiting** - Can be added via middleware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🆘 Support

- **Documentation:** Check the `/docs.html` page for live documentation
- **API Info:** Visit `/api` endpoint for API information
- **Health Check:** `/health` endpoint for server status
- **Issues:** Create an issue on GitHub

## 🙏 Acknowledgments

Built with ❤️ for the developer community. This project aims to provide a superior alternative to existing mock API services with rich, realistic data and excellent developer experience.

---

**Ready to start building? Visit the [documentation](docs.html) or explore the [API](api) directly!** 