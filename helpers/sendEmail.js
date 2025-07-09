const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, body, attachments = []) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "JJRNORMAN@gmail.com ", // Use from Amazon Credentials
        pass: "xqao crlk gtsu xbrp", // Use from Amazon Credentials
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: body,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, error: err.message };
  }
};

module.exports = sendEmail;
