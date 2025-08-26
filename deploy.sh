#!/bin/bash

# Lambda Basic Deployment Script
# This script packages and optionally deploys your Lambda function

set -e

FUNCTION_NAME="lambda-basic"
RUNTIME="nodejs20.x"
HANDLER="index.handler"
ZIP_FILE="src/function.zip"

echo "🚀 Starting deployment process for $FUNCTION_NAME..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:lambda

# Build the function
echo "🔨 Building function..."
npm run build

# Package the function
echo "📦 Packaging function..."
npm run package

# Check if package was created
if [ ! -f "$ZIP_FILE" ]; then
    echo "❌ Failed to create package file $ZIP_FILE"
    exit 1
fi

echo "✅ Function packaged successfully as $ZIP_FILE"

# Check if function exists
if aws lambda get-function --function-name "$FUNCTION_NAME" &> /dev/null; then
    echo "🔄 Updating existing function: $FUNCTION_NAME"
    aws lambda update-function-code \
        --function-name "$FUNCTION_NAME" \
        --zip-file "fileb://$ZIP_FILE"

    echo "✅ Function updated successfully!"
else
    echo "⚠️  Function $FUNCTION_NAME does not exist."
    echo "To create it, run:"
    echo "aws lambda create-function \\"
    echo "  --function-name $FUNCTION_NAME \\"
    echo "  --runtime $RUNTIME \\"
    echo "  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role \\"
    echo "  --handler $HANDLER \\"
    echo "  --zip-file fileb://$ZIP_FILE"
fi

echo "🎉 Deployment process completed!"
echo "📁 Package file: $ZIP_FILE"
echo "🔍 Check CloudWatch logs for execution details"
