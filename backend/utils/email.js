const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    };
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}`);
  } catch (err) {
    console.error('❌ Email error:', err);
    throw new Error('Failed to send email');
  }
};

const sendOTP = async (email, otp, type = 'Verification') => {
  const subject = `${type} Code: ${otp}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
      <h2 style="color: #2563eb; text-align: center;">SchoolMart Security</h2>
      <p>Hello,</p>
      <p>Your <b>${type}</b> code is:</p>
      <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1f2937;">
        ${otp}
      </div>
      <p style="margin-top: 20px;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #9ca3af; text-align: center;">© 2025 SchoolMart. All rights reserved.</p>
    </div>
  `;
  await sendEmail(email, subject, html);
};

module.exports = { sendOTP, sendEmail };
