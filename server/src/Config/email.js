const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: "panchalsahil1604@gmail.com",
            pass: "hhhhhhhhhhyyyyyyyyyy"
        }
    }
)

const sendEmail = async (to, subject, msg, html) => {
    console.log("Sending email to:", to);
    try {
        await transporter.sendMail({
            from: "panchalsahil1604@gmail.com",
            to: to,
            subject: subject,
            text: msg,
            html: html
        });

        console.log("Email sent successfully");

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
}



module.exports = { sendEmail }