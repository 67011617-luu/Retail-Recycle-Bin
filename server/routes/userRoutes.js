const express = require('express');
const router = express.Router();
const {
  verifyUser,
  registerUser,
  getUserByPhone
} = require('../controllers/userController');

router.post('/verify', verifyUser);
router.post('/register', registerUser);
router.get('/:phone', getUserByPhone);

module.exports = router;
