const https = require('https');

const BASE_URL = 'https://fakeapi-47c7.vercel.app';
const endpoints = [
    'users',
    'categories', 
    'products',
    'reviews',
    'orders',
    'posts',
    'comments',
    'books',
    'albums',
    'photos',
    'apartments',
    'companies',
    'jobs',
    'events',
    'restaurants',
    'hotels',
    'schools',
    'hospitals',
    'cars',
    'pets',
    'services'
];

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve({
                        status: res.statusCode,
                        data: jsonData,
                        count: Array.isArray(jsonData) ? jsonData.length : 'N/A'
                    });
                } catch (error) {
                    reject({
                        status: res.statusCode,
                        error: 'Invalid JSON',
                        data: data.substring(0, 100) + '...'
                    });
                }
            });
        }).on('error', (error) => {
            reject({
                status: 'ERROR',
                error: error.message
            });
        });
    });
}

async function testAllEndpoints() {
    console.log('🚀 Testing All API Endpoints...\n');
    console.log('='.repeat(80));
    
    const results = [];
    
    for (const endpoint of endpoints) {
        const url = `${BASE_URL}/api/${endpoint}`;
        console.log(`Testing: ${endpoint.toUpperCase()}`);
        
        try {
            const result = await makeRequest(url);
            results.push({
                endpoint,
                status: '✅ SUCCESS',
                count: result.count,
                statusCode: result.status
            });
            
            console.log(`  ✅ Status: ${result.status} | Items: ${result.count}`);
            
            // Show first item as sample
            if (Array.isArray(result.data) && result.data.length > 0) {
                const sample = result.data[0];
                console.log(`  📝 Sample: ${JSON.stringify(sample).substring(0, 80)}...`);
            }
            
        } catch (error) {
            results.push({
                endpoint,
                status: '❌ FAILED',
                error: error.error || error.message,
                statusCode: error.status
            });
            
            console.log(`  ❌ Error: ${error.error || error.message}`);
        }
        
        console.log('');
    }
    
    // Summary
    console.log('='.repeat(80));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(80));
    
    const successful = results.filter(r => r.status === '✅ SUCCESS').length;
    const failed = results.filter(r => r.status === '❌ FAILED').length;
    
    console.log(`Total Endpoints: ${endpoints.length}`);
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((successful / endpoints.length) * 100).toFixed(1)}%`);
    
    console.log('\n📋 DETAILED RESULTS:');
    console.log('-'.repeat(80));
    
    results.forEach(result => {
        const statusIcon = result.status === '✅ SUCCESS' ? '✅' : '❌';
        const count = result.count ? `(${result.count} items)` : '';
        console.log(`${statusIcon} ${result.endpoint.padEnd(15)} ${result.status} ${count}`);
    });
    
    // Show failed endpoints details
    const failedEndpoints = results.filter(r => r.status === '❌ FAILED');
    if (failedEndpoints.length > 0) {
        console.log('\n❌ FAILED ENDPOINTS DETAILS:');
        console.log('-'.repeat(80));
        failedEndpoints.forEach(result => {
            console.log(`${result.endpoint}: ${result.error}`);
        });
    }
    
    console.log('\n🎯 RECOMMENDATIONS:');
    console.log('-'.repeat(80));
    
    if (failed === 0) {
        console.log('🎉 All endpoints are working perfectly!');
        console.log('✅ Your API is ready for production use');
    } else {
        console.log(`⚠️  ${failed} endpoint(s) need attention`);
        console.log('🔧 Check the failed endpoints above and fix any issues');
    }
}

// Run the test
testAllEndpoints().catch(console.error); 