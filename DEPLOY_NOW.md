# 🚀 Deploy in 3 Steps (10 Minutes)

Your code is ready! Just follow these 3 steps.

---

## Step 1️⃣: MongoDB Setup (2 min)

**Allow connections from anywhere:**

1. Go to: https://cloud.mongodb.com
2. Click: **Network Access** (left sidebar)
3. Click: **Add IP Address**
4. Enter: `0.0.0.0/0`
5. Click: **Confirm**

✅ Done! Your database is ready.

---

## Step 2️⃣: Deploy Backend - Render (4 min)

**Create your API:**

1. Go to: https://render.com
2. Sign up with **GitHub**
3. Click: **New +** → **Web Service**
4. Select: **Retail-Recycle-Bin**
5. Fill in:
   - **Name:** `smart-waste-backend`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

6. Click **Advanced** and add **3 environment variables:**

   ```
   MONGODB_URI
   mongodb+srv://67011617_db_user:jceOBIIhZsKrGcBW@cluster0.ixxfd9a.mongodb.net/smart-waste-db?retryWrites=true&w=majority&appName=Cluster0
   
   PORT
   5001
   
   NODE_ENV
   production
   ```

7. Click: **Create Web Service**
8. Wait 3 minutes ⏱️
9. **Copy your URL** (looks like: `https://smart-waste-backend.onrender.com`)

✅ Test: Visit `https://YOUR-URL.onrender.com/api/health`

---

## Step 3️⃣: Deploy Frontend - Vercel (4 min)

**Create your website:**

1. Go to: https://vercel.com
2. Sign up with **GitHub**
3. Click: **Add New** → **Project**
4. Find: **Retail-Recycle-Bin**
5. Click: **Import**
6. Fill in:
   - **Framework:** `Vite`
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

7. Click **Environment Variables** and add:

   ```
   VITE_API_URL
   https://YOUR-RENDER-URL.onrender.com/api
   ```
   (Use the URL from Step 2)

8. Click: **Deploy**
9. Wait 2 minutes ⏱️
10. **Your app is live!** 🎉

✅ Visit your Vercel URL and test the app!

---

## 🎯 Quick Fix: Update CORS

Your backend needs to know about your frontend domain.

**Option A: Quick Fix (allows all)**
```bash
# In server/app.js, line 15, change to:
app.use(cors());
```

**Option B: Secure (recommended)**
```bash
# In server/app.js, line 15, add your Vercel URL:
const corsOptions = {
  origin: [
    'https://YOUR-VERCEL-URL.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
};
app.use(cors(corsOptions));
```

Then push:
```bash
git add server/app.js
git commit -m "Update CORS"
git push
```

Render will auto-redeploy in 2 minutes!

---

## ✅ You're Done!

Your Smart Waste Management System is now **LIVE** at:

- 🌐 **Website:** https://YOUR-VERCEL-URL.vercel.app
- 🔧 **API:** https://YOUR-RENDER-URL.onrender.com

**Test it:**
1. Visit your website
2. Click "Start Scanning"
3. Enter barcode: `885012300001`
4. See it work! ✨

---

## 📱 Share Your App

**Get QR Code:**
- Visit: https://www.qr-code-generator.com/
- Paste your Vercel URL
- Download and share!

---

## 💡 Tips

- **Free tier:** Both services are 100% free!
- **Auto-deploy:** Push to GitHub = auto-update both sites
- **First load slow?** Render free tier spins down after 15 min
- **Need help?** Check `DEPLOYMENT.md` for detailed guide

---

**Total Time:** ~10 minutes  
**Total Cost:** $0  
**Status:** Production ready! 🚀♻️
