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
  console.log('🚀 Testing Curdor Mock API...\n');

  try {
    // Test 1: Get API info
    console.log('1️⃣ Testing API Info:');
    const apiInfo = await axios.get(`${BASE_URL}`);
    console.log('✅ API Info:', apiInfo.data.name, 'v' + apiInfo.data.version);
    console.log('📝 Description:', apiInfo.data.description);
    console.log('🔗 Base URL:', apiInfo.data.baseUrl);
    console.log('');

    // Test 2: Get users
    console.log('2️⃣ Testing Users Endpoint:');
    const users = await axios.get(`${BASE_URL}/users?_limit=2`);
    console.log('✅ Users found:', users.data.length);
    console.log('👤 First user:', users.data[0].name);
    console.log('📧 Email:', users.data[0].email);
    console.log('');

    // Test 3: Filtering
    console.log('3️⃣ Testing Filtering:');
    const fiveStarHotels = await axios.get(`${BASE_URL}/hotels?stars=5&_limit=2`);
    console.log('✅ 5-star hotels found:', fiveStarHotels.data.length);
    console.log('🏨 First hotel:', fiveStarHotels.data[0].name);
    console.log('⭐ Rating:', fiveStarHotels.data[0].rating);
    console.log('');

    // Test 4: Sorting
    console.log('4️⃣ Testing Sorting:');
    const topJobs = await axios.get(`${BASE_URL}/jobs?_sort=salary&_order=desc&_limit=3`);
    console.log('✅ Top paying jobs:');
    topJobs.data.forEach((job, index) => {
      console.log(`   ${index + 1}. ${job.title} - ${job.salary}`);
    });
    console.log('');

    // Test 5: Search
    console.log('5️⃣ Testing Search:');
    const searchResults = await axios.get(`${BASE_URL}/products?q=headphones&_limit=2`);
    console.log('✅ Search results for "headphones":', searchResults.data.length);
    if (searchResults.data.length > 0) {
      console.log('📦 First product:', searchResults.data[0].name);
      console.log('💰 Price:', searchResults.data[0].price);
    }
    console.log('');

    // Test 6: Pagination
    console.log('6️⃣ Testing Pagination:');
    const page1 = await axios.get(`${BASE_URL}/users?_page=1&_limit=3`);
    const page2 = await axios.get(`${BASE_URL}/users?_page=2&_limit=3`);
    console.log('✅ Page 1 users:', page1.data.length);
    console.log('✅ Page 2 users:', page2.data.length);
    console.log('👤 Page 1 first user:', page1.data[0].name);
    console.log('👤 Page 2 first user:', page2.data[0].name);
    console.log('');

    // Test 7: Complex query
    console.log('7️⃣ Testing Complex Query:');
    const complexQuery = await axios.get(`${BASE_URL}/apartments?bedrooms_gte=2&price_lte=2000&_sort=price&_order=asc&_limit=2`);
    console.log('✅ Apartments with 2+ bedrooms under $2000:');
    complexQuery.data.forEach((apt, index) => {
      console.log(`   ${index + 1}. ${apt.bedrooms}BR - $${apt.price}/month`);
    });
    console.log('');

    // Test 8: Nested routes (if available)
    console.log('8️⃣ Testing Nested Routes:');
    try {
      const userPosts = await axios.get(`${BASE_URL}/users/1/posts`);
      console.log('✅ User posts found:', userPosts.data.length);
      if (userPosts.data.length > 0) {
        console.log('📝 First post:', userPosts.data[0].title);
      }
    } catch (error) {
      console.log('ℹ️  Nested routes not available in this version');
    }
    console.log('');

    // Test 9: Health check
    console.log('9️⃣ Testing Health Check:');
    const health = await axios.get('http://localhost:3000/health');
    console.log('✅ Server status:', health.data.status);
    console.log('⏰ Uptime:', Math.round(health.data.uptime), 'seconds');
    console.log('');

    console.log('🎉 All tests completed successfully!');
    console.log('💡 Try these endpoints in your own code:');
    console.log(`   GET ${BASE_URL}/users`);
    console.log(`   GET ${BASE_URL}/hotels?stars=5`);
    console.log(`   GET ${BASE_URL}/jobs?_sort=salary&_order=desc`);
    console.log(`   GET ${BASE_URL}/products?q=laptop`);
    console.log(`   GET ${BASE_URL}/apartments?bedrooms_gte=2&price_lte=2000`);

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Run the test
testAPI(); 