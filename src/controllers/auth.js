const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const crypto = require("crypto");
const otpGenerator = require("otp-generator");
const asyncHandler = require("express-async-handler");
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
  const phone = req.body && req.body.phone;
   console.log("Hello Request", "phone is : ", phone && phone);
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


exports.userSignRequest = asyncHandler(async (req, res, next) => {
  const phone = req.body && req.body.phone;

  console.log("Hello Request", "phone is : ", phone && phone);

  const otp = otpGenerator.generate(6, {
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
  const ttl = 5 * 60 * 1000; //5 Minutes in miliseconds
  const expires = Date.now() + ttl; //timestamp to 5 minutes in the future
  const data = `${phone}.${otp}.${expires}`; // phone.otp.expiry_timestamp
  const hash = crypto.createHmac("sha256", key).update(data).digest("hex"); // creating SHA256 hash of the data
  const fullHash = `${hash}.${expires}`; // Hash.expires, format to send to the user
  // you have to implement the function to send SMS yourself. For demo purpose. let's assume it's called sendSMS
  //   sendSMS(phone, `Your OTP is ${otp}. it will expire in 5 minutes`);

  try {
    const sendOTP = await axios({
      method: "post",
      url: "http://sms.netitbd.com/smsapi",
      data: {
        api_key: "C20008695f48e97b8a7d15.42542556",
        senderid: "8809612436347",
        type: "text",
        scheduledDateTime: "",
        msg: `BardharaMart OTP is : ${otp}. Do not Share. It will expire in 5 minutes`,
        contacts: `88${phone}`,
      },
    });
    console.log(sendOTP);
  } catch (error) {
    res.status(500).json(error);
  }

  res.json(fullHash);
});



exports.signout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Signout successfully...!',
  });
};