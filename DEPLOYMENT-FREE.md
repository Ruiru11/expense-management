# Free Deployment Guide: Render + Vercel

This guide shows you how to deploy your Contributions Tracker **100% FREE** using:
- **Backend** on Render (Free tier - no credit card needed)
- **Frontend** on Vercel (Free tier - no credit card needed)

**Total Cost: $0/month** 🎉

---

## Why This Stack?

| Service | What It Does | Free Tier | Limitations |
|---------|--------------|-----------|-------------|
| **Render** | Hosts backend API | 750 hrs/month | Spins down after 15 min idle |
| **Vercel** | Hosts frontend | Unlimited | 100GB bandwidth/month |

---

## Prerequisites

- GitHub account
- Render account ([render.com](https://render.com)) - **No credit card needed**
- Vercel account ([vercel.com](https://vercel.com)) - **No credit card needed**
- Your code pushed to GitHub

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with GitHub (no credit card required)

### Step 2: Create Web Service

1. Click **"New +"** in the top right
2. Select **"Web Service"**
3. Click **"Connect account"** to link your GitHub
4. Find and select your `contributions-tracker` repository
5. Click **"Connect"**

### Step 3: Configure Service

**Basic Settings:**
- **Name:** `contributions-tracker-api` (or any name you like)
- **Region:** Choose closest to you
- **Branch:** `main` (or your default branch)
- **Root Directory:** Leave empty
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** (should be selected by default)

### Step 4: Add Persistent Disk (Important!)

1. Scroll down to **"Disk"** section
2. Click **"Add Disk"**
3. Configure:
   - **Name:** `data`
   - **Mount Path:** `/opt/render/project/src/server`
   - **Size:** 1 GB (free tier allows up to 1GB)

This ensures your `data.json` file persists between deployments!

### Step 5: Add Environment Variables

Scroll to **"Environment Variables"** and add:

```
PORT=3001
ADMIN_PASSWORD=11/06/2026:22:00
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

**Note:** You'll update `FRONTEND_URL` after deploying frontend.

### Step 6: Deploy

1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. You'll see logs showing the build process

### Step 7: Get Your Backend URL

After deployment, you'll see a URL like:
```
https://contributions-tracker-api.onrender.com
```

**Copy this URL** - you'll need it for Vercel!

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with GitHub (no credit card required)

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Click **"Import"** next to your `contributions-tracker` repository
3. If you don't see it, click **"Adjust GitHub App Permissions"**

### Step 3: Configure Project

Vercel auto-detects Vite, so most settings are automatic:

- **Framework Preset:** Vite (auto-detected)
- **Root Directory:** `./` (leave as is)
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `dist` (auto-filled)

### Step 4: Add Environment Variable

1. Expand **"Environment Variables"**
2. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://contributions-tracker-api.onrender.com/api`
   
   (Replace with your Render backend URL from Part 1, Step 7)

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for build
3. You'll see a success screen with confetti! 🎉

### Step 6: Get Your Frontend URL

Vercel gives you a URL like:
```
https://contributions-tracker.vercel.app
```

**Copy this URL!**

---

## Part 3: Update Backend with Frontend URL

1. Go back to [Render Dashboard](https://dashboard.render.com)
2. Click on your `contributions-tracker-api` service
3. Go to **"Environment"** tab
4. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://contributions-tracker.vercel.app
   ```
5. Click **"Save Changes"**
6. Render will automatically redeploy (takes ~1 minute)

---

## Testing Your Deployment

### First Test (Backend Wake-Up)

1. Visit your Vercel URL: `https://contributions-tracker.vercel.app`
2. **Wait 30-60 seconds** on first load (backend is waking up from sleep)
3. You should see the app load

### Full Test

1. **Add a contribution** (no password needed)
   - Fill in name, amount, date
   - Click "Add Contribution"
   - Should appear in the list

2. **Edit an entry** (requires password)
   - Click the blue Edit button
   - Make changes
   - Enter password: `11/06/2026:22:00`
   - Should show success message

3. **Delete an entry** (requires password)
   - Click the red Delete button
   - Enter password: `11/06/2026:22:00`
   - Should show success message

4. **Refresh the page**
   - Data should persist

---

## Understanding the Free Tier

### Render Free Tier

**What you get:**
- ✅ 750 hours/month (enough for 24/7 operation)
- ✅ 1GB persistent disk storage
- ✅ Automatic HTTPS
- ✅ Automatic deployments from GitHub

**Limitations:**
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ Takes 30-60 seconds to wake up on first request
- ⚠️ Shared CPU (slower than paid tiers)

**Perfect for:**
- Personal projects
- Demos and portfolios
- Low-traffic applications

### Vercel Free Tier

**What you get:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Global CDN (fast worldwide)
- ✅ Automatic HTTPS
- ✅ Preview deployments for PRs

**Limitations:**
- ⚠️ 100GB bandwidth limit (plenty for most projects)

---

## Data Persistence

Your data is safe! Here's how:

1. **Persistent Disk on Render**
   - Data is stored in `/opt/render/project/src/server/data.json`
   - Persists across deployments and restarts
   - Backed up by Render

2. **Backup Recommendation**
   - Periodically download `data.json` from Render dashboard
   - Go to Shell tab → `cat server/data.json` → copy contents

---

## Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to Vercel project → Settings → Domains
2. Add your domain (e.g., `tracker.yourdomain.com`)
3. Follow DNS configuration instructions

### Add Custom Domain to Render

1. Go to Render service → Settings → Custom Domain
2. Add your API subdomain (e.g., `api.yourdomain.com`)
3. Update `VITE_API_URL` in Vercel to use new domain

---

## Updating Your App

### Update Code

```bash
git add .
git commit -m "Update app"
git push origin main
```

Both Vercel and Render will automatically deploy!

- **Vercel:** Deploys in ~1 minute
- **Render:** Deploys in ~2-3 minutes

---

## Troubleshooting

### Frontend loads but can't fetch data

**Problem:** CORS error or API not responding

**Solutions:**
1. Check `VITE_API_URL` in Vercel environment variables
2. Verify Render backend is running (check dashboard)
3. Wait 30 seconds if backend was sleeping
4. Check `FRONTEND_URL` in Render matches your Vercel URL

### "Service Unavailable" error

**Problem:** Backend is sleeping (free tier limitation)

**Solution:**
- Wait 30-60 seconds
- Refresh the page
- Backend will wake up and work normally

### Password not working

**Problem:** Password mismatch

**Solutions:**
1. Verify `ADMIN_PASSWORD` in Render environment variables
2. Make sure you're entering exactly: `11/06/2026:22:00`
3. Check Render logs for password verification attempts

### Data not persisting

**Problem:** Persistent disk not configured

**Solutions:**
1. Go to Render service → Settings → Disks
2. Verify disk is mounted at `/opt/render/project/src/server`
3. Redeploy if needed

### Build failures

**Vercel:**
- Check build logs in deployment details
- Verify `package.json` has all dependencies
- Check Node.js version compatibility

**Render:**
- Check deploy logs in dashboard
- Verify `npm install` completes successfully
- Check `npm start` command works

---

## Monitoring

### Render Dashboard
- View logs: Real-time server logs
- Metrics: CPU, memory usage
- Events: Deployment history

### Vercel Dashboard
- Analytics: Page views, performance
- Deployments: Build history
- Logs: Function logs

---

## Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| Render | Free | $0 |
| Vercel | Hobby | $0 |
| **Total** | | **$0/month** |

---

## Upgrading Later

If your app grows and you need better performance:

**Render:**
- Starter: $7/month (no sleep, faster CPU)
- Standard: $25/month (even faster)

**Vercel:**
- Pro: $20/month (more bandwidth, analytics)

But for now, **free is perfect!** 🎉

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel
3. ✅ Update environment variables
4. ✅ Test the application
5. 🎉 Share your app with the world!

Your app is now live at:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-api.onrender.com`

**Completely free, forever!** 🚀
