const express = require('express');

const router = express.Router();
const productController = require('../controller/products_controller')


router.post('/create', productController.createAdds);
router.get('/fetchProduct',productController.fetchAdds);
router.get('/searchProduct',productController.searchAdds)

module.exports= router;