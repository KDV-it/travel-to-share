import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  service: 'gmail',
  port: 465,
  auth: {
    user: process.env.ACCOUNT_EMAIL,
    pass: process.env.PASSWORD_APP,
  },
});

const makeToken = email => {
  const expirationDate = new Date();
  expirationDate.setHours(new Date().getHours() + 1);
  return jwt.sign({ email, expirationDate }, process.env.JWT_SECRET_KEY);
};

export const sendEmail = email => {
  console.log('Call to sendEmail');

  const token = makeToken(email);

  const URL_VERIFY_TOKEN = `http://localhost:3000/api/verify?token=${token}`;

  const mailOptions = {
    from: `voduykhang312001@gmail.com`,
    to: `${email}`,
    subject: 'Welcome to K Travel',
    text: 'Welcome to K Travel',
    html: `<h2>Hey ${email}</h2>
        <p>Here's the login link you just requested:</p>
        <a href=${URL_VERIFY_TOKEN} >Click here!</a>`,
  };

  transporter.sendMail(mailOptions, err => {
    err ? console.log(err) : console.log(token);
  });
};
