const express = require('express');
const router = express.Router();
const controller = require('../controllers/category');


router.post('/addCategory', controller.addCategory);

module.exports = router;