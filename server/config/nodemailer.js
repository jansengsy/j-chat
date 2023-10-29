const nodemailer = require('nodemailer');

const { EMAIL_USER, EMAIL_PASS } = process.env;

const config = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: '587',
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
}

const send = async (data) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(data, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info.response);
      }
    });
  });
}

module.exports = { send };
