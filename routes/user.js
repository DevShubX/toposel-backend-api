const { searchUser } = require('../controllers/userController');

const router = require('express').Router();


router.get('/search-user',searchUser);


module.exports = router;
