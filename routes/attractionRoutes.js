const express = require('express');
const router = express.Router();
const attractionHandler = require('../handlers/attractionHandler');
const { isAuthenticated } = require('../handlers/authHandler');

router.get('/', attractionHandler.getAllAttractions);

router.get('/:id', attractionHandler.getAttractionById);

router.post('/',
  isAuthenticated,
  attractionHandler.createAttraction
);

router.put('/:id',
  isAuthenticated,
  attractionHandler.updateAttraction
);

router.delete('/:id', isAuthenticated, attractionHandler.deleteAttraction);

module.exports = router;
