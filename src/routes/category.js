const express = require('express');
const { addCategory, getCategory} = require('../controller/category.js');
const {adminMiddleware, requireSignin } = require('../common-middleware/index');
const router = express.Router();



router.post('/category/create', requireSignin, adminMiddleware, addCategory);
router.get('/category/getcategory', getCategory);

module.exports = router;        //don't put router()