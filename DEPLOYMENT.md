# Deploying Curdor Mock API to Vercel

This guide will walk you through deploying your Curdor Mock API to Vercel for free, making it publicly accessible to developers worldwide.

## Prerequisites

- A GitHub account
- A Vercel account (free)
- Your project code ready

## Step 1: Prepare Your Repository

1. **Create a GitHub repository** (if you haven't already)
2. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Curdor Mock API"
   git branch -M main
   git remote add origin https://github.com/yourusername/curdor-mock-api.git
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your GitHub repository:**
   - Select your `curdor-mock-api` repository
   - Vercel will auto-detect it's a Node.js project
4. **Configure the project:**
   - **Framework Preset:** Node.js
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** Leave empty (not needed for this project)
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`
   - **Development Command:** `npm run dev`
5. **Click "Deploy"**

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Confirm settings
   - Deploy

## Step 3: Verify Deployment

After deployment, Vercel will provide you with:
- **Production URL:** `https://your-project.vercel.app`
- **Preview URL:** For future deployments

### Test Your Deployment

1. **API Information:**
   ```bash
   curl https://your-project.vercel.app/api
   ```

2. **Health Check:**
   ```bash
   curl https://your-project.vercel.app/health
   ```

3. **Test Endpoints:**
   ```bash
   curl https://your-project.vercel.app/api/users
   curl https://your-project.vercel.app/api/products
   ```

4. **Frontend:**
   - Visit `https://your-project.vercel.app/` for the homepage
   - Visit `https://your-project.vercel.app/docs.html` for documentation

## Step 4: Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain

2. **Configure DNS:**
   - Add the required DNS records
   - Wait for propagation (up to 24 hours)

## Step 5: Environment Variables (If Needed)

If you need to add environment variables:

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Environment Variables"
   - Add any required variables

2. **Common variables:**
   - `NODE_ENV=production`
   - `PORT=3000` (Vercel sets this automatically)

## Step 6: Automatic Deployments

Vercel automatically:
- **Deploys** when you push to your main branch
- **Creates preview deployments** for pull requests
- **Handles SSL certificates** automatically
- **Provides CDN** for global performance

## Troubleshooting

### Common Issues

1. **Build Fails:**
   - Check that `package.json` has correct scripts
   - Ensure all dependencies are in `dependencies` (not `devDependencies`)
   - Check Vercel build logs

2. **API Not Working:**
   - Verify `vercel.json` configuration
   - Check that `server.js` is the main entry point
   - Test locally first

3. **Static Files Not Serving:**
   - Ensure files are in the `public/` directory
   - Check file permissions

### Performance Optimization

1. **Enable Caching:**
   - Vercel automatically caches static assets
   - API responses are cached based on headers

2. **Monitor Usage:**
   - Check Vercel dashboard for usage statistics
   - Monitor API response times

## Vercel Free Tier Limits

- **Serverless Functions:** 100GB-hours/month
- **Bandwidth:** 100GB/month
- **Build Time:** 100 minutes/month
- **Custom Domains:** Unlimited
- **Team Members:** Unlimited

For a mock API, these limits are more than sufficient.

## Next Steps

After successful deployment:

1. **Share your API URL** with the developer community
2. **Add to API directories** like:
   - [Public APIs](https://github.com/public-apis/public-apis)
   - [API List](https://apilist.fun/)
3. **Create documentation** on GitHub
4. **Monitor usage** and gather feedback

## Support

- **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Project Issues:** Create an issue in your GitHub repository

---

**Your Curdor Mock API is now live and ready for the world! 🚀** 