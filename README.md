# 🚀 Fake API

A comprehensive mock REST API for testing and learning - **100% static, no server setup required!**

## ✨ Features

- **21 API Endpoints** with realistic data
- **527+ Mock Items** across different categories
- **Zero Configuration** - just deploy and use
- **Static Files** - no npm, no server, no dependencies
- **Fast & Reliable** - served directly by Vercel CDN

## 🎯 Quick Start

Simply visit the deployed site and start making API calls:

```
GET https://your-domain.vercel.app/api/users
GET https://your-domain.vercel.app/api/products
GET https://your-domain.vercel.app/api/hotels
```

## 📋 Available Endpoints

| Endpoint | Items | Description |
|----------|-------|-------------|
| `/api/users` | 25 | User profiles and data |
| `/api/products` | 30 | E-commerce products |
| `/api/hotels` | 20 | Hotel listings |
| `/api/jobs` | 35 | Job opportunities |
| `/api/posts` | 100 | Blog posts |
| `/api/comments` | 500 | Post comments |
| `/api/companies` | 15 | Company profiles |
| `/api/services` | 25 | Service offerings |
| `/api/apartments` | 40 | Real estate listings |
| `/api/restaurants` | 30 | Restaurant data |
| `/api/schools` | 20 | Educational institutions |
| `/api/books` | 50 | Book catalog |
| `/api/events` | 25 | Event listings |
| `/api/hospitals` | 15 | Healthcare facilities |
| `/api/cars` | 30 | Vehicle listings |
| `/api/pets` | 20 | Pet profiles |
| `/api/orders` | 100 | Order data |
| `/api/reviews` | 200 | Product reviews |
| `/api/tickets` | 75 | Support tickets |
| `/api/invoices` | 50 | Invoice data |
| `/api/projects` | 25 | Project information |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Fork or clone** this repository
2. **Connect to Vercel** and import the project
3. **Deploy** - that's it! No build process needed

### Manual Deployment

1. Upload all files to any static hosting service
2. The site will work immediately - no server setup required

## 💡 Usage Examples

### Basic API Calls

```javascript
// Get all users
fetch('https://your-domain.vercel.app/api/users')
  .then(response => response.json())
  .then(data => console.log(data));

// Get a specific user
fetch('https://your-domain.vercel.app/api/users/1')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Frontend Integration

```html
<script>
  // Load users and display them
  fetch('/api/users')
    .then(res => res.json())
    .then(users => {
      users.forEach(user => {
        console.log(`${user.name} - ${user.email}`);
      });
    });
</script>
```

## 🎨 Customization

### Adding New Data

1. Edit the JSON files in `public/api/`
2. Add your custom data
3. Deploy - changes are live immediately

### Styling

- Modify `public/index.html` for the homepage
- Update `public/docs.html` for documentation
- All styling is in the HTML files - no external dependencies

## 📁 Project Structure

```
├── public/
│   ├── index.html          # Homepage
│   ├── docs.html           # Documentation
│   ├── favicon.svg         # Site icon
│   └── api/                # Static API endpoints
│       ├── users.json
│       ├── products.json
│       ├── hotels.json
│       └── ... (21 endpoints)
├── vercel.json             # Vercel configuration
└── README.md               # This file
```

## 🌟 Why This Approach?

- **No Dependencies** - Pure HTML/CSS/JS
- **Instant Deploy** - No build time, no npm install
- **Always Available** - Static files never go down
- **CDN Optimized** - Fast loading worldwide
- **Zero Maintenance** - Set it and forget it

## 🤝 Contributing

Feel free to:
- Add more endpoints
- Improve the data quality
- Enhance the documentation
- Submit bug reports

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for the developer community** 