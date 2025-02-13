const { check, validationResult } = require('express-validator');

const validateUserRegistration = [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('fullName').notEmpty().withMessage('Full name is required'),
  check('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  check('dob').isDate().withMessage('Invalid date of birth'),
  check('country').notEmpty().withMessage('Country is required'),
];

const validateLogin = [
  check('email').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateUserRegistration, validateLogin, handleValidation };