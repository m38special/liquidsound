# AWS + Remotion Lambda Setup Guide

**AWS Account:** `395671099412`
**Region:** `us-east-2` (Ohio)
**App Group ARN:** `arn:aws:resource-groups:us-east-2:395671099412:group/LiQUiDSOUND/04ntzxuf8t7w9vscue9jso91xf`

## Step 1 — Create IAM User

In AWS Console → IAM → Users → Create User:

- **Username:** `liquidsound-remotion`
- **Access type:** Programmatic access (access key)

## Step 2 — Attach Remotion Lambda Policy

Create a custom policy with the JSON below and attach it to the user.

**Policy name:** `LiQUiDSOUND-Remotion-Lambda`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "LambdaFunctions",
      "Effect": "Allow",
      "Action": [
        "lambda:CreateFunction",
        "lambda:DeleteFunction",
        "lambda:GetFunction",
        "lambda:InvokeFunction",
        "lambda:ListFunctions",
        "lambda:UpdateFunctionCode",
        "lambda:UpdateFunctionConfiguration",
        "lambda:ListAliases",
        "lambda:ListVersionsByFunction",
        "lambda:PublishVersion",
        "lambda:PutFunctionConcurrency",
        "lambda:AddLayerVersionPermission",
        "lambda:DeleteLayerVersion",
        "lambda:GetLayerVersion",
        "lambda:ListLayerVersions",
        "lambda:PublishLayerVersion"
      ],
      "Resource": [
        "arn:aws:lambda:us-east-2:395671099412:function:remotion-render-*",
        "arn:aws:lambda:us-east-2:395671099412:layer:*"
      ]
    },
    {
      "Sid": "S3Buckets",
      "Effect": "Allow",
      "Action": [
        "s3:CreateBucket",
        "s3:DeleteBucket",
        "s3:DeleteObject",
        "s3:GetObject",
        "s3:GetBucketLocation",
        "s3:ListBucket",
        "s3:PutBucketAcl",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy",
        "s3:GetBucketWebsite",
        "s3:PutBucketWebsite",
        "s3:GetBucketCORS",
        "s3:PutBucketCORS"
      ],
      "Resource": ["arn:aws:s3:::remotionlambda-*", "arn:aws:s3:::remotionlambda-*/*"]
    },
    {
      "Sid": "IAMRoles",
      "Effect": "Allow",
      "Action": [
        "iam:CreateRole",
        "iam:GetRole",
        "iam:AttachRolePolicy",
        "iam:DetachRolePolicy",
        "iam:DeleteRole",
        "iam:ListAttachedRolePolicies",
        "iam:PassRole"
      ],
      "Resource": "arn:aws:iam::395671099412:role/remotion-lambda-role"
    },
    {
      "Sid": "CloudWatchLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:GetLogEvents"
      ],
      "Resource": "arn:aws:logs:us-east-2:395671099412:log-group:/aws/lambda/remotion-render-*"
    },
    {
      "Sid": "ServiceQuotas",
      "Effect": "Allow",
      "Action": ["servicequotas:GetServiceQuota", "servicequotas:GetAWSDefaultServiceQuota"],
      "Resource": "*"
    }
  ]
}
```

## Step 3 — Save Credentials

After creating the IAM user, AWS shows the access key once. Save to `.env.local`:

```
AWS_ACCESS_KEY_ID=<key-id>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

## Step 4 — Deploy Remotion Lambda

**Already deployed** (2026-03-28):

```
Function: remotion-render-4-0-441-mem2048mb-disk2048mb-240sec
Region:   us-east-2
Memory:   2048 MB
Timeout:  240s
```

To redeploy:

```bash
pnpm --filter @liquid-sound/video deploy:lambda
```

## Step 5 — Bundle & Upload Compositions (Site)

**Already deployed** (2026-03-28):

```
Serve URL: https://remotionlambda-useast2-kohj42amea.s3.us-east-2.amazonaws.com/sites/liquidsound-v1/index.html
S3 Bucket: remotionlambda-useast2-kohj42amea
Site name: liquidsound-v1
```

To redeploy after changing compositions:

```bash
npx remotion lambda sites create apps/video/src/remotion-entry.tsx --site-name=liquidsound-v1
```

## Step 6 — Tag Resources

Tag all Lambda functions and S3 buckets with the app group tag so they appear in the LiQUiDSOUND resource group:

```
Key:   awsApplication
Value: arn:aws:resource-groups:us-east-2:395671099412:group/LiQUiDSOUND/04ntzxuf8t7w9vscue9jso91xf
```

## Step 7 — Start the Render Worker

```bash
# In production: run as a persistent process (PM2, Docker, ECS)
pnpm --filter @liquid-sound/video worker

# Test a render via API:
curl -X POST http://localhost:3000/api/videos/render \
  -H "Content-Type: application/json" \
  -d '{"compositionId": "SocialClip", "inputProps": {"headline": "Test render"}}'
```

## Remotion Lambda Limits (us-east-2 defaults)

| Limit                 | Default           | Notes                        |
| --------------------- | ----------------- | ---------------------------- |
| Concurrent executions | 1000              | Request increase if needed   |
| Lambda memory         | 2048 MB           | Configurable per render      |
| Max render duration   | 900s              | Remotion chunks large videos |
| S3 bucket prefix      | `remotionlambda-` | Auto-created by CLI          |
