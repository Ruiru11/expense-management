# Quick Deploy Checklist (100% FREE)

## Before You Start
- [ ] Code is pushed to GitHub
- [ ] You have accounts on Vercel and Render (both free, no credit card needed)

---

## Option A: Render Only (Simplest - Everything in One Place)

### Step 1: Deploy Backend on Render (5 minutes)

1. **Create Account & Deploy**
   - Go to [render.com](https://render.com) (no credit card needed!)
   - Sign in with GitHub
   - Click **"New +"** → **"Web Service"**
   - Connect your `contributions-tracker` repository
   - Render will auto-detect Node.js

2. **Configure**
   - **Name:** `contributions-tracker-api`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - Click **"Advanced"** → Add Disk:
     - **Name:** `data`
     - **Mount Path:** `/opt/render/project/src/server`
     - **Size:** 1 GB

3. **Environment Variables**
   ```
   PORT=3001
   ADMIN_PASSWORD=11/06/2026:22:00
   NODE_ENV=production
   FRONTEND_URL=https://your-app.onrender.com
   ```

4. **Copy Backend URL**
   - Example: `https://contributions-tracker-api.onrender.com`

### Step 2: Deploy Frontend on Render (3 minutes)

1. **Create Static Site**
   - Click **"New +"** → **"Static Site"**
   - Select same repository
   - **Name:** `contributions-tracker`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

2. **Environment Variable**
   ```
   VITE_API_URL=https://contributions-tracker-api.onrender.com/api
   ```

3. **Deploy**
   - Click **"Create Static Site"**

4. **Copy Frontend URL**
   - Example: `https://contributions-tracker.onrender.com`

### Step 3: Update Backend

1. Go back to your backend service
2. Update `FRONTEND_URL` to your frontend URL
3. Save (auto-redeploys)

---

## Option B: Vercel + Render (Best Performance)

### Step 1: Deploy Backend on Render (5 minutes)

Same as Option A, Step 1 above.

### Step 2: Deploy Frontend on Vercel (3 minutes)

1. **Deploy**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click **"New Project"**
   - Import your repository

2. **Environment Variable**
   ```
   VITE_API_URL=https://contributions-tracker-api.onrender.com/api
   ```

3. **Deploy**
   - Vercel auto-configures everything
   - Click **"Deploy"**

4. **Copy Frontend URL**
   - Example: `https://contributions-tracker.vercel.app`

### Step 3: Update Render Backend

1. Go to Render backend service
2. Update `FRONTEND_URL` to your Vercel URL
3. Save

---

## Important Notes

### Free Tier Limitations
- **Render Free Tier:** Spins down after 15 min of inactivity
  - First request after sleep takes ~30 seconds to wake up
  - After that, works normally
  - Perfect for personal projects and demos

### Data Persistence
- ✅ Data persists with Render's persistent disk
- ✅ Your `data.json` file is safe even after restarts

### No Credit Card Required
- ✅ Render: Completely free, no credit card
- ✅ Vercel: Completely free, no credit card

---

## Test Your Deployment

1. Visit your frontend URL
2. Wait ~30 seconds if backend was sleeping
3. Add a contribution (no password)
4. Edit/Delete (password: `11/06/2026:22:00`)
5. Refresh - data should persist

---

## Cost

**Total: $0/month** 🎉

---

## Troubleshooting

### "Service Unavailable" on first load
- Backend is waking up from sleep
- Wait 30 seconds and refresh
- Subsequent requests will be fast

### Data not persisting
- Verify persistent disk is configured in Render
- Check mount path: `/opt/render/project/src/server`

---

## Done! 🎉

Your app is live and 100% free!
