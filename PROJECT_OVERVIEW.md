# 📊 Project Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE                            │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Home   │  │ Scanner  │  │ Disposal │  │  Reward  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │              │             │          │
│       └─────────────┴──────────────┴─────────────┘          │
│                          │                                   │
│                    React Router                             │
│                          │                                   │
│                   API Service Layer                         │
└──────────────────────────┼──────────────────────────────────┘
                           │ HTTP/REST
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                    EXPRESS SERVER                            │
│                          │                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Route Handlers                         │    │
│  │  /products  /users  /rewards  /history            │    │
│  └────┬────────────┬────────────┬────────────┬────────┘    │
│       │            │            │            │              │
│  ┌────▼─────┐ ┌───▼──────┐ ┌──▼───────┐ ┌──▼────────┐    │
│  │ Product  │ │   User   │ │  Reward  │ │  History  │    │
│  │Controller│ │Controller│ │Controller│ │Controller │    │
│  └────┬─────┘ └───┬──────┘ └──┬───────┘ └──┬────────┘    │
│       │           │            │            │              │
│  ┌────▼───────────▼────────────▼────────────▼────┐        │
│  │              Mongoose Models                   │        │
│  │   Product    User    Transaction              │        │
│  └────────────────────┬──────────────────────────┘        │
└───────────────────────┼───────────────────────────────────┘
                        │
                        │ MongoDB Driver
                        │
┌───────────────────────▼───────────────────────────────────┐
│                  MONGODB ATLAS                             │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐    │
│  │   products   │  │    users     │  │transactions │    │
│  │  collection  │  │  collection  │  │ collection  │    │
│  └──────────────┘  └──────────────┘  └─────────────┘    │
│                                                            │
│  Cluster: cluster0.ixxfd9a.mongodb.net                   │
│  Database: smart-waste-db                                 │
└────────────────────────────────────────────────────────────┘
```

---

## Data Flow Example: Scanning & Rewarding

```
USER ACTION                    FRONTEND                BACKEND                 DATABASE
───────────────────────────────────────────────────────────────────────────────────────

1. Enter barcode
   "885012300001"
                              ─────────────►
                              POST /api/products/scan
                              {barcode: "885012300001"}
                                                      ─────────────►
                                                      Product.findOne()
                                                                    ◄─────────────
                                                                    Product found
                              ◄─────────────
                              {name, material, points}

2. Display product info
   "Coca-Cola Bottle"
   "Plastic - 10 Points"

3. Insert item in bin
   (Sensor verification)

4. Enter phone number
   "0812345678"
                              ─────────────►
                              POST /api/users/verify
                              {phone: "0812345678"}
                                                      ─────────────►
                                                      User.findOne()
                                                                    ◄─────────────
                                                                    User found
                              ◄─────────────
                              {name, totalPoints}

5. Award points
                              ─────────────►
                              POST /api/rewards
                              {phone, barcode}
                                                      ─────────────►
                                                      1. Find user
                                                      2. Find product
                                                      3. Create transaction
                                                      4. Update user points
                                                                    ◄─────────────
                                                                    All saved
                              ◄─────────────
                              {earnedPoints, totalPoints}

6. Display reward
   "+10 Points"
   "Total: 540 Points"
```

---

## File Structure

```
smart-waste-management/
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICK_START.md               # Quick setup guide
├── 📄 API_TESTING.md               # API testing examples
├── 📄 PROJECT_OVERVIEW.md          # This file
├── 📄 implementation.md            # Original spec
├── 📄 .env                         # Environment variables
├── 📄 .gitignore                   # Git ignore rules
├── 📄 start.sh                     # Startup script
│
├── 📁 client/                      # React Frontend
│   ├── 📄 index.html              # HTML template with Poppins
│   ├── 📄 vite.config.js          # Vite configuration
│   ├── 📄 package.json            # Frontend dependencies
│   │
│   └── 📁 src/
│       ├── 📄 main.jsx            # React entry point
│       ├── 📄 App.jsx             # Root component with routing
│       ├── 📄 index.css           # Global styles (Poppins)
│       │
│       ├── 📁 pages/              # React pages
│       │   ├── 📄 Home.jsx                    # ti-recycle
│       │   ├── 📄 BarcodeScanner.jsx          # ti-barcode
│       │   ├── 📄 DisposalVerification.jsx    # ti-trash
│       │   ├── 📄 PhoneVerification.jsx       # ti-device-mobile
│       │   └── 📄 RewardScreen.jsx            # ti-coins
│       │
│       └── 📁 services/           # API layer
│           └── 📄 api.js          # Axios HTTP client
│
├── 📁 server/                      # Express Backend
│   ├── 📄 app.js                  # Express server entry
│   ├── 📄 package.json            # Backend dependencies
│   │
│   ├── 📁 config/
│   │   └── 📄 database.js         # MongoDB connection
│   │
│   ├── 📁 models/                 # Mongoose schemas
│   │   ├── 📄 User.js             # User model
│   │   ├── 📄 Product.js          # Product model
│   │   └── 📄 Transaction.js      # Transaction model
│   │
│   ├── 📁 controllers/            # Business logic
│   │   ├── 📄 productController.js
│   │   ├── 📄 userController.js
│   │   ├── 📄 rewardController.js
│   │   └── 📄 historyController.js
│   │
│   ├── 📁 routes/                 # API endpoints
│   │   ├── 📄 productRoutes.js    # /api/products/*
│   │   ├── 📄 userRoutes.js       # /api/users/*
│   │   ├── 📄 rewardRoutes.js     # /api/rewards/*
│   │   └── 📄 historyRoutes.js    # /api/history/*
│   │
│   └── 📁 utils/
│       └── 📄 seedData.js         # Database seeder
│
└── 📁 hardware/                    # Future Raspberry Pi code
    ├── 📁 barcode-scanner/
    ├── 📁 sensors/
    └── 📁 raspberry-pi/
```

---

## Technology Stack Details

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3+ | UI framework |
| Vite | 5.2+ | Build tool |
| React Router | 6.22+ | Client-side routing |
| Axios | 1.6+ | HTTP client |
| Tabler Icons | 3.1+ | Icon library |
| Poppins Font | - | Typography (Google Fonts) |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 4.18+ | Web framework |
| Mongoose | 8.0+ | MongoDB ODM |
| CORS | 2.8+ | Cross-origin support |
| Morgan | 1.10+ | HTTP logger |
| dotenv | 16.3+ | Environment variables |

### Database
| Technology | Purpose |
|-----------|---------|
| MongoDB Atlas | Cloud database |
| Mongoose | Schema & validation |
| Indexes | Query optimization |

---

## API Endpoints Summary

### Products
```
POST   /api/products/scan     → Scan barcode
GET    /api/products           → List all products
POST   /api/products           → Add product (admin)
```

### Users
```
POST   /api/users/verify       → Verify phone number
POST   /api/users/register     → Register new user
GET    /api/users/:phone       → Get user details
```

### Rewards
```
POST   /api/rewards            → Award points
```

### History
```
GET    /api/history/:phone     → User transactions
GET    /api/history            → All transactions (admin)
```

---

## Database Schema

### users
```javascript
{
  _id: ObjectId,
  name: String (required),
  phone: String (required, unique, indexed),
  totalPoints: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### products
```javascript
{
  _id: ObjectId,
  barcode: String (required, unique, indexed),
  name: String (required),
  material: String (enum: Plastic, Glass, Metal, Paper, Cardboard),
  category: String (enum: Beverage, Food, Electronics, Household, Other),
  points: Number (required),
  imageUrl: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### transactions
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, indexed),
  productId: ObjectId (ref: Product),
  phone: String (indexed),
  barcode: String,
  product: String,
  material: String,
  points: Number,
  createdAt: Date (indexed),
  updatedAt: Date
}
```

---

## Security Considerations

### Current Implementation (Development)
- ✅ CORS enabled for all origins
- ✅ Input validation in Mongoose schemas
- ✅ Error handling middleware
- ✅ Environment variables for secrets

### Production Recommendations
- 🔒 Add JWT authentication
- 🔒 Rate limiting (express-rate-limit)
- 🔒 Input sanitization (express-validator)
- 🔒 Helmet.js for security headers
- 🔒 HTTPS only
- 🔒 MongoDB IP whitelist
- 🔒 Admin role for product management
- 🔒 API key for hardware devices

---

## Future Enhancements

### Phase 1 (Current)
- ✅ Basic CRUD operations
- ✅ User registration & verification
- ✅ Points reward system
- ✅ Transaction history

### Phase 2 (Planned)
- 🎯 AI image recognition
- 🎯 Mobile app (React Native)
- 🎯 User leaderboard
- 🎯 Achievement badges
- 🎯 QR code login
- 🎯 Email notifications

### Phase 3 (Future)
- 🚀 Carbon footprint tracking
- 🚀 Environmental impact dashboard
- 🚀 Third-party loyalty integration
- 🚀 Multi-language support
- 🚀 Admin dashboard
- 🚀 Analytics & reporting

---

## Hardware Integration (Planned)

```
┌─────────────────────────────────────────┐
│         RASPBERRY PI 4                   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │     Python Control Script        │   │
│  │  - Barcode reading              │   │
│  │  - Sensor monitoring            │   │
│  │  - LCD display control          │   │
│  │  - API communication            │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────┐  ┌──────────┐  ┌───────┐ │
│  │ USB      │  │ IR/Weight│  │  LCD  │ │
│  │ Barcode  │  │  Sensor  │  │ Touch │ │
│  │ Scanner  │  │          │  │Display│ │
│  └──────────┘  └──────────┘  └───────┘ │
└─────────────────────────────────────────┘
            │
            │ Wi-Fi / Ethernet
            ▼
    Express API Server
```

---

## Performance Metrics

### Expected Load
- Users: 100-1000 concurrent
- Transactions: 10-100 per minute
- Database size: ~1GB per year

### Optimization
- MongoDB indexes on:
  - User.phone
  - Product.barcode
  - Transaction.userId + createdAt
  - Transaction.phone + createdAt

---

## Deployment Options

### Option 1: Traditional Hosting
- **Frontend:** Netlify / Vercel
- **Backend:** Heroku / Railway
- **Database:** MongoDB Atlas

### Option 2: Cloud Platform
- **Full Stack:** AWS / Google Cloud
- **Container:** Docker + Kubernetes
- **Database:** MongoDB Atlas

### Option 3: Local Hardware
- **Server:** Raspberry Pi 4 / Mini PC
- **Reverse Proxy:** Nginx
- **Database:** MongoDB Atlas / Local MongoDB

---

## Testing Strategy

### Unit Tests (To Be Added)
```javascript
// User model tests
// Product model tests
// Controller tests
// API endpoint tests
```

### Integration Tests
```javascript
// Complete user flow
// Database operations
// Error scenarios
```

### E2E Tests
```javascript
// Cypress / Playwright
// Full UI workflow
```

---

## Monitoring & Logging

### Recommended Tools
- **Application:** PM2 (Node.js)
- **Logs:** Winston / Morgan
- **Monitoring:** New Relic / DataDog
- **Errors:** Sentry
- **Uptime:** UptimeRobot

---

## Contribution Guidelines

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## License

MIT License - Feel free to use this project for educational or commercial purposes.

---

## Credits

Built with ❤️ for environmental sustainability and recycling awareness.
