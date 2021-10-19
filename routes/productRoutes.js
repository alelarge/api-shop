var express = require('express');
var ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
var productImageUpload = require('../middlewares/multer.config');
var router = express.Router();

router.get('/', auth,  ProductController.list);

router.get('/:id' , auth,  ProductController.show);

router.post('/', productImageUpload, auth,  ProductController.create);

router.put('/:id', productImageUpload, auth,   ProductController.update);

router.delete('/:id' , auth,  ProductController.remove);

module.exports = router;