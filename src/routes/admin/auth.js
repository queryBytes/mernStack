const express = require('express');
const router = express.Router();
const { signup, signin } = require('../../controller/admin/auth');
const { validateSignupResult, isRequestValidated, validateSigninResult } = require('../../validators/auth')


router.post('/admin/signup', validateSignupResult, isRequestValidated, signup);
router.post('/admin/signin', validateSigninResult, isRequestValidated, signin);

// router.post('/profile',requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile'})
// });

module.exports = router;