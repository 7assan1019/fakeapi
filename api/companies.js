const companies = [
  {
    "id": 1,
    "name": "Sample companie",
    "description": "This is a sample companie for testing"
  },
  {
    "id": 2,
    "name": "Another companie",
    "description": "Another sample companie for testing"
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
  res.status(200).json(companies);
};