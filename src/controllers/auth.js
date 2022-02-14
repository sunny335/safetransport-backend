const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const {validationResult} = require("express-validator")
exports.signup = (req, res) => {

  // const errors = validationResult(req);
  // return res.status(400).json({errors: errors.array() })


  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
    const { firstName, lastName, email, password,signupAs,Phone } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      role: 'user',
      signupAs,
      Phone,
      username: Math.random().toString(),
    });
    _user.save((error, data) => {
      if (error) {
        console.log(error);
        res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "User created Successfully...!",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id , role: user.role}, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const {_id, firstName, lastName, email, role, fullName,signupAs,Phone } = user;
        res.status(200).json({
          token,
          user: { firstName, lastName,email, role,fullName,_id,signupAs,Phone},
        });
      }else{
        res.status(404).json({
          message: "Invalid Password",
        })
      }
    } else {
      return res.status(400).json({ message: "Somethings went wrong" });
    }
  });
};
exports.signout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Signout successfully...!',
  });
};