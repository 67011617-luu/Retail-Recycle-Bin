# 🧪 API Testing Guide

Test all endpoints using curl or tools like Postman/Insomnia.

## Base URL
```
http://localhost:5000/api
```

---

## 1. Health Check

### Check Server Status
```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Smart Waste Management System API is running",
  "timestamp": "2026-07-22T..."
}
```

---

## 2. Product Endpoints

### Scan Product by Barcode
```bash
curl -X POST http://localhost:5000/api/products/scan \
  -H "Content-Type: application/json" \
  -d '{"barcode": "885012300001"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Coca-Cola Bottle",
    "material": "Plastic",
    "points": 10,
    "category": "Beverage"
  }
}
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Add New Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "barcode": "885012300099",
    "name": "Test Product",
    "material": "Plastic",
    "category": "Other",
    "points": 12
  }'
```

---

## 3. User Endpoints

### Verify User by Phone
```bash
curl -X POST http://localhost:5000/api/users/verify \
  -H "Content-Type: application/json" \
  -d '{"phone": "0812345678"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "phone": "0812345678",
    "totalPoints": 530
  }
}
```

### Register New User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "phone": "0899999999"
  }'
```

### Get User by Phone
```bash
curl http://localhost:5000/api/users/0812345678
```

---

## 4. Reward Endpoint

### Award Points to User
```bash
curl -X POST http://localhost:5000/api/rewards \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "0812345678",
    "barcode": "885012300001"
  }'
```

**Response:**
```json
{
  "success": true,
  "earnedPoints": 10,
  "totalPoints": 540,
  "data": {
    "transaction": {
      "_id": "...",
      "userId": "...",
      "productId": "...",
      "phone": "0812345678",
      "barcode": "885012300001",
      "product": "Coca-Cola Bottle",
      "material": "Plastic",
      "points": 10,
      "createdAt": "2026-07-22T..."
    },
    "user": {
      "name": "John Doe",
      "phone": "0812345678",
      "totalPoints": 540
    }
  }
}
```

---

## 5. History Endpoints

### Get User Transaction History
```bash
curl http://localhost:5000/api/history/0812345678
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "totalPoints": 540,
  "data": [
    {
      "_id": "...",
      "phone": "0812345678",
      "product": "Coca-Cola Bottle",
      "material": "Plastic",
      "points": 10,
      "createdAt": "2026-07-22T14:30:00"
    }
  ]
}
```

### Get All Transactions (Admin)
```bash
curl http://localhost:5000/api/history
```

---

## 🧪 Complete User Flow Test

### Step 1: Register a new user
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User Flow",
    "phone": "0800000000"
  }'
```

### Step 2: Scan a product
```bash
curl -X POST http://localhost:5000/api/products/scan \
  -H "Content-Type: application/json" \
  -d '{"barcode": "885012300001"}'
```

### Step 3: Award points
```bash
curl -X POST http://localhost:5000/api/rewards \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "0800000000",
    "barcode": "885012300001"
  }'
```

### Step 4: Check history
```bash
curl http://localhost:5000/api/history/0800000000
```

### Step 5: Verify updated points
```bash
curl -X POST http://localhost:5000/api/users/verify \
  -H "Content-Type: application/json" \
  -d '{"phone": "0800000000"}'
```

---

## 🔧 Using Postman

### Import Collection

Create a new Postman collection with:

**Variables:**
- `base_url`: `http://localhost:5000/api`
- `test_phone`: `0812345678`
- `test_barcode`: `885012300001`

### Example Request

**POST** `{{base_url}}/rewards`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "phone": "{{test_phone}}",
  "barcode": "{{test_barcode}}"
}
```

---

## ❌ Error Responses

### Product Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### User Not Found
```json
{
  "success": false,
  "message": "User not found. Please register first."
}
```

### Missing Parameters
```json
{
  "success": false,
  "message": "Please provide phone number and barcode"
}
```

### Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 📊 Database Queries

Connect to MongoDB to verify data:

```bash
# Using MongoDB Compass
mongodb+srv://67011617_db_user:jceOBIIhZsKrGcBW@cluster0.ixxfd9a.mongodb.net/smart-waste-db
```

Or use mongosh:
```bash
mongosh "mongodb+srv://cluster0.ixxfd9a.mongodb.net/smart-waste-db" --username 67011617_db_user
```

### Useful Queries:

```javascript
// Count all users
db.users.countDocuments()

// Find user by phone
db.users.findOne({ phone: "0812345678" })

// Count all products
db.products.countDocuments()

// Get recent transactions
db.transactions.find().sort({ createdAt: -1 }).limit(10)

// Calculate total points awarded
db.transactions.aggregate([
  { $group: { _id: null, total: { $sum: "$points" } } }
])
```

---

## 🎯 Test Scenarios

### Scenario 1: New User Journey
1. Scan product → 404 (user not registered)
2. Register user → 201 Created
3. Verify user → 200 OK (0 points)
4. Scan product → 200 OK
5. Award points → 200 OK
6. Verify user → 200 OK (has points now)

### Scenario 2: Returning User
1. Verify user → 200 OK
2. Scan product → 200 OK
3. Award points → 200 OK
4. Check history → 200 OK (shows all transactions)

### Scenario 3: Multiple Scans
1. Scan product 1 → Award → +10 points
2. Scan product 2 → Award → +15 points
3. Scan product 3 → Award → +20 points
4. Check total → 45 points

---

## 🐛 Common Issues

**Issue:** Connection refused
**Fix:** Make sure server is running on port 5000

**Issue:** CORS error
**Fix:** CORS is enabled, but check browser console

**Issue:** MongoDB connection timeout
**Fix:** Whitelist your IP in MongoDB Atlas Network Access

**Issue:** Duplicate key error
**Fix:** Barcode or phone already exists in database
