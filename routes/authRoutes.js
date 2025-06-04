const express = require('express');
const router = express.Router();
const authHandler = require('../handlers/authHandler');

router.get('/login', authHandler.getLogin);
router.post('/login', authHandler.login);
router.post('/logout', authHandler.logout);

module.exports = router;
