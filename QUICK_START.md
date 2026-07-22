# 🚀 Quick Start Guide

## Step 1: Fix MongoDB Network Access

Before you can run the application, you need to whitelist your IP address in MongoDB Atlas:

1. Go to https://cloud.mongodb.com
2. Click on your project
3. Click "Network Access" in the left sidebar
4. Click "Add IP Address"
5. Either:
   - Click "Add Current IP Address" (recommended for security)
   - Or enter `0.0.0.0/0` to allow all IPs (for development only)
6. Click "Confirm"

## Step 2: Install Dependencies

### Option A: Automatic (Recommended)
```bash
./start.sh
```

This script will:
- Install all dependencies automatically
- Start both backend and frontend servers
- Open the application

### Option B: Manual

**Install server dependencies:**
```bash
cd server
npm install
```

**Install client dependencies:**
```bash
cd client
npm install
```

## Step 3: Seed the Database

Add sample products and users:

```bash
cd server
npm run seed
```

Expected output:
```
✅ Database seeded successfully!

Sample Products:
  - 885012300001: Coca-Cola Bottle (Plastic) - 10 points
  - 885012300002: Pepsi Can (Metal) - 15 points
  - 885012300003: Glass Water Bottle (Glass) - 20 points
  ...

Sample Users:
  - John Doe: 0812345678
  - Jane Smith: 0887654321
  - Test User: 0811111111
```

## Step 4: Start the Application

### Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Should show:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0.ixxfd9a.mongodb.net
Database: smart-waste-db
```

### Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

Should show:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

## Step 5: Test the Application

1. Open http://localhost:3000 in your browser
2. Click "Start Scanning"
3. Enter barcode: `885012300001`
4. Click "Scan Product"
5. See "Coca-Cola Bottle" with 10 points
6. Click "Continue to Disposal"
7. Wait for sensor confirmation (3 seconds)
8. Click "Continue to Verification"
9. Enter phone: `0812345678`
10. Click "Verify & Continue"
11. See your reward: +10 Points!

## 🐛 Troubleshooting

### MongoDB Connection Error (EBADRESP)
**Problem:** `Error: querySrv EBADRESP`

**Solution:** Your IP is not whitelisted in MongoDB Atlas. Follow Step 1 above.

### Port Already in Use
**Problem:** `Port 5000 (or 3000) is already in use`

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing
**Problem:** npm install hangs or fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Product Not Found
**Problem:** Barcode scan returns "Product not found"

**Solution:** Run the seed script to add sample products:
```bash
cd server
npm run seed
```

### User Not Found
**Problem:** Phone verification fails

**Solution:** Either:
- Use a sample user phone: `0812345678`, `0887654321`, or `0811111111`
- Or click "New User? Register Here" to create a new account

## 📝 Sample Test Data

### Barcodes to Test:
- `885012300001` - Coca-Cola Bottle (Plastic, 10 pts)
- `885012300002` - Pepsi Can (Metal, 15 pts)
- `885012300003` - Glass Water Bottle (Glass, 20 pts)
- `885012300004` - Cardboard Box (Cardboard, 5 pts)
- `885012300005` - Newspaper (Paper, 8 pts)
- `885012300006` - Sprite Bottle (Plastic, 10 pts)
- `885012300007` - Beer Bottle (Glass, 20 pts)
- `885012300008` - Juice Carton (Cardboard, 7 pts)

### Phone Numbers to Test:
- `0812345678` - John Doe
- `0887654321` - Jane Smith
- `0811111111` - Test User

## 🎯 Next Steps

- Add more products via the API or seed script
- Register new users through the UI
- Check transaction history on the reward screen
- Explore the codebase to customize styling or add features

## 📞 Need Help?

Check the main README.md for:
- Full API documentation
- Architecture overview
- Production deployment tips
- Hardware integration guide
