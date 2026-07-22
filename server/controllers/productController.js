const Product = require('../models/Product');

// @desc    Scan product by barcode
// @route   POST /api/products/scan
// @access  Public
exports.scanProduct = async (req, res, next) => {
  try {
    const { barcode } = req.body;

    console.log('Received scan request:', { barcode, type: typeof barcode, length: barcode?.length });

    if (!barcode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a barcode'
      });
    }

    // Trim whitespace
    const cleanBarcode = barcode.trim();

    const product = await Product.findOne({ barcode: cleanBarcode });

    console.log('Product lookup result:', product ? `Found: ${product.name}` : 'Not found');

    if (!product) {
      // Try to find similar barcodes for debugging
      const similar = await Product.find({ 
        barcode: { $regex: cleanBarcode.substring(0, 8), $options: 'i' } 
      }).limit(3);
      
      console.log('Similar barcodes:', similar.map(p => ({ barcode: p.barcode, name: p.name })));
      
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        scanned: cleanBarcode,
        suggestions: similar.map(p => p.barcode)
      });
    }

    res.status(200).json({
      success: true,
      data: {
        name: product.name,
        material: product.material,
        points: product.points,
        category: product.category,
        imageUrl: product.imageUrl
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new product
// @route   POST /api/products
// @access  Public (should be protected in production)
exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};
