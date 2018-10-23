var express = require('express');
var router = express.Router();
var usersController = require("../controllers/users")

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* POST create user. */
router.post('/', usersController.createUser);

/* POST get user. */
router.get('/:ID', usersController.getOneUser);


/* GET  get_all user. */
router.get('/', usersController.getAllUsers);


/* POST delete users. */
router.delete('/:ID', usersController.deleteUser);

/* POST get user. */
//router.post('/getOneUserForEdit', usersController.getOneUserForEdit);

/* PUT edit user. */
router.put('/:ID', usersController.editUser);

module.exports = router;
