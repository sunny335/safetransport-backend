const User = require("../models/police");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const crypto = require("crypto");
const otpGenerator = require("otp-generator");
const asyncHandler = require("express-async-handler");
const key = 'dfjkghdfjkkghkdfjgh';
// const {validationResult} = require("express-validator")
exports.signup = (req, res) => {

  // const errors = validationResult(req);
  // return res.status(400).json({errors: errors.array() })


  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
    const { firstName, lastName, email, password, signupAs, Phone, valid, zone, Designation, accountStatus } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      role: 'user',
      signupAs,
      Phone,
      valid,
      accountStatus,
      Designation,
      zone,
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
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, email, role, fullName, signupAs, Phone, valid, zone, accountStatus, Designation } = user;
        res.status(200).json({
          token,
          user: { firstName, lastName, email, role, fullName, _id, signupAs, Phone, valid, zone, accountStatus, Designation },
        });


      } else {
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
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true,
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
        api_key: `${process.env.API}`,
        senderid: "8809612436347",
        type: "text",
        scheduledDateTime: "",
        msg: `Safe Transport OTP is : ${otp}. Do not Share. It will expire in 5 minutes`,
        contacts: `88${phone}`,
      },
    });
    console.log('fullHash', sendOTP);
  } catch (error) {
    res.status(500).json(error);
  }

  res.json(fullHash);
});

exports.userVerifyAndSign = asyncHandler(async (req, res, next) => {
  const phone = req.body.phone;
  const otp = req.body.otp;
  const hash = req.body.hash;

  let [hashValue, expires] = hash.split(".");
  // Check if expiry time has passed
  let now = Date.now();
  if (now > parseInt(expires)) {
    return res.json("Otp is expired");
  }
  // Calculate new hash with the same key and the same algorithm
  let data = `${phone}.${otp}.${expires}`;
  let newCalculatedHash = crypto
    .createHmac("sha256", key)
    .update(data)
    .digest("hex");
  // Match the hashes

  if (newCalculatedHash === hashValue) {
    const { phone } = req.body;
    const data = {
      status: 'success',
      phone: phone,
    }
    const exitstUser = await User.findOne({ _id: req.body.id });
    console.log('exist user==================', exitstUser)
    if (exitstUser) {
      const valid = { valid: 'true' };
      const filter = { _id: req.body.id };
      const updatedPost = await User.findOneAndUpdate(
        filter,
        valid,
        {
          new: true
        }
      );
    }

    return res.json(data);

    // const phoneCode = `880${phone}`;

    // const exitstUser = await User.findOne({ Phone: req.body.phone });


    // if (exitstUser) {

    //   return res.json({
    //     id: exitstUser._id,
    //     phone: exitstUser.phone && exitstUser.phone,
    //     name: exitstUser.name && exitstUser.name,
    //     email: exitstUser.email && exitstUser.email,
    //     city: exitstUser.city && exitstUser.city,
    //     address: exitstUser.address && exitstUser.address,
    //     token: generateToken(exitstUser._id),
    //   });
    // }

    // const user = await User.create({
    //   phone,
    // });

    // if (user) {
    //   res.status(200).json({
    //     id: user._id,
    //     phone: user.phone,
    //     token: generateToken(user._id),
    //   });
    // } else {
    //   res.status(401).json({ message: "Something wrong to creating user" });
    // }
  }
  //   return false;

  res.status(500).json({ message: "otp doesn't virifed" });
});

exports.policeAccountStatus = asyncHandler(async (req, res, next) => {
  const phone = req.body.phone;
  const accountStatusData = req.body.status;
  const email = req.body.email;
  const exitstUser = await User.findOne({ _id: req.body.id });

  try {
    const sendOTP = await axios({
      method: "post",
      url: "http://sms.netitbd.com/smsapi",
      data: {
        api_key: `${process.env.API}`,
        senderid: "8809612436347",
        type: "text",
        scheduledDateTime: "",
        msg: `Safe Transport, your account is successfully verified.`,
        contacts: `88${phone}`,
      },
    });
    console.log('fullHash', sendOTP);
  } catch (error) {
    res.status(500).json(error);
  }

  if (exitstUser) {
    const accountStatus = { accountStatus: accountStatusData };
    const filter = { _id: req.body.id };
    const updatedPost = await User.findOneAndUpdate(
      filter,
      accountStatus,
      {
        new: true
      }
    );
    // await axios({
    //   method: "post",
    //   url: "http://sms.netitbd.com/smsapi",
    //   data: {
    //     api_key: `${process.env.API}`,
    //     senderid: "8809612436347",
    //     type: "text",
    //     scheduledDateTime: "",
    //     msg: `Safe Transport,we reviewed your account. your account is successfully verified. you can login and use our service now`,
    //     contacts: `88${phone}`,
    //   },
    // });

    // return res.json(accountStatus);
  };
});




exports.signout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Signout successfully...!',
  });
};


exports.allAdmins = (req, res) => {
  User.find({}).exec((error, admins) => {
    if (error) return res.status(400).json({ error });
    if (admins) {
      res.status(200).json({ admins });
    }
  });
};