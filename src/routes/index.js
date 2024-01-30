// routes/index.js

const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

// Register staff route
router.post('/register', registrationController.registerStaff);

// Get staff details by staffId route
router.get('/staff/:staffId', registrationController.getStaffDetails);

// Get attendance route
router.get('/attendance', registrationController.getAttendance);

module.exports = router;
