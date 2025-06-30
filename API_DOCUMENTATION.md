# Curdor Mock API Documentation

## Overview

The Curdor Mock API is a comprehensive REST API service providing realistic data for 21 different resources. It's built on top of json-server with additional features like CORS, security headers, and custom endpoints.

**Base URL:** `http://localhost:3000/api`

## Quick Start

```bash
# Start the server
npm start

# Test the API
curl http://localhost:3000/api
```

## Authentication

Currently, no authentication is required. All endpoints are publicly accessible.

## Response Format

All responses are in JSON format with standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Endpoints

### 1. API Information
```http
GET /api
```

Returns information about the API and available endpoints.

**Response:**
```json
{
  "message": "Welcome to Curdor Mock API",
  "version": "1.0.0",
  "description": "Professional mock REST API service with rich, realistic data",
  "endpoints": {
    "users": "/api/users",
    "products": "/api/products",
    // ... all available endpoints
  }
}
```

### 2. Health Check
```http
GET /health
```

Returns server health status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

## Resource Endpoints

### Users
```http
GET /api/users
GET /api/users/1
POST /api/users
PUT /api/users/1
DELETE /api/users/1
```

**Example User:**
```json
{
  "id": 1,
  "name": "Ahmed Hassan",
  "username": "ahmed_hassan",
  "email": "ahmed.hassan@email.com",
  "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "address": {
    "street": "123 Main Street",
    "city": "Cairo",
    "zipcode": "11511"
  }
}
```

### Products
```http
GET /api/products
GET /api/products/1
POST /api/products
PUT /api/products/1
DELETE /api/products/1
```

**Example Product:**
```json
{
  "id": 1,
  "name": "Wireless Bluetooth Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 199.99,
  "category": "Electronics",
  "rating": 4.5,
  "stock": 50,
  "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop"
}
```

### Hotels
```http
GET /api/hotels
GET /api/hotels/1
POST /api/hotels
PUT /api/hotels/1
DELETE /api/hotels/1
```

**Example Hotel:**
```json
{
  "id": 1,
  "name": "Nile Palace Hotel",
  "stars": 5,
  "address": "123 Nile Corniche, Cairo",
  "phone": "+20-2-1234-5678",
  "email": "info@nilepalace.com",
  "website": "www.nilepalace.com",
  "rating": 4.8,
  "price_range": "$$$$",
  "amenities": ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Conference Room"],
  "description": "Luxury hotel overlooking the Nile with world-class amenities and service.",
  "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
}
```

## Query Parameters

### Pagination
```http
GET /api/users?_page=1&_limit=10
```

### Sorting
```http
GET /api/products?_sort=price&_order=asc
GET /api/hotels?_sort=rating&_order=desc
```

### Filtering
```http
# Exact match
GET /api/hotels?stars=5

# Greater than or equal
GET /api/products?price_gte=100

# Less than or equal
GET /api/products?price_lte=500

# Contains (for arrays)
GET /api/hotels?amenities_like=Pool

# Nested object filtering
GET /api/users?address.city=Cairo
```

### Search
```http
GET /api/products?q=laptop
GET /api/hotels?q=resort
```

### Combining Parameters
```http
GET /api/apartments?bedrooms_gte=2&price_lte=2000&_sort=price&_order=asc&_page=1&_limit=5
```

## Available Resources

| Resource | Endpoint | Count | Description |
|----------|----------|-------|-------------|
| Users | `/api/users` | 30 | User profiles with addresses |
| Categories | `/api/categories` | 8 | Product categories |
| Products | `/api/products` | 30 | E-commerce products |
| Reviews | `/api/reviews` | 30 | Product reviews |
| Orders | `/api/orders` | 30 | Customer orders |
| Posts | `/api/posts` | 30 | Social media posts |
| Comments | `/api/comments` | 30 | Post comments |
| Books | `/api/books` | 40 | Book catalog |
| Albums | `/api/albums` | 35 | Music albums |
| Photos | `/api/photos` | 40 | Photo gallery |
| Apartments | `/api/apartments` | 35 | Real estate listings |
| Companies | `/api/companies` | 30 | Business profiles |
| Jobs | `/api/jobs` | 40 | Job listings |
| Events | `/api/events` | 24 | Event calendar |
| Restaurants | `/api/restaurants` | 10 | Restaurant listings |
| Hotels | `/api/hotels` | 30 | Hotel accommodations |
| Schools | `/api/schools` | 30 | Educational institutions |
| Hospitals | `/api/hospitals` | 30 | Healthcare facilities |
| Cars | `/api/cars` | 30 | Vehicle listings |
| Pets | `/api/pets` | 30 | Pet profiles |
| Services | `/api/services` | 29 | Service providers |

## Example Queries

### Get 5-star hotels in Cairo
```bash
curl "http://localhost:3000/api/hotels?stars=5&address.city=Cairo"
```

### Get products under $100 with high rating
```bash
curl "http://localhost:3000/api/products?price_lte=100&rating_gte=4.5"
```

### Get apartments with 2+ bedrooms, sorted by price
```bash
curl "http://localhost:3000/api/apartments?bedrooms_gte=2&_sort=price&_order=asc"
```

### Search for jobs containing "developer"
```bash
curl "http://localhost:3000/api/jobs?q=developer"
```

### Get users from specific cities with pagination
```bash
curl "http://localhost:3000/api/users?address.city=Cairo&_page=1&_limit=5"
```

## Error Handling

### 404 Not Found
```json
{
  "error": "Endpoint not found",
  "message": "The endpoint /api/nonexistent does not exist",
  "availableEndpoints": "/api"
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong!",
  "message": "Detailed error description"
}
```

## Headers

The API includes the following custom headers:

- `X-API-Version: 1.0.0` - API version
- `Content-Type: application/json` - Response format
- CORS headers for cross-origin requests

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## CORS

The API supports cross-origin requests with the following configuration:

- **Origin:** `*` (all origins)
- **Methods:** GET, POST, PUT, DELETE, PATCH
- **Headers:** Content-Type, Authorization

## Testing

Use the included test script to verify API functionality:

```bash
node test-api.js
```

## Development

### Starting the server
```bash
# Production
npm start

# Development (with auto-restart)
npm run dev

# Simple json-server
npm run serve
```

### Environment Variables
- `PORT` - Server port (default: 3000)

## Support

- **Documentation:** Check `/api` endpoint for live documentation
- **Health Check:** `/health` endpoint for server status
- **JSON Server UI:** Visit `http://localhost:3000/` for interactive interface

---

**Built with ❤️ for the developer community** 