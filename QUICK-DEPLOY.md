# Quick Deploy Checklist

## Before You Start
- [ ] Code is pushed to GitHub
- [ ] You have accounts on Vercel and Railway

## Railway (Backend) - 5 minutes

1. **Deploy**
   - Go to railway.app → New Project → Deploy from GitHub
   - Select your repo

2. **Environment Variables**
   ```
   PORT=3001
   ADMIN_PASSWORD=11/06/2026:22:00
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```

3. **Copy Railway URL**
   - Example: `https://contributions-tracker-production.up.railway.app`

## Vercel (Frontend) - 3 minutes

1. **Deploy**
   - Go to vercel.com → New Project
   - Import your repo

2. **Environment Variable**
   ```
   VITE_API_URL=https://your-railway-url.up.railway.app/api
   ```

3. **Copy Vercel URL**
   - Example: `https://contributions-tracker.vercel.app`

## Final Step

1. **Update Railway**
   - Go back to Railway
   - Update `FRONTEND_URL` to your Vercel URL
   - Save (auto-redeploys)


## Done! 🎉

Your app is live and ready to share!
