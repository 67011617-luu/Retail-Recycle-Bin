# Smart Waste Management System

A MERN stack application that encourages recycling by rewarding users with points for disposing of recyclable items.

## 🚀 Tech Stack

- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Font:** Poppins (Google Fonts)
- **Icons:** Tabler Icons
- **Hardware:** Raspberry Pi + Barcode Scanner + LCD Touch Display + Smart Bin

## 📋 Features

- Barcode scanning for product identification
- Real-time sensor verification for item disposal
- User authentication via phone number
- Points-based reward system
- Transaction history tracking
- Responsive UI with modern design

## 🏗️ Project Structure

```
smart-waste-management/
├── client/               # React frontend
│   ├── src/
│   │   ├── pages/       # React pages
│   │   ├── services/    # API service layer
│   │   └── index.css    # Global styles
│   └── package.json
├── server/              # Express backend
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utilities & seed data
│   └── app.js
└── hardware/            # Raspberry Pi code (future)
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account
- npm or yarn

### 1. Install Server Dependencies

```bash
cd server
npm install
```

### 2. Install Client Dependencies

```bash
cd client
npm install
```

### 3. Configure Environment Variables

The `.env` file is already configured with your MongoDB connection:

```env
MONGODB_URI=mongodb+srv://67011617_db_user:jceOBIIhZsKrGcBW@cluster0.ixxfd9a.mongodb.net/smart-waste-db?retryWrites=true&w=majority&appName=Cluster0
PORT=5001
NODE_ENV=development
```

**Important:** Before running, ensure your IP address is whitelisted in MongoDB Atlas:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to Network Access
3. Click "Add IP Address"
4. Add your current IP or `0.0.0.0/0` for development

### 4. Seed the Database

```bash
cd server
npm run seed
```

This will populate your database with:
- 8 sample products with barcodes
- 3 test users

Sample barcodes you can use:
- `885012300001` - Coca-Cola Bottle (Plastic, 10 points)
- `885012300002` - Pepsi Can (Metal, 15 points)
- `885012300003` - Glass Water Bottle (Glass, 20 points)

Sample phone numbers:
- `0812345678` - John Doe
- `0887654321` - Jane Smith
- `0811111111` - Test User

### 5. Start the Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5001`

### 6. Start the Frontend

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Products
- `POST /api/products/scan` - Scan product by barcode
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product

### Users
- `POST /api/users/verify` - Verify user by phone
- `POST /api/users/register` - Register new user
- `GET /api/users/:phone` - Get user by phone

### Rewards
- `POST /api/rewards` - Award points to user

### History
- `GET /api/history/:phone` - Get transaction history
- `GET /api/history` - Get all transactions

## 🎯 User Flow

1. **Home Screen** - Welcome and instructions
2. **Scan Barcode** - Enter/scan product barcode
3. **Product Info** - Display material type and points
4. **Disposal** - Wait for sensor verification
5. **Phone Verification** - Enter phone number
6. **Reward Screen** - Display earned points and balance

## 🎨 Design System

**Colors:**
- Primary: `#667eea` (Purple gradient)
- Secondary: `#764ba2`
- Success: `#10b981`
- Text: Poppins font family

**Font Weights:**
- 700 - Main headings
- 600 - Section titles
- 500 - Buttons
- 400 - Body text

## 🔐 Security Notes

⚠️ **For Production:**
- Move `.env` to server-only and add to `.gitignore`
- Add authentication middleware to admin routes
- Implement rate limiting
- Add input sanitization
- Use HTTPS
- Implement proper session management

## 🛠️ Hardware Integration (Future)

The system is designed to integrate with:
- Raspberry Pi controller
- USB barcode scanner
- IR/weight sensors for disposal verification
- LCD touch display for UI

## 📝 License

MIT

## 👥 Contributors

Built for recycling and environmental sustainability.

---

**Need Help?**
- Check MongoDB Atlas network access if connection fails
- Ensure both servers are running (backend on 5000, frontend on 3000)
- Clear browser cache if UI issues occur
