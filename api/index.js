// Simple API serverless function
const users = [
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
  },
  {
    "id": 2,
    "name": "Omar Khalil",
    "username": "omar_khalil",
    "email": "omar.khalil@email.com",
    "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "address": {
      "street": "456 Oak Avenue",
      "city": "Alexandria",
      "zipcode": "21500"
    }
  }
];

const posts = [
  {
    "id": 1,
    "title": "Getting Started with Web Development",
    "body": "Web development is an exciting journey that combines creativity with technical skills...",
    "userId": 1,
    "tags": ["web-development", "beginners"],
    "reactions": 15
  },
  {
    "id": 2,
    "title": "Advanced JavaScript Techniques",
    "body": "JavaScript is a powerful language that continues to evolve...",
    "userId": 2,
    "tags": ["javascript", "advanced"],
    "reactions": 23
  }
];

const products = [
  {
    "id": 1,
    "title": "Wireless Bluetooth Headphones",
    "price": 99.99,
    "description": "High-quality wireless headphones with noise cancellation",
    "category": "electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    "rating": 4.5
  },
  {
    "id": 2,
    "title": "Smart Fitness Watch",
    "price": 199.99,
    "description": "Track your fitness goals with this advanced smartwatch",
    "category": "electronics",
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    "rating": 4.8
  }
];

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
  
  // Get the resource from URL
  const url = req.url;
  let resource = '';
  
  if (url.includes('/api/users')) {
    resource = 'users';
  } else if (url.includes('/api/posts')) {
    resource = 'posts';
  } else if (url.includes('/api/products')) {
    resource = 'products';
  } else {
    res.status(404).json({
      error: 'Resource not found',
      available: ['users', 'posts', 'products']
    });
    return;
  }
  
  // Return the appropriate data
  let data;
  switch (resource) {
    case 'users':
      data = users;
      break;
    case 'posts':
      data = posts;
      break;
    case 'products':
      data = products;
      break;
    default:
      data = [];
  }
  
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
}; 