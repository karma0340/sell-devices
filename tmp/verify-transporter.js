const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohittyagi0340@gmail.com',
    pass: 'lmpfcjmzkjihhxhz',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Authentication failed:', error.message);
  } else {
    console.log('✅ Server is ready to take our messages!');
  }
  process.exit(0);
});
