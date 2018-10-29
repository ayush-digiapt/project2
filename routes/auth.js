var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

/*  for login . */
//router.get('/app', authController.getProducts);
router.post('/login', authController.login);

/*  for sending mail . */
//router.get('/app', authController.getProducts);
router.post('/send', authController.nodemailer);


module.exports = router;
