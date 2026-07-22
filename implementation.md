# Smart Waste Management System – Implementation

> **Tech Stack**
>
> - **Frontend:** React.js + Vite
> - **Backend:** Node.js + Express.js
> - **Database:** MongoDB
> - **Stack:** MERN
> - **Font:** Poppins
> - **Icons:** Tabler Icons (`ti ti-*`)
> - **Hardware:** Raspberry Pi + Barcode Scanner + LCD Touch Display + Smart Bin

---

# System Overview

The Smart Waste Management System encourages users to recycle by rewarding them with points after disposing of recyclable items. Users scan a product barcode, place the item into the smart trash bin, enter their phone number, and receive reward points linked to their account.

---

# System Workflow

```text
Start
   │
   ▼
User scans product barcode
   │
   ▼
Backend searches product database
   │
   ▼
Display product information
   │
   ▼
User inserts item into smart bin
   │
   ▼
Sensor verifies item disposal
   │
   ▼
User enters phone number
   │
   ▼
Validate user account
   │
   ▼
Calculate reward points
   │
   ▼
Store transaction in MongoDB
   │
   ▼
Update user's total points
   │
   ▼
(Optional) Send points to loyalty service
   │
   ▼
Display success message
   │
   ▼
End
```

---

# MERN Architecture

```
React Frontend
       │
       │ REST API
       ▼
Node.js + Express
       │
       ▼
MongoDB Atlas
```

---

# Frontend (React)

## Home Screen

**Icon**

```
ti ti-recycle
```

Features

- Welcome message
- Scan barcode button
- Recycling information
- System status

---

## Barcode Scanner Screen

**Icon**

```
ti ti-barcode
```

Displays

- Product name
- Material type
- Reward points
- Product image (optional)

Example

```
Coca-Cola Bottle

Material
Plastic

Reward
10 Points
```

---

## Disposal Verification

**Icon**

```
ti ti-trash
```

Instruction

```
Please place your item
inside the smart bin.
```

The system waits until the sensor confirms the item has been deposited.

---

## Phone Verification

**Icon**

```
ti ti-device-mobile
```

Input

```
0812345678
```

Button

```
Submit
```

---

## Reward Screen

**Icon**

```
ti ti-coins
```

Display

```
Congratulations!

+10 Points

Current Balance

530 Points
```

---

# Backend APIs

## Scan Barcode

```
POST /api/products/scan
```

Request

```json
{
    "barcode":"885012300001"
}
```

Response

```json
{
    "name":"Coca-Cola Bottle",
    "material":"Plastic",
    "points":10
}
```

---

## Verify User

```
POST /api/users/verify
```

Request

```json
{
    "phone":"0812345678"
}
```

---

## Reward User

```
POST /api/rewards
```

Request

```json
{
    "phone":"0812345678",
    "barcode":"885012300001"
}
```

Response

```json
{
    "success":true,
    "earnedPoints":10,
    "totalPoints":530
}
```

---

## Transaction History

```
GET /api/history/:phone
```

---

# MongoDB Collections

## Users Collection

```json
{
    "_id":"...",
    "name":"John Doe",
    "phone":"0812345678",
    "totalPoints":530,
    "createdAt":"2026-07-22"
}
```

---

## Products Collection

```json
{
    "_id":"...",
    "barcode":"885012300001",
    "name":"Coca-Cola Bottle",
    "material":"Plastic",
    "points":10
}
```

---

## Transactions Collection

```json
{
    "_id":"...",
    "phone":"0812345678",
    "barcode":"885012300001",
    "product":"Coca-Cola Bottle",
    "points":10,
    "createdAt":"2026-07-22T14:30:00"
}
```

---

# Suggested Folder Structure

```
smart-waste-management
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── services
│   │   ├── hooks
│   │   ├── assets
│   │   └── App.jsx
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── app.js
│   └── package.json
│
└── hardware
    ├── barcode-scanner
    ├── sensors
    └── raspberry-pi
```

---

# Mongoose Models

### User

- name
- phone
- totalPoints
- createdAt

### Product

- barcode
- name
- material
- category
- points

### Transaction

- userId
- productId
- phone
- points
- createdAt

---

# Hardware Components

| Component | Purpose |
|-----------|----------|
| Raspberry Pi | Main controller |
| USB Barcode Scanner | Scan product barcode |
| LCD Touch Display | Display product information |
| IR Sensor | Detect item insertion |
| Weight Sensor | Verify actual disposal |
| Smart Bin | Collect recyclable waste |
| Wi-Fi | Connect to backend server |

---

# Tabler Icons

| Feature | Icon |
|----------|------|
| Dashboard | `ti ti-layout-dashboard` |
| Barcode Scanner | `ti ti-barcode` |
| Recycle | `ti ti-recycle` |
| Trash Bin | `ti ti-trash` |
| Phone | `ti ti-device-mobile` |
| User | `ti ti-user` |
| Coins | `ti ti-coins` |
| History | `ti ti-history` |
| Database | `ti ti-database` |
| Success | `ti ti-circle-check` |
| Warning | `ti ti-alert-circle` |
| Wi-Fi | `ti ti-wifi` |

---

# Typography

**Font**

```
Poppins
```

Recommended font weights

- **700** — Main headings
- **600** — Section titles
- **500** — Buttons
- **400** — Body text

---

# Future Enhancements

- AI image recognition to identify recyclable items
- Mobile application for reward tracking
- User leaderboard with achievements
- Environmental impact dashboard
- Carbon footprint estimation
- QR code login instead of phone number
- Integration with third-party loyalty programs or digital wallets through official APIs when available