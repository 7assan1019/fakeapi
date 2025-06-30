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

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(users);
}; 