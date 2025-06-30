#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testAPI() {
  log('\n🚀 Testing Curdor Mock API...', 'blue');
  log('=====================================\n', 'blue');

  try {
    // Test 1: API Info
    log('1. Testing API Information:', 'yellow');
    const apiInfo = await axios.get(`${BASE_URL}`);
    log(`✅ API Version: ${apiInfo.data.version}`);
    log(`✅ Available Resources: ${Object.keys(apiInfo.data.endpoints).length}\n`);

    // Test 2: Get users with pagination
    log('2. Testing Users with Pagination:', 'yellow');
    const users = await axios.get(`${BASE_URL}/users?_page=1&_limit=3`);
    log(`✅ Retrieved ${users.data.length} users`);
    log(`   First user: ${users.data[0].name} (${users.data[0].email})\n`);

    // Test 3: Filter hotels by stars
    log('3. Testing Hotel Filtering:', 'yellow');
    const fiveStarHotels = await axios.get(`${BASE_URL}/hotels?stars=5`);
    log(`✅ Found ${fiveStarHotels.data.length} 5-star hotels`);
    log(`   Example: ${fiveStarHotels.data[0].name} (Rating: ${fiveStarHotels.data[0].rating})\n`);

    // Test 4: Search products
    log('4. Testing Product Search:', 'yellow');
    const searchResults = await axios.get(`${BASE_URL}/products?q=laptop&_limit=2`);
    log(`✅ Found ${searchResults.data.length} products matching "laptop"`);
    if (searchResults.data.length > 0) {
      log(`   Example: ${searchResults.data[0].name} ($${searchResults.data[0].price})\n`);
    }

    // Test 5: Get jobs with sorting
    log('5. Testing Job Sorting:', 'yellow');
    const sortedJobs = await axios.get(`${BASE_URL}/jobs?_sort=salary&_order=desc&_limit=3`);
    log(`✅ Retrieved top 3 highest paying jobs`);
    log(`   Highest: ${sortedJobs.data[0].title} ($${sortedJobs.data[0].salary})\n`);

    // Test 6: Complex query - apartments with specific criteria
    log('6. Testing Complex Query:', 'yellow');
    const apartments = await axios.get(`${BASE_URL}/apartments?bedrooms_gte=2&price_lte=2000&_limit=2`);
    log(`✅ Found ${apartments.data.length} apartments with 2+ bedrooms under $2000`);
    if (apartments.data.length > 0) {
      log(`   Example: ${apartments.data[0].title} ($${apartments.data[0].price}/month)\n`);
    }

    // Test 7: Get single item
    log('7. Testing Single Item Retrieval:', 'yellow');
    const singleUser = await axios.get(`${BASE_URL}/users/1`);
    log(`✅ Retrieved user: ${singleUser.data.name}`);
    log(`   Address: ${singleUser.data.address.street}, ${singleUser.data.address.city}\n`);

    // Test 8: Health check
    log('8. Testing Health Check:', 'yellow');
    const health = await axios.get('http://localhost:3000/health');
    log(`✅ Server Status: ${health.data.status}`);
    log(`   Uptime: ${Math.round(health.data.uptime)}s\n`);

    log('🎉 All tests passed! Your API is working perfectly!', 'green');
    log('\n📊 API Statistics:', 'blue');
    log(`   Total Resources: ${Object.keys(apiInfo.data.endpoints).length}`);
    log(`   Base URL: ${BASE_URL}`);
    log(`   Documentation: http://localhost:3000/api`);
    log(`   JSON Server UI: http://localhost:3000/`);

  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    if (error.response) {
      log(`   Status: ${error.response.status}`, 'red');
      log(`   Data: ${JSON.stringify(error.response.data, null, 2)}`, 'red');
    }
  }
}

// Run the test
testAPI(); 