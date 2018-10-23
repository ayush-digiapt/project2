var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

/*  for login . */
//router.get('/app', authController.getProducts);
router.post('/login', authController.login);

module.exports = router;