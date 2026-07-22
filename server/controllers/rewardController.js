const User = require('../models/User');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

// @desc    Reward user with points
// @route   POST /api/rewards
// @access  Public
exports.rewardUser = async (req, res, next) => {
  try {
    const { phone, barcode } = req.body;

    if (!phone || !barcode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide phone number and barcode'
      });
    }

    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please register first.'
      });
    }

    // Find product
    const product = await Product.findOne({ barcode });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Create transaction
    const transaction = await Transaction.create({
      userId: user._id,
      productId: product._id,
      phone: user.phone,
      barcode: product.barcode,
      product: product.name,
      material: product.material,
      points: product.points
    });

    // Update user's total points
    user.totalPoints += product.points;
    await user.save();

    res.status(200).json({
      success: true,
      earnedPoints: product.points,
      totalPoints: user.totalPoints,
      data: {
        transaction,
        user: {
          name: user.name,
          phone: user.phone,
          totalPoints: user.totalPoints
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
