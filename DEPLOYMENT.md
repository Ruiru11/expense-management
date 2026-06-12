# Deployment Guide: Vercel + Railway

This guide will help you deploy your Contributions Tracker with:
- **Frontend** on Vercel (React/Vite app)
- **Backend** on Railway (Express server)

## Prerequisites

- GitHub account
- Vercel account ([vercel.com](https://vercel.com))
- Railway account ([railway.app](https://railway.app))
- Your code pushed to GitHub

---

## Part 1: Deploy Backend to Railway

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `contributions-tracker` repository
5. Railway will auto-detect it's a Node.js app

### Step 3: Configure Environment Variables

In Railway project settings, add these environment variables:

```
PORT=3001
ADMIN_PASSWORD=11/06/2026:22:00
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

**Note:** You'll update `FRONTEND_URL` after deploying to Vercel in Part 2.

### Step 4: Configure Build Settings

Railway should auto-detect, but verify:
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Root Directory:** `/` (leave empty or set to root)

### Step 5: Get Your Backend URL

After deployment, Railway will give you a URL like:
```
https://contributions-tracker-production.up.railway.app
```

**Copy this URL** - you'll need it for Vercel!

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your `contributions-tracker` repository
4. Vercel will auto-detect it's a Vite app

### Step 2: Configure Build Settings

Vercel should auto-configure, but verify:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 3: Add Environment Variable

In Vercel project settings → Environment Variables, add:

```
VITE_API_URL=https://your-railway-url.up.railway.app/api
```

Replace `your-railway-url` with the URL from Railway (Step 5 of Part 1).

### Step 4: Deploy

Click **"Deploy"** and wait for the build to complete.

### Step 5: Get Your Frontend URL

Vercel will give you a URL like:
```
https://contributions-tracker.vercel.app
```

---

## Part 3: Update Railway with Frontend URL

1. Go back to Railway
2. Update the `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://contributions-tracker.vercel.app
   ```
3. Railway will automatically redeploy

---

## Testing Your Deployment

1. Visit your Vercel URL: `https://contributions-tracker.vercel.app`
2. Try adding a contribution (should work without password)
3. Try editing/deleting (should require password: `11/06/2026:22:00`)
4. Check that data persists after refresh

---

## Important Notes

### Data Persistence
- Data is stored in `server/data.json` on Railway
- Railway provides persistent storage by default
- **Backup:** Download `data.json` periodically from Railway dashboard

### Password Security
- Never commit `.env` files to GitHub
- Change the default password after deployment
- Update `ADMIN_PASSWORD` in Railway environment variables

### Custom Domain (Optional)
- **Vercel:** Add custom domain in project settings
- **Railway:** Add custom domain in project settings
- Update `FRONTEND_URL` and `VITE_API_URL` accordingly

---

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` in Vercel environment variables
- Verify Railway backend is running
- Check CORS settings in `server/server.js`

### Password not working
- Verify `ADMIN_PASSWORD` in Railway matches your password
- Check browser console for errors
- Verify Railway logs for password verification attempts

### Build failures
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Check build logs in Vercel/Railway dashboard

---

## Updating Your App

### Update Frontend
```bash
git add .
git commit -m "Update frontend"
git push origin main
```
Vercel will auto-deploy.

### Update Backend
```bash
git add .
git commit -m "Update backend"
git push origin main
```
Railway will auto-deploy.

---

## Cost Estimate

- **Vercel:** Free tier (100GB bandwidth, unlimited projects)
- **Railway:** $5/month credit (usually enough for small apps)
- **Total:** Free to ~$5/month

---

## Next Steps

1. ✅ Deploy backend to Railway
2. ✅ Deploy frontend to Vercel
3. ✅ Update environment variables
4. ✅ Test the application
5. 🎉 Share your app!

Your app will be live at:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.railway.app`
