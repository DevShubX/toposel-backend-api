const router = require('express').Router();
const { loginUser, registerUser } = require('../controllers/authController');
const { validateUserRegistration, handleValidation, validateLogin } = require('../utils/validators');

router.post('/login',validateLogin,handleValidation,loginUser);
router.post('/register',validateUserRegistration,handleValidation,registerUser);


module.exports = router;
