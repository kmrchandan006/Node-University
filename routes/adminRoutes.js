// routes/adminRoutes.js
const express = require('express');
const adminController = require('../controller/adminController');

const router = express.Router();

// Define admin-related routes
router.get('/admins', adminController.getAdmins);
router.post('/add', adminController.addAdmins);
router.post('/login', adminController.loginAdmin);

module.exports = router;
