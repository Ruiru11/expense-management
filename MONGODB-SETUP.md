# MongoDB Atlas Setup Guide

This guide will help you set up a **FREE** MongoDB Atlas database for persistent data storage.

## Why MongoDB Atlas?

✅ **512MB free forever**  
✅ **No credit card required**  
✅ **Data persists even when server sleeps**  
✅ **Works perfectly with Render free tier**

---

## Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with:
   - Email
   - Google account
   - GitHub account

3. Fill in the quick survey (choose any options)

---

## Step 2: Create a Free Cluster

1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select:
   - **Provider:** AWS (recommended)
   - **Region:** Choose closest to you (e.g., `eu-west-1` for Europe, `us-east-1` for USA)
   - **Cluster Name:** `contributions-tracker` (or any name)

4. Click **"Create"**

⏱️ Wait 1-3 minutes for cluster creation

---

## Step 3: Create Database User

1. You'll see **"Security Quickstart"**
2. Under **"How would you like to authenticate your connection?"**
   - Choose **"Username and Password"**
   - **Username:** `admin` (or any username)
   - **Password:** Click **"Autogenerate Secure Password"** and **COPY IT!**
   - ⚠️ **SAVE THIS PASSWORD** - you'll need it!

3. Click **"Create User"**

---

## Step 4: Set Up Network Access

1. Under **"Where would you like to connect from?"**
2. Click **"Add My Current IP Address"**
3. **IMPORTANT:** Also click **"Add a Different IP Address"**
   - Enter: `0.0.0.0/0`
   - Description: `Allow all (for Render deployment)`
   - This allows Render to connect

4. Click **"Finish and Close"**

---

## Step 5: Get Your Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select:
   - **Driver:** Node.js
   - **Version:** 6.0 or later

5. **COPY** the connection string - it looks like:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **IMPORTANT:** Replace `<password>` with your actual password from Step 3!

---

## Step 6: Update Your Local Environment

1. Create `.env` file in your project root:
   ```bash
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/contributions-tracker?retryWrites=true&w=majority
   ```

2. Replace:
   - `YOUR_PASSWORD` with your actual password
   - `cluster0.xxxxx` with your actual cluster URL
   - Added `/contributions-tracker` before the `?` (database name)

---

## Step 7: Update Render Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click your **expense-management** service
3. Go to **"Environment"** tab
4. Add new environment variable:
   - **Key:** `MONGODB_URI`
   - **Value:** Your full connection string from Step 6
   - Click **"Save"**

5. Your environment variables should now include:
   ```
   PORT=3001
   ADMIN_PASSWORD=11/06/2026:22:00
   NODE_ENV=production
   FRONTEND_URL=https://helpful-blancmange-2715bc.netlify.app
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/contributions-tracker?retryWrites=true&w=majority
   ```

---

## Step 8: Install Dependencies & Deploy

1. **Install MongoDB driver:**
   ```bash
   npm install
   ```

2. **Test locally:**
   ```bash
   npm run server
   ```
   
   You should see:
   ```
   ✅ Connected to MongoDB
   ✅ Server running on http://localhost:3001
   ```

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add MongoDB Atlas integration"
   git push origin main
   ```

4. **Render will auto-deploy** (2-3 minutes)

---

## Step 9: Verify It Works

1. Visit your Netlify site: `https://helpful-blancmange-2715bc.netlify.app`
2. Add a contribution
3. Refresh the page - data should persist!
4. Wait 15+ minutes for server to sleep
5. Visit again - **data is still there!** 🎉

---

## Troubleshooting

### "MongoServerError: bad auth"
- ❌ Wrong password in connection string
- ✅ Double-check password from Step 3

### "Connection timeout"
- ❌ IP not whitelisted
- ✅ Make sure you added `0.0.0.0/0` in Step 4

### "Cannot connect to MongoDB"
- ❌ Wrong connection string format
- ✅ Make sure you replaced `<password>` with actual password
- ✅ Make sure you added `/contributions-tracker` before the `?`

---

## What's Next?

✅ Your data now persists forever (even on free tier!)  
✅ No more data loss when server sleeps  
✅ 512MB storage (plenty for this app)  
✅ Can handle thousands of transactions  

**You're all set!** 🚀
