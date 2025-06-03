// routes/attractionRoutes.js
const express = require('express');
const router = express.Router();
const attractionHandler = require('../handlers/attractionHandler');
const { isAuthenticated } = require('../handlers/authHandler');

// GET all attractions
router.get('/', attractionHandler.getAllAttractions);

// GET a single attraction by ID
router.get('/:id', attractionHandler.getAttractionById);

// POST a new attraction
router.post('/',
  isAuthenticated,
  attractionHandler.createAttraction
);

// PUT to update an attraction by ID
router.put('/:id',
  isAuthenticated,
  attractionHandler.updateAttraction
);

// DELETE an attraction by ID
router.delete('/:id', isAuthenticated, attractionHandler.deleteAttraction);

module.exports = router;
