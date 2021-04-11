const User = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) =>{
    User.findOne({email: req.body.email })      //checking email already exist or not
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: "Admin already registered"
        });

        const {         //storing data from req.body that will sent during signup time
            firstName,
            lastName,
            email,
            password

        } = req.body;

        const _user = new User({ firstName,     //creating new user
            lastName, 
            email, 
            password,
        username: Math.random().toString(),
        role: 'admin'
     });

     _user.save((error, data) =>{       //saving newly created user
        if(error){
            return res.status(400).json({
                message: 'Something went wrong'
            });
        }
        
        if(data){
            return res.status(201).json({
                message: 'Admin created Successfully..!'
            });
        }
     });

    });
}

exports.signin = (req, res) =>{
    User.findOne({ email: req.body.email})
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user){
            if(user.authenticate(req.body.password) && user.role === 'admin'){
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
                const { _id, firstName, lastName, email, role, fullName } = user;   //getting from DB in the variable
                res.status(200).json({
                    token,
                    user: {
                       _id, firstName, lastName, email, role, fullName      //return to stored data on the page
                    }
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }
                

        }
        else{
            return res.status(400).json({ message: 'Something went wrong'});
        }
    });
}
exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];      //this will give us second element of token
    const user = jwt.verify(token, process.env.JWT_SECRET);     //verifying webtoken here
    req.user = user;    
    next();     //next(); will send the control on route page
    //jwt.decode()
}