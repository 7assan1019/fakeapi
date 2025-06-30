const fs = require('fs');
const path = require('path');

const endpoints = [
    'users', 'categories', 'products', 'reviews', 'orders', 
    'posts', 'comments', 'books', 'albums', 'photos', 
    'apartments', 'companies', 'jobs', 'events', 'restaurants', 
    'hotels', 'schools', 'hospitals', 'cars', 'pets', 'services'
];

// Create api directory if it doesn't exist
if (!fs.existsSync('api')) {
    fs.mkdirSync('api');
}

endpoints.forEach(endpoint => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} API</title>
    <script>
        // Redirect to the JSON file
        window.location.href = '/${endpoint}.json';
    </script>
</head>
<body>
    <p>Redirecting to JSON data...</p>
</body>
</html>`;
    
    fs.writeFileSync(`api/${endpoint}.html`, htmlContent);
    console.log(`Created api/${endpoint}.html`);
});

console.log('All API HTML files created successfully!'); 