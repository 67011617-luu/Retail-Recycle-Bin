const express = require('express');
const router = express.Router();
const {
  scanProduct,
  getAllProducts,
  addProduct
} = require('../controllers/productController');

router.post('/scan', scanProduct);
router.get('/', getAllProducts);
router.post('/', addProduct);

module.exports = router;
