# 🧪 Test Barcodes for Camera Scanner

## How to Test Camera Scanner

### Method 1: Generate QR Codes Online

1. Go to: https://www.qr-code-generator.com/
2. Select "Text" type
3. Enter one of these barcodes:
   - `8850388546452` (Orange Juice - Paperboard)
   - `885012300001` (Coca-Cola - Plastic)
   - `885012300002` (Pepsi Can - Metal)
4. Generate and display on screen
5. Use camera scanner to scan the QR code

### Method 2: Generate EAN-13 Barcodes

1. Go to: https://barcode.tec-it.com/en/EAN13
2. Enter barcode number
3. Download or display
4. Scan with camera

### Method 3: Print Physical Barcodes

Print these images:
- https://barcode.tec-it.com/barcode.ashx?data=8850388546452&code=EAN13
- https://barcode.tec-it.com/barcode.ashx?data=885012300001&code=EAN13
- https://barcode.tec-it.com/barcode.ashx?data=885012300002&code=EAN13

---

## Test Products in Database

| Barcode | Product | Material | Points | Status |
|---------|---------|----------|--------|--------|
| **8850388546452** | **Orange Juice** | Paperboard | 20 | ✅ NEW |
| 885012300001 | Coca-Cola Bottle | Plastic | 10 | ✅ |
| 885012300002 | Pepsi Can | Metal | 15 | ✅ |
| 885012300004 | Cardboard Box | Cardboard | 5 | ✅ |
| 885012300005 | Newspaper | Paper | 8 | ✅ |
| 885012300006 | Sprite Bottle | Plastic | 10 | ✅ |
| 885012300007 | Beer Bottle | Glass | 20 | ✅ |
| 885012300008 | Juice Carton | Cardboard | 7 | ✅ |

---

## Debugging Camera Scanner

### Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Scan a barcode
4. Look for messages:
   ```
   Scanning barcode: XXXXX | Length: XX
   ```

### Common Issues

**Issue 1: Barcode has extra characters**
- Solution: Check console logs for exact scanned value
- The app now trims whitespace automatically

**Issue 2: Wrong barcode format**
- Solution: Camera might read checksum digit
- Try scanning from different angle

**Issue 3: Barcode not clear**
- Solution: Ensure good lighting and steady camera
- Hold 6-12 inches from screen

**Issue 4: Backend not receiving request**
- Solution: Check Network tab in DevTools
- Verify API URL is correct

---

## Manual Testing

### Test API Directly (Terminal)

```bash
# Test Orange Juice
curl -X POST 'http://localhost:5001/api/products/scan' \
  -H 'Content-Type: application/json' \
  -d '{"barcode":"8850388546452"}'

# Expected: 
# {"success":true,"data":{"name":"Orange Juice","material":"Paperboard","points":20,...}}
```

### Test Frontend Manually

1. Open http://localhost:3000
2. Click "Start Scanning"
3. Enter: `8850388546452`
4. Click "Scan Product"
5. Should show: Orange Juice, Paperboard, 20 points

---

## Enhanced Debugging Added

The app now includes:

✅ **Console logging** - Shows exact barcode scanned
✅ **Automatic trimming** - Removes whitespace
✅ **Better error messages** - Shows what was scanned
✅ **Backend logging** - Server logs received barcode
✅ **Similar barcode suggestions** - Shows close matches

---

## If Camera Scanner Still Fails

### Step 1: Check Console
```javascript
// Look for this in browser console:
Scanning barcode: 8850388546452 | Length: 13
```

### Step 2: Check Network Tab
- Should show POST to `/api/products/scan`
- Check request payload
- Check response

### Step 3: Check Backend Logs
```
Received scan request: { barcode: '8850388546452', type: 'string', length: 13 }
Product lookup result: Found: Orange Juice
```

### Step 4: Verify Database
```bash
cd server
node -e "
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Product = require('./models/Product');
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const product = await Product.findOne({ barcode: '8850388546452' });
  console.log(product);
  process.exit(0);
});
"
```

---

## Quick Fixes

### If barcode includes extra characters:

The app now automatically:
1. Trims whitespace
2. Logs exact value received
3. Shows similar barcodes if not found

### If still not working:

1. Try manual entry first (to verify product exists)
2. Check browser console for errors
3. Check backend logs for what was received
4. Compare logged barcode with database barcode

---

## Testing Checklist

- [ ] Manual entry works with `8850388546452`
- [ ] Backend returns correct product
- [ ] Frontend displays Orange Juice
- [ ] Camera scanner reads barcode
- [ ] Console shows correct barcode value
- [ ] Network request sent correctly
- [ ] Product displays after camera scan

---

**Current Status:** Enhanced debugging added. Test and check console logs!
