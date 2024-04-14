const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const guests = [];

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

async function run() {
  for (const guest of guests) {
    try {
      const mailDetails = {
        from: 'Caleb & Danae <calebbweaver@gmail.com>',
        to: guest.email,
        subject: "We're getting married!",
        text: `Hello! Danae and I are so excited to get married and cannot wait to share our big day with you on Sunday, April 14! You have been such an incredible and wonderful part of our lives and that's why want to celebrate with you. You can find all the important details on our wedding website, but the two most important things are (1) bring dancing shoes and (2) please arrive at 4:15pm, our ceremony is at 4:30pm.\n\nPlease RSVP by February 24th by clicking the link included below. If you have any questions please feel free to reach out to Danae (not Caleb).\n\nLove,\nCaleb (and maybe Danae)\n\n Enter the following link into your browser to view your invitation and RSVP: https://calebbweaver.github.io/`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
<title>Email Invitation</title>
<style type="text/css">
  @media screen {
    @font-face {
      font-family: 'text';
      font-weight: 400;
      font-style: normal;
      src: url("https://calebbweaver.github.io/fonts/BodoniLTPro-Book.woff2") format('woff2');
    }

    body {
      font-family: "text", "Arial", Sans-Serif;
    }
  }
</style>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td style="padding: 20px 0;">
      <!-- Centered content -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; padding: 40px;">
        <tr>
          <td align="center" style="padding: 40px; ">
            <h1 style="font-size: 32px; margin: 0; font-weight: 100;">Danae & Caleb</h1>
            <h2 style="font-size: 15px; font-weight: normal; margin: 20px 0; color: #777777">WE'RE GETTING MARRIED!</h2>
            <p style="margin: 20px 0; color: #666666;  font-size: 16px; line-height: 2;">
              Dear ${guest.name},<br><br>
              Hello! Danae and I are so excited to get married and cannot wait to share our big day with you on Sunday, April 14! You
              have been such an incredible and wonderful part of our lives and that's why want to celebrate with you. You can find all
              the important details on our <a href="https://withjoy.com/danae-and-caleb/welcome">wedding website</a>, but the two most essential things are (1) bring dancing shoes and (2)
              please arrive at 4:15pm -- our ceremony begins at 4:30pm.<br><br>
              Please RSVP by February 24th by clicking the link included below. If you have any questions please feel free to reach
              out to Danae (not Caleb).<br><br>
              Much Love,<br>
              Caleb (and maybe Danae)
            </p>
            <h3 style="font-size: 24px; color: #333333; margin: 40px 0;">Sunday, April 14, 2024</h3>
            <!-- Button -->
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="background-color: #000000; padding: 10px 20px; border-radius: 2px;">
                  <a href="https://calebbweaver.github.io/" target="_blank" style="font-size: 16px;  color: #ffffff; text-decoration: none; display: inline-block;">View Invitation</a>
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

      const response = await new Promise((resolve, reject) => {
        mailTransporter
          .sendMail(mailDetails,
            function (err, data) {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
      });

      console.log(`SUCCESSFULLY INVITED | ${response.accepted[0]}`);
    } catch (err) {
      console.error(err);
    }
  }
}

run();
