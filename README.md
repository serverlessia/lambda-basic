# Lambda Basic

A simple AWS Lambda function with automated CI/CD and releases.

## Structure

```plaintext
lambda-basic/
├── src/                    # Lambda function code
├── .github/workflows/     # GitHub Actions
└── deploy.sh              # Local deployment
```

## Quick Start

```bash
# Install dependencies
npm install

# Test locally
npm run test

# Package for deployment
npm run package
```

## Deployment

### GitHub Releases (Recommended)

- Push to `main` branch triggers automatic release
- Download `function.zip` from releases
- Upload to AWS Lambda

### Local Deployment

```bash
./deploy.sh
```

## CI/CD

- **PR**: Validation and testing
- **Main**: Creates release with `function.zip`
- **Tags**: `v{number}` + `latest`

## Configuration

- **Runtime**: Node.js 20.x
- **Handler**: `index.handler`
- **No environment variables needed**

## IAM Permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

## License

MIT License
