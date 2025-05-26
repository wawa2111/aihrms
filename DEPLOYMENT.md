# Deployment Guide for HRPBloom HRMS

## Domain Configuration

The domain `hrpbloom.com` has been configured with the following DNS records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 76.76.21.21 | Automatic |
| CNAME Record | www | cname.vercel-dns.com. | Automatic |
| NS Record | ns1 | ns1.vercel-dns.com. | Automatic |
| NS Record | ns2 | ns2.vercel-dns.com. | Automatic |
| TXT Record | _vercel | vc-domain-verify=hrpbloom.com,cecfdbd1dc9df9666680 | Automatic |
| TXT Record | _vercel | vc-domain-verify=www.hrpbloom.com,c166def13f2f584e29fc | Automatic |

## MongoDB Configuration

The MongoDB connection string has been updated to:
```
mongodb+srv://admin:<db_password>@cluster0.rflorco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Replace `<db_password>` with your actual MongoDB password in the production environment.

## Vercel Deployment Steps

1. **Connect your GitHub repository to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Configure the project settings

2. **Configure Environment Variables**:
   - Add the following environment variables in Vercel:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWTSECRET`: A secure JWT secret key
     - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
     - `CLOUDINARY_API_KEY`: Your Cloudinary API key
     - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
     - `GEMINI_API_KEY`: Your Gemini API key
     - `EMAIL_SERVICE`: Email service provider (e.g., gmail)
     - `EMAIL_USER`: Email username
     - `EMAIL_PASS`: Email password or app password
     - `EMAIL_FROM`: Sender email address
     - `CLIENT_URL`: https://hrpbloom.com
     - `ADMIN_MASTER_PASSWORD`: Secure password for admin access

3. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application

4. **Verify Domain Configuration**:
   - After deployment, go to "Settings" > "Domains"
   - Ensure that both `hrpbloom.com` and `www.hrpbloom.com` are configured
   - Verify that the DNS records match those listed above

## Post-Deployment Verification

1. Visit https://hrpbloom.com to ensure the application is running
2. Test the admin login with the master password
3. Verify that the MongoDB connection is working properly
4. Check that all features are functioning as expected

## Troubleshooting

If you encounter issues with the deployment:

1. Check Vercel logs for any build or runtime errors
2. Verify that all environment variables are correctly set
3. Ensure MongoDB connection is accessible from Vercel's servers
4. Check that the domain DNS propagation is complete