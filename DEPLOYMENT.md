# 🚀 Deployment Guide

Deploy your Smart Waste Management System to production using **Vercel** (frontend) and **Render** (backend).

---

## 📋 Overview

- **Frontend** → Vercel (React/Vite app)
- **Backend** → Render (Node.js/Express API)
- **Database** → MongoDB Atlas (already configured)

---

## 🔧 Part 1: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment

Your backend is already configured! Just verify these files exist:

**✅ server/package.json** - Has start script
**✅ server/app.js** - Express server
**✅ .env** - Environment variables (will be set in Render)

### Step 2: Create Render Account

1. Go to https://render.com
2. Click "Get Started" or "Sign Up"
3. Sign up with GitHub account (recommended)
4. Authorize Render to access your repositories

### Step 3: Create Web Service on Render

1. **Click "New +"** → Select "Web Service"

2. **Connect Repository:**
   - Click "Connect" next to `Retail-Recycle-Bin`
   - If not visible, click "Configure account" to grant access

3. **Configure Service:**
   ```
   Name: smart-waste-backend (or any name you prefer)
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   Add these variables:
   ```
   MONGODB_URI = mongodb+srv://67011617_db_user:jceOBIIhZsKrGcBW@cluster0.ixxfd9a.mongodb.net/smart-waste-db?retryWrites=true&w=majority&appName=Cluster0
   
   PORT = 5001
   
   NODE_ENV = production
   ```

5. **Create Web Service:**
   - Click "Create Web Service"
   - Wait 2-5 minutes for deployment
   - You'll get a URL like: `https://smart-waste-backend.onrender.com`

### Step 4: Test Backend Deployment

Once deployed, test your API:

```bash
# Replace with your Render URL
curl https://smart-waste-backend.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Smart Waste Management System API is running",
  "timestamp": "..."
}
```

### Step 5: Seed Database (Optional)

If you need to seed your production database:

1. Go to Render Dashboard → Your Service
2. Click "Shell" tab
3. Run: `npm run seed`

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Update API URL for Production

Create a production environment variable file:

**client/.env.production**
```env
# Replace with your Render backend URL
VITE_API_URL=https://smart-waste-backend.onrender.com/api
```

Commit this file:
```bash
cd "/Users/luchit/Desktop/Recycle Bin"
git add client/.env.production
git commit -m "Add production API URL"
git push origin main
```

### Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended)
4. Authorize Vercel to access your repositories

### Step 3: Import Project to Vercel

1. **Click "Add New"** → "Project"

2. **Import Repository:**
   - Find `Retail-Recycle-Bin` in the list
   - Click "Import"

3. **Configure Project:**
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables:**
   Click "Environment Variables" section
   
   Add:
   ```
   Name: VITE_API_URL
   Value: https://smart-waste-backend.onrender.com/api
   ```
   (Replace with your actual Render URL)

5. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes
   - You'll get a URL like: `https://retail-recycle-bin.vercel.app`

### Step 4: Test Frontend

1. Visit your Vercel URL
2. Click "Start Scanning"
3. Enter barcode: `885012300001`
4. Should load product from your Render backend!

---

## 🔐 Part 3: Configure CORS

Update CORS settings in backend to allow your Vercel domain.

**server/app.js:**

Currently you have:
```javascript
app.use(cors());
```

For production, update to:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://retail-recycle-bin.vercel.app',  // Your Vercel URL
    'https://your-custom-domain.com'           // If you have one
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

Commit and push:
```bash
git add server/app.js
git commit -m "Configure CORS for production"
git push origin main
```

Render will auto-deploy the update!

---

## 🌐 Part 4: Custom Domain (Optional)

### For Vercel (Frontend):

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `recycleapp.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

### For Render (Backend):

1. Go to Render Dashboard → Your Service
2. Click "Settings" → "Custom Domains"
3. Add your domain (e.g., `api.recycleapp.com`)
4. Configure CNAME record in DNS
5. SSL is automatic

---

## ⚙️ Part 5: Environment Variables Reference

### Backend (Render)

| Variable | Value | Notes |
|----------|-------|-------|
| MONGODB_URI | Your MongoDB Atlas connection string | Required |
| PORT | 5001 | Optional, Render sets automatically |
| NODE_ENV | production | Required |

### Frontend (Vercel)

| Variable | Value | Notes |
|----------|-------|-------|
| VITE_API_URL | https://your-backend.onrender.com/api | Required |

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Build fails on Render
```bash
Solution:
- Check "Root Directory" is set to "server"
- Verify package.json has all dependencies
- Check Render build logs for errors
```

**Problem:** API returns 500 errors
```bash
Solution:
- Check Render logs (Dashboard → Logs)
- Verify MongoDB connection string is correct
- Check if MongoDB Atlas IP whitelist includes Render IPs
  (Set to 0.0.0.0/0 in MongoDB Atlas → Network Access)
