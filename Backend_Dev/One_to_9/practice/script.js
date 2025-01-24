const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'showman96m@gmail.com',
    pass: 'BNkadam@1297' // Use an app password if 2FA is enabled
  }
});

// Email options
const mailOptions = {
  from: 'showman96m@gmail.com',
  to: 'kadamb208@gmail.com',
  
  subject: 'Hello from Node.js',
  text: 'This is a test email sent using Node.js and Nodemailer.',
  html: '<h1>Hello</h1><p>This is a test email sent using Node.js.</p>'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error.message);
  } else {
    console.log('Email sent successfully:', info.response);
  }
});
