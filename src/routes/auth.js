const express = require('express');
const { validateSignupResult, isRequestValidated, validateSigninResult } = require('../validators/auth')
const router = express.Router();


const { signup, signin, requireSignin } = require('../controller/auth');


router.post('/signup',validateSignupResult, isRequestValidated, signup);
router.post('/signin', validateSigninResult, isRequestValidated, signin);


// router.post('/profile',requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile'})
// });

module.exports = router;