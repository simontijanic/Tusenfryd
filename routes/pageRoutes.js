// routes/pageRoutes.js
const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const authHandler = require('../handlers/authHandler');
const isAdmin = require('../utils/isAdmin');

// Home page redirect
router.get('/', pageController.redirectHome);

// List attractions for visitors
router.get('/attractions', pageController.listAttractions);

// Reservation endpoint
router.post('/reserve/:id', pageController.reserveAttraction);

// Admin panel (requires authentication)
router.get('/admin', isAdmin, pageController.adminPanel);

// Varsling og chat for admin
router.post('/admin/chat', isAdmin, pageController.postChat);

// New attraction form
router.get('/admin/attractions/new', isAdmin, pageController.newAttractionForm);
// Handle new attraction POST
router.post('/admin/attractions/new', isAdmin, pageController.newAttractionSubmit);

// Edit attraction form
router.get('/admin/attractions/edit/:id', isAdmin, pageController.editAttractionForm);
// Edit attraction (admin)
router.post('/admin/attractions/edit/:id', isAdmin, pageController.editAttractionSubmit);
// Delete attraction (admin)
router.post('/admin/attractions/delete/:id', isAdmin, pageController.deleteAttraction);

// Individuell attraksjonsside
router.get('/attractions/:id', pageController.attractionDetails);

// FAQ page
router.get('/faq', pageController.getFaq);

module.exports = router;