```

**Problem:** Render service keeps sleeping (Free plan)
```bash
This is normal behavior:
- Free tier spins down after 15 min inactivity
- First request after sleep takes 30-60 seconds
- Upgrade to paid plan for always-on service
```

### Frontend Issues

**Problem:** API calls fail with CORS error
```bash
Solution:
- Update CORS configuration in server/app.js
- Add your Vercel domain to allowed origins
- Redeploy backend on Render
```

**Problem:** Environment variable not working
```bash
Solution:
- Ensure variable name starts with VITE_
- Rebuild and redeploy on Vercel
- Check Vercel Dashboard → Settings → Environment Variables
```

**Problem:** Build fails on Vercel
```bash
Solution:
- Check "Root Directory" is set to "client"
- Verify Framework Preset is "Vite"
- Check build logs for dependency errors
```

### Database Issues

**Problem:** Can't connect to MongoDB
```bash
Solution:
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Use 0.0.0.0/0 to allow all IPs
4. Or add Render's IP ranges
```

---

## 📊 Deployment Checklist

### Pre-Deployment
- ✅ Code pushed to GitHub
- ✅ .env variables documented
- ✅ MongoDB Atlas IP whitelist configured
- ✅ Database seeded with initial data

### Backend (Render)
- ✅ Service created
- ✅ Environment variables set
- ✅ Build successful
- ✅ Health endpoint working
- ✅ API endpoints responding

### Frontend (Vercel)
- ✅ Project imported
- ✅ API URL configured
- ✅ Build successful
- ✅ Site loads correctly
- ✅ API calls working

### Post-Deployment
- ✅ Test complete user flow
- ✅ Camera scanner working
- ✅ Barcode scanning functional
- ✅ User registration working
- ✅ Points system functional
- ✅ CORS configured correctly

---

## 🚀 Quick Deploy Commands

### One-time Setup

```bash
# 1. Add production env file
cd client
echo 'VITE_API_URL=https://YOUR_RENDER_URL.onrender.com/api' > .env.production

# 2. Update CORS (edit server/app.js manually)

# 3. Commit and push
cd ..
git add .
git commit -m "Production deployment configuration"
git push origin main
```

### Deploy Updates

```bash
# Make your changes, then:
git add .
git commit -m "Your update message"
git push origin main

# Render and Vercel auto-deploy on push!
```

---

## 💰 Cost Breakdown

### Free Tier (What you can use):

**Vercel:**
- ✅ 100GB bandwidth/month
- ✅ Unlimited projects
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Free forever for personal projects

**Render:**
- ✅ 750 hours/month free
- ✅ Automatic HTTPS
- ⚠️ Service spins down after 15 min inactivity
- ⚠️ 512MB RAM, shared CPU

**MongoDB Atlas:**
- ✅ 512MB storage free
- ✅ Shared cluster
- ✅ Automatic backups

### Upgrade Options (if needed):

**Vercel Pro:** $20/month
- More bandwidth
- Team collaboration
- Advanced analytics

**Render Starter:** $7/month
- Always-on service
- 512MB RAM
- No spin down

**MongoDB M10:** $0.08/hour (~$57/month)
- Dedicated cluster
- 10GB storage
- Better performance

---

## 🔒 Security Best Practices

### Before Going Live:

1. **Remove Hardcoded Credentials:**
   - ✅ Already done - using environment variables

2. **Update MongoDB Network Access:**
   - Current: Your local IP
   - Production: 0.0.0.0/0 (or Render IP ranges)

3. **Enable Rate Limiting:**
   ```javascript
   npm install express-rate-limit
   // Add to server/app.js
   ```

4. **Add Helmet.js:**
   ```javascript
   npm install helmet
   // Add to server/app.js
   ```

5. **Set Secure CORS:**
   - Only allow your Vercel domain
   - Remove wildcard in production

---

## 📞 Support Links

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com/
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html

---

## ✅ Success!

Once deployed, your app will be live at:
- **Frontend:** https://retail-recycle-bin.vercel.app
- **Backend:** https://smart-waste-backend.onrender.com

Users can access it from anywhere in the world! 🌍♻️

---

## 🔄 CI/CD Pipeline

Both platforms support automatic deployments:

1. **Push to GitHub** → Both services detect changes
2. **Render builds backend** → Auto-deploys
3. **Vercel builds frontend** → Auto-deploys
4. **Zero downtime** → Seamless updates

That's it! You now have a production-ready recycling app! 🎉
