const router = require('express').Router();

const authentication = require("./routes/auth");
const userRoutes = require('./routes/user')

router.use('/auth',authentication);
router.use('/',userRoutes);


module.exports = router;