const express = require("express");
const { signup, signin,signout,userSignRequest,userVerifyAndSign } = require("../controllers/auth");
const { validateSignupRequest, isRequestValidated, validateSigninRequest} = require("../validators/auth");

const router = express.Router();
router.post("/signup", validateSignupRequest, isRequestValidated ,signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/signinrequest", userSignRequest);
router.post("/userVerifyAndSign", userVerifyAndSign);

router.post("/signout" ,signout);
// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({user:'profile'});
// })

module.exports = router;
