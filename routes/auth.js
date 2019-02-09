const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/auth');


router.post('/login', controller.login);
router.post('/register', upload.single('avatar'), controller.register);

module.exports = router;