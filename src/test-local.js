#!/usr/bin/env node

/**
 * Local test script for the Lambda function
 * Run with: node test-local.js
 */

const { handler } = require('./index.js');

// Sample test events
const testEvents = [
    {
        name: 'Basic GET Request',
        event: {
            httpMethod: 'GET',
            path: '/',
            headers: {
                'Content-Type': 'application/json'
            },
            queryStringParameters: null,
            body: null
        }
    },
    {
        name: 'POST Request with Body',
        event: {
            httpMethod: 'POST',
            path: '/api/data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer test-token'
            },
            queryStringParameters: {
                limit: '10'
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com'
            })
        }
    },
    {
        name: 'Empty Event',
        event: {}
    }
];

// Mock context
const mockContext = {
    awsRequestId: 'test-' + Date.now(),
    functionName: 'lambda-basic-local',
    functionVersion: '$LATEST',
    invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:lambda-basic-local',
    memoryLimitInMB: '128',
    remainingTimeInMillis: 30000
};

async function runTests() {
    console.log('🧪 Running local tests...\n');

    for (const test of testEvents) {
        console.log(`📋 Test: ${test.name}`);
        console.log(`📥 Input:`, JSON.stringify(test.event, null, 2));

        try {
            const result = await handler(test.event, mockContext);
            console.log(`✅ Output:`, JSON.stringify(result, null, 2));
        } catch (error) {
            console.log(`❌ Error:`, error.message);
        }

        console.log('─'.repeat(50));
    }

    console.log('🎉 All tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = { runTests, testEvents, mockContext };
