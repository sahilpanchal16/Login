const { sendEmail } = require('../Config/email')
const { OTP_DATA } = require('../Config/emailt')

const otpStore = {};

const sendOtp = async (req, res) => {
    const to = req.body.email
    console.log(req.body.email)
    try {
        let subject = OTP_DATA["OTP_SUBJECT"];
        let msg = OTP_DATA["OTP_TEXT"];
        let html_1 = OTP_DATA["OTP_HTML_1"];
        let html_2 = OTP_DATA["OTP_HTML_2"];

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[to] = otp;

        let html = `${html_1} ${otp} ${html_2}`

        sendEmail(to, subject, msg, html);

        console.log(otpStore)
        res.json({
            msg: "otp send"
        })
    }

    catch (error) {
        res.json({
            error: error
        })
    }
}

const VerifyOtp = (req, res) => {
    const { email, otp } = req.body;
    console.log("Email verify", email)

    if (!email || !otp) {
        return res.status(400).json({ msg: "Email and OTP are required" });
    }
    console.log("Checking store", otpStore[email])
    const storedOtp = otpStore[email];
    console.log("Verify otp", storedOtp)

    if (storedOtp && storedOtp === otp.toString()) {
        delete otpStore[email];  // Remove OTP after successful verification


        // Registration success email details
        const subject = 'Registration Successful';
        const msg = 'You have successfully registered.';
        const html = '<h1>Registration Successful</h1><p>Thank you for registering with us! LMS Web Portal</p>';

        sendEmail(email, subject, msg, html)
            .then(() => {
                res.json({ msg: "OTP verified successfully " });
            })
            .catch(error => {
                console.error('Error sending registration success email:', error);
                res.status(500).json({ msg: "OTP verified, but failed to send registration email" });
            });
    } else {
        res.status(400).json({ msg: "Invalid OTP" });
    }
};

module.exports = { sendOtp, VerifyOtp, }