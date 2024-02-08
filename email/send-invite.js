const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();
console.log(process.env.GMAIL_EMAIL);

const mailTransporter =
  nodemailer.createTransport(
    {
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
      }
    }
  );

const mailDetails = {
  from: 'Caleb & Danae <calebbweaver@gmail.com>',
  to: 'danaefmartin@gmail.com',
  subject: "We're getting married!",
  text: 'We’re making it official on Sunday, April 14, 2024, and you’re cordially invited! We have a wedding website and app with all the details—from travel and lodging to the day-of schedule and what to wear. Take a look to RSVP and find more information. We hope you can join us! Enter the following link into your browser to view your invitation and RSVP: https://calebbweaver.github.io/',
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
<title>Email Invitation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td style="padding: 20px 0;">
      <!-- Centered content -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; padding: 40px;">
        <tr>
          <td align="center" style="padding: 40px; font-family: Arial, sans-serif;">
            <h1 style="font-size: 32px; margin: 0; font-weight: 100;">Danae & Caleb</h1>
            <h2 style="font-size: 15px; font-weight: normal; margin: 20px 0; color: #777777">WE'RE GETTING MARRIED!</h2>
            <p style="margin: 20px 0; color: #666666; font-family: Arial, sans-serif; font-size: 16px; line-height: 2;">
              Dear Caleb,<br><br>
              We’re making it official on Sunday, April 14, 2024, and you’re cordially invited! We have a wedding website and app with all the details—from travel and lodging to the day-of schedule and what to wear. Take a look to RSVP and find more information. We hope you can join us!
            </p>
            <h3 style="font-size: 24px; color: #333333; margin: 40px 0;">Sunday, April 14, 2024</h3>
            <!-- Button -->
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="background-color: #000000; padding: 10px 20px; border-radius: 2px;">
                  <a href="https://calebbweaver.github.io/" target="_blank" style="font-size: 16px; font-family: Arial, sans-serif; color: #ffffff; text-decoration: none; display: inline-block;">View Invitation</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
  `
};

mailTransporter
  .sendMail(mailDetails,
    function (err, data) {
      if (err) {
        console.log('Error Occurs');
        console.log(err);
      } else {
        console.log('Email sent successfully');
        console.log(data);
      }
    });
