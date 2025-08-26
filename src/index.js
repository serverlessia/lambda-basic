const AWS = require('aws-sdk');

/**
 * AWS Lambda handler function
 * @param {Object} event - Lambda event object
 * @param {Object} context - Lambda context object
 * @returns {Object} Response object with status code, headers, and body
 */
exports.handler = async (event, context) => {
    try {
        console.log('Event:', JSON.stringify(event, null, 2));
        console.log('Context:', JSON.stringify(context, null, 2));

        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
            },
            body: JSON.stringify({
                message: 'Hello from Lambda!',
                timestamp: new Date().toISOString(),
                requestId: context.awsRequestId,
                event: event
            })
        };

        return response;
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Internal server error',
                error: error.message,
                timestamp: new Date().toISOString()
            })
        };
    }
};
