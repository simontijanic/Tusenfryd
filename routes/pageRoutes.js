const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const authHandler = require('../handlers/authHandler');
const isAdmin = require('../utils/isAdmin');

router.get('/', pageController.redirectHome);

router.get('/attractions', pageController.listAttractions);

router.post('/reserve/:id', pageController.reserveAttraction);

router.get('/admin', isAdmin, pageController.adminPanel);

router.post('/admin/chat', isAdmin, pageController.postChat);

router.get('/admin/attractions/new', isAdmin, pageController.newAttractionForm);
router.post('/admin/attractions/new', isAdmin, pageController.newAttractionSubmit);

router.get('/admin/attractions/edit/:id', isAdmin, pageController.editAttractionForm);
router.post('/admin/attractions/edit/:id', isAdmin, pageController.editAttractionSubmit);
router.post('/admin/attractions/delete/:id', isAdmin, pageController.deleteAttraction);

router.get('/attractions/:id', pageController.attractionDetails);

router.get('/faq', pageController.getFaq);

module.exports = router;
