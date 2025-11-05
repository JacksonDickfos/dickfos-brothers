# Deployment Guide: GitHub + Vercel

This guide will walk you through connecting your project to GitHub and deploying it on Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (you can sign up at [vercel.com](https://vercel.com))
- Git installed on your local machine
- Node.js and npm installed

## Step 1: Initialize Git Repository (if not already done)

If your project isn't already a git repository, initialize it:

```bash
cd /Users/jacksondickfos/dickfos-brothers
git init
```

## Step 2: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `dickfos-brothers` (or your preferred name)
   - **Description**: (optional) Add a description
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (since you already have these)
5. Click **"Create repository"**

## Step 3: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add all files to git
git add .

# Commit your files
git commit -m "Initial commit"

# Add the GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/dickfos-brothers.git

# Push to GitHub
git branch -M main
git push -u origin main
```

If you're using SSH instead of HTTPS:
```bash
git remote add origin git@github.com:YOUR_USERNAME/dickfos-brothers.git
```

## Step 4: Deploy to Vercel

### Option A: Import from GitHub (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. You'll see a list of your GitHub repositories
4. Find and click **"Import"** next to `dickfos-brothers`
5. Vercel will automatically detect it's a Next.js project

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Deploy from your project directory:
   ```bash
   cd /Users/jacksondickfos/dickfos-brothers
   vercel
   ```

3. Follow the prompts:
   - Link to existing project or create new
   - Confirm project settings
   - Deploy

## Step 5: Configure Project Settings on Vercel

Once imported, Vercel will show you the project settings:

1. **Framework Preset**: Should be automatically set to "Next.js"
2. **Root Directory**: Leave as `./` (unless your project is in a subdirectory)
3. **Build Command**: `npm run build` (should be auto-detected)
4. **Output Directory**: `.next` (should be auto-detected)
5. **Install Command**: `npm install` (should be auto-detected)

### Environment Variables

If your project uses environment variables (check for `.env.local` or `.env` files), you'll need to add them in Vercel:

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add each variable:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_SITE_URL`)
   - **Value**: Variable value
   - **Environment**: Select which environments (Production, Preview, Development)
3. Click **Save**

**Important**: If you're using `next-sitemap`, you may need to set:
- `NEXT_PUBLIC_SITE_URL` - Your production domain (e.g., `https://yourdomain.com`)

## Step 6: Deploy

1. Click **"Deploy"** button
2. Vercel will:
   - Install dependencies
   - Run the build command
   - Deploy your site
3. Once complete, you'll get a URL like: `https://dickfos-brothers.vercel.app`

## Step 7: Custom Domain (Optional)

To use a custom domain:

1. Go to your project dashboard on Vercel
2. Click **Settings** → **Domains**
3. Add your domain
4. Follow Vercel's instructions to configure DNS records
5. Update `NEXT_PUBLIC_SITE_URL` environment variable to your custom domain

## Step 8: Automatic Deployments

Once connected, Vercel will automatically:
- Deploy when you push to `main` branch (production)
- Create preview deployments for pull requests
- Rebuild when you push commits

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly
- Make sure `next-sitemap` has the correct `NEXT_PUBLIC_SITE_URL` set

### Sitemap Issues

If sitemap generation fails:
- Ensure `NEXT_PUBLIC_SITE_URL` environment variable is set in Vercel
- The sitemap runs as part of the build process (`npm run build`)

### Security Headers

Your `vercel.json` is already configured with security headers, so they'll be applied automatically.

## Future Updates

To update your site:
1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```
3. Vercel will automatically detect the push and redeploy

## Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
- [GitHub Documentation](https://docs.github.com)

