const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc    Get transaction history by phone
// @route   GET /api/history/:phone
// @access  Public
exports.getHistory = async (req, res, next) => {
  try {
    const { phone } = req.params;

    // Verify user exists
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get transactions
    const transactions = await Transaction.find({ phone })
      .sort({ createdAt: -1 })
      .populate('productId', 'name material imageUrl')
      .limit(100);

    res.status(200).json({
      success: true,
      count: transactions.length,
      totalPoints: user.totalPoints,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all transactions (admin)
// @route   GET /api/history
// @access  Public (should be protected in production)
exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name phone')
      .populate('productId', 'name material')
      .limit(500);

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};
