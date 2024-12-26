const { userModel } = require("../models/User")
const jwt = require('jsonwebtoken')


const getAllUser = async (req, res) => {

    const users = await userModel.find()

    res.status(200).json({
        status: 'success',
        data: users
    })
 }

// JWT Auth Middleware
const registerUser = async (req, res) => {

    const { Username, email, password } = req.body

    const Exist_user = await userModel.findOne({ email })

    if (Exist_user) return res.status(401).json("already user exist")

    const user = await userModel.create({
        Username,
        email,
        password
    })

    console.log(user);

    res.status(200).json({
        msg: "user create success",
        user
    })

}

const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                msg: "Invalid email or password"
            });
        }

        // Generate JWT Token
        const tokenData = { id: user._id };
        const token = jwt.sign(tokenData, "asdf@1234", { expiresIn: "1h" });

        res.status(200).json({
            // data:data,
            msg: "Login success", token, user
        });

    } catch (error) {
        res.status(500).json({
            msg: "An error occurred while logging in",
            error: error.message
        });
    }
}

module.exports = {
    registerUser, loginuser, getAllUser
}