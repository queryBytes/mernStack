const express = require('express');
const { validationResult, isRequestValidated } = require('../validators/auth')
const router = express.Router();


const { signup, signin, requireSignin } = require('../controller/auth');


router.post('/signin', signin);

router.post('/signup',validationResult, isRequestValidated, signup);

router.post('/profile',requireSignin, (req, res) => {
    res.status(200).json({ user: 'profile'})
});

module.exports = router;