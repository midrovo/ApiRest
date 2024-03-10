const express = require('express');
const { UserControllers } = require('../controllers/user.controller'); 

const router = express.Router()

router.get('/', UserControllers.getUsers);
router.get('/buscar/:id', UserControllers.getUser)
router.post('/create', UserControllers.createUser);
router.put('/update', UserControllers.updateUser);
router.delete('/delete/:id', UserControllers.deleteUser);

module.exports.UserRoutes = router;