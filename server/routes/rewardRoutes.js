const express = require('express');
const router = express.Router();
const { rewardUser } = require('../controllers/rewardController');

router.post('/', rewardUser);

module.exports = router;
