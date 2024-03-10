const express = require('express');
const { FacturaControllers } = require('../controllers/factura.controller');

const router = express.Router();

router.get('/', FacturaControllers.getFacturas);
router.get('/buscar/:id', FacturaControllers.getFactura);
router.post('/create/:id', FacturaControllers.createFactura);
//router.put('/update/:id',FacturaControllers.updateProduct);
//router.delete('/delete/:id', FacturaControllers.deleteProduct);

module.exports.FacturaRoutes = router;