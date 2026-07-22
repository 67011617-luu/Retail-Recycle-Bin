const express = require('express');
const router = express.Router();
const {
  getHistory,
  getAllTransactions
} = require('../controllers/historyController');

router.get('/:phone', getHistory);
router.get('/', getAllTransactions);

module.exports = router;
