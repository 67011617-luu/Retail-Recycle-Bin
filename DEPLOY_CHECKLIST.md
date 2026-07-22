# 🚀 Quick Deployment Checklist

Follow these steps in order to deploy your Smart Waste Management System.

---

## ✅ Pre-Deployment (5 minutes)

### 1. Update MongoDB Atlas Network Access
```
□ Go to https://cloud.mongodb.com
□ Click "Network Access" in sidebar
□ Click "Add IP Address"
□ Enter: 0.0.0.0/0 (allows all IPs)
□ Click "Confirm"
```

### 2. Push Latest Code to GitHub
```bash
cd "/Users/luchit/Desktop/Recycle Bin"
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

## 🔧 Backend Deployment - Render (10 minutes)

### 1. Create Render Account
```
□ Go to https://render.com
□ Sign up with GitHub
□ Authorize Render
```

### 2. Create Web Service
```
□ Click "New +" → "Web Service"
□ Connect "Retail-Recycle-Bin" repository
□ Configure:
  Name: smart-waste-backend
  Branch: main
  Root Directory: server
  Runtime: Node
  Build Command: npm install
  Start Command: npm start
```

### 3. Add Environment Variables
```
Click "Advanced" → Add these variables:

□ MONGODB_URI
  Value: mongodb+srv://67011617_db_user:jceOBIIhZsKrGcBW@cluster0.ixxfd9a.mongodb.net/smart-waste-db?retryWrites=true&w=majority&appName=Cluster0

□ PORT
  Value: 5001

□ NODE_ENV
  Value: production
```

### 4. Deploy & Test
```
□ Click "Create Web Service"
□ Wait 2-5 minutes for deployment
□ Copy your URL (e.g., https://smart-waste-backend.onrender.com)
□ Test: Visit https://YOUR-URL.onrender.com/api/health
□ Should see: {"status":"ok",...}
```

---

## 🎨 Frontend Deployment - Vercel (10 minutes)

### 1. Update Frontend Config
```bash
# Update client/.env.production with your Render URL
cd "/Users/luchit/Desktop/Recycle Bin"

# Edit client/.env.production
# Change: VITE_API_URL=https://YOUR-RENDER-URL.onrender.com/api

# Update server/app.js CORS
# Add your Vercel domain (you'll get this after deployment)

git add .
git commit -m "Add production configuration"
git push origin main
```

### 2. Create Vercel Account
```
□ Go to https://vercel.com
□ Sign up with GitHub
□ Authorize Vercel
```

### 3. Import Project
```
□ Click "Add New" → "Project"
□ Find "Retail-Recycle-Bin"
□ Click "Import"
□ Configure:
  Framework Preset: Vite
  Root Directory: client
  Build Command: npm run build
  Output Directory: dist
```

### 4. Add Environment Variable
```
□ Click "Environment Variables"
□ Add:
  Name: VITE_API_URL
  Value: https://YOUR-RENDER-URL.onrender.com/api
  (Use your actual Render URL from step above)
```

### 5. Deploy
```
□ Click "Deploy"
□ Wait 1-2 minutes
□ Copy your Vercel URL (e.g., https://retail-recycle-bin.vercel.app)
```

---

## 🔄 Update CORS (5 minutes)

### 1. Add Vercel Domain to Backend
```bash
cd "/Users/luchit/Desktop/Recycle Bin"

# Edit server/app.js
# In the corsOptions origin array, add your Vercel URL:
# 'https://YOUR-VERCEL-URL.vercel.app'

git add server/app.js
git commit -m "Update CORS for production"
git push origin main
```

### 2. Wait for Auto-Deploy
```
□ Render will automatically redeploy (2-3 minutes)
□ Check Render dashboard for completion
```

---

## ✅ Final Testing (5 minutes)

### 1. Test Backend API
```bash
# Replace with your Render URL
curl https://YOUR-RENDER-URL.onrender.com/api/health

# Test product scan
curl -X POST https://YOUR-RENDER-URL.onrender.com/api/products/scan \
  -H "Content-Type: application/json" \
  -d '{"barcode":"885012300001"}'
```

### 2. Test Frontend
```
□ Visit your Vercel URL
□ Click "Start Scanning"
□ Enter barcode: 885012300001
□ Should load: Coca-Cola Bottle
□ Complete the full workflow
□ Test camera scanner
□ Register a new user
□ Earn points
```

---

## 🎉 Deployment Complete!

Your app is now live at:
- **Frontend:** https://YOUR-VERCEL-URL.vercel.app
- **Backend:** https://YOUR-RENDER-URL.onrender.com

Share these URLs with users! 🌍♻️

---

## 🐛 Common Issues

### Backend not responding
```
□ Check Render logs (Dashboard → Logs)
□ Verify MongoDB IP whitelist (0.0.0.0/0)
□ Check environment variables are set
```

### CORS errors in browser
```
□ Verify Vercel URL is in server/app.js corsOptions
□ Push changes and wait for Render redeploy
□ Clear browser cache
```

### API calls fail with 404
```
□ Verify VITE_API_URL in Vercel environment variables
□ Should end with /api
□ Redeploy frontend on Vercel
```

### Camera not working in production
```
□ Ensure Vercel provides HTTPS (automatic)
□ Test on mobile device with HTTPS URL
□ Allow camera permissions in browser
```

---

## 📱 Share Your App

Once deployed, share with:
- QR Code generator: https://www.qr-code-generator.com/
- Custom domain (optional): See DEPLOYMENT.md
- Social media: Share the Vercel URL

---

## 💡 Pro Tips

1. **Free Tier Limits:**
   - Render: Service sleeps after 15 min (first load takes 30-60s)
   - Vercel: 100GB bandwidth/month
   - MongoDB: 512MB storage

2. **Keep Backend Awake:**
   - Use UptimeRobot (free) to ping your API every 5 minutes
   - Or upgrade to Render paid plan ($7/month)

3. **Monitor Performance:**
   - Vercel Dashboard: View analytics
   - Render Dashboard: Check logs
   - MongoDB Atlas: Monitor database

4. **Updates:**
   - Just push to GitHub: `git push origin main`
   - Both services auto-deploy!

---

**Total Time:** ~30-35 minutes
**Cost:** $0 (Free tier)
**Status:** Production Ready! ✅
