const nodeMailer = require("nodemailer");

const mailSender = async function (options) {
  const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const message = {
    from: `${process.env.MAIL_FROM_NAME} 👻" <${process.env.MAIL_FROM_EMAIL}>`, // sender address
    to: options.toMail, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    html: options.html
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = mailSender;
