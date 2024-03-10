const express = require('express');
const { ItemControllers } = require('../controllers/item.controller');   

const router = express.Router();

router.get('/', ItemControllers.getItem);
router.post('/create', ItemControllers.createItem);
router.put('/update', ItemControllers.updateItem);
router.delete('/delete', ItemControllers.deleteItem);

module.exports.ItemRoutes = router