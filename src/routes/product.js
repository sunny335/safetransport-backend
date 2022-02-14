const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { createProduct } = require("../controllers/product");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(res, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(res, file, cb){
        cb( null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage})

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture') , createProduct );

// router.get('/category/getcategory', getCategory );

module.exports = router;