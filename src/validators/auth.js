const {check, validationResult} = require('express-validator')

exports.validationResult = [

    check('firstName')
    .notEmpty()
    .withMessage('firstName is require'),

    check('lastName')
    .notEmpty()
    .withMessage('lastName is require'),

    check('email')
    .isEmail()
    .withMessage("plz.. enter valid email"),

    check('password')
    .isLength({min:8})
    .withMessage('password must be at least 8 character')
]

exports.isRequestValidated = (req, res, next)=>{
    const errors = validationResult(req)
    if(errors.array().length > 0){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next();
}