const pets = [
  {
    "id": 1,
    "name": "Sample pet",
    "description": "This is a sample pet for testing"
  },
  {
    "id": 2,
    "name": "Another pet",
    "description": "Another sample pet for testing"
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
  res.status(200).json(pets);
};