const express = require('express');
const { createUser, getUserById } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', createUser);
router.get('/:userId', auth, getUserById);

module.exports = router;
