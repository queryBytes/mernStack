const express = require('express');
const shortid = require('shortid');     //shortid used to generate unique filename
const path = require('path');
//const { } = require('../controller/category.js');
const { createProduct } = require('../controller/product');
const {adminMiddleware, requireSignin } = require('../common-middleware/index');

const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))        // __dirname means current directory not current file
    },
    filename: function(req, file, cb) {
        cb(null, shortid.generate()+'-'+file.originalname)
    }
})

const upload = multer({storage : storage});



//productPicture comes from field name of database // use single instead of array to upload single image only
router.post('/product/create', requireSignin, adminMiddleware,  upload.array('productPicture'), createProduct);     
//router.get('/category/getcategory', getCategory);

module.exports = router;        //don't put router() 