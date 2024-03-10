const express = require('express');
const { ProductControllers } = require('../controllers/product.controller');

const router = express.Router();

router.get('/', ProductControllers.getProducts);
router.get('/report', ProductControllers.generateReport);
router.get('/buscar/:id', ProductControllers.getProduct);
router.post('/create', ProductControllers.createProduct);
router.put('/update/:id',ProductControllers.updateProduct);
router.delete('/delete/:id', ProductControllers.deleteProduct);

module.exports.ProductRoutes = router;