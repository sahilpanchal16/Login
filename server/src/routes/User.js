const express = require("express");
const { registerUser, loginuser, getAllUser } = require("../controller/User");
const { authToken } = require("../middleware/tokenAuth");
const { sendOtp, VerifyOtp } = require("../controller/OTP");
const userRoute = express.Router();

userRoute.get("/getallUser", getAllUser);
userRoute.post("/register", registerUser);
userRoute.post("/login", authToken, loginuser);
userRoute.post("/sendotp", sendOtp);
userRoute.post("/verify", VerifyOtp);

module.exports = { userRoute };
