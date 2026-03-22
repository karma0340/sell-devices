const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohittyagi0340@gmail.com',
    pass: 'lmpfcjmzkjihhxhz',
  },
});

const mailOptions = {
  from: 'mohittyagi0340@gmail.com',
  to: 'mohittyagi0340@gmail.com',
  subject: 'Test Email - Berlin Smart Devices',
  text: 'This is a test email to verify nodemailer settings.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Error sending test email:', error);
  } else {
    console.log('✅ Test email sent successfully:', info.response);
  }
  process.exit(0);
});
