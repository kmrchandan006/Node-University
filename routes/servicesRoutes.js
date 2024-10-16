// routes/servicesRoutes.js
const express = require('express');
const servicesController = require('../controller/servicesController');
const multer = require('multer');

// Set up multer for file upload handling
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Define service-related routes
router.post('/services', upload.single('image'), servicesController.addServices);
router.get('/services', servicesController.getServices);
router.get('/slider', servicesController.getSlider);

module.exports = router;
