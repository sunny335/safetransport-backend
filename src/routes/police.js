const express = require("express");
const { signup, signin,signout,userSignRequest,userVerifyAndSign ,allAdmins} = require("../controllers/police");
const { validateSignupRequest, isRequestValidated, validateSigninRequest} = require("../validators/auth");

const router = express.Router();
router.post("/policesignup", validateSignupRequest, isRequestValidated ,signup);
router.post("/policesignin", validateSigninRequest, isRequestValidated, signin);
router.post("/policesigninrequest", userSignRequest);
router.post("/policeuserVerifyAndSign", userVerifyAndSign);
router.get("/admin/allPoliceAuth" ,allAdmins);
router.post("/policesignout" ,signout);
// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({user:'profile'});
// })

module.exports = router;
