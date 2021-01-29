const nodemailer = require("nodemailer");

const mailer = ({ subject, recipients }, content) => {
  async function main(subject, recipients, content) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "breanne.kessler@ethereal.email", // generated ethereal user
        pass: "HHvDyMgWmUbxjvMsYk", // generated ethereal password
      },
    });

    console.log(recipients);
    console.log(subject);
    console.log(content);

    const mailOption = {
      from: '"Emeruly" <no-reply@emeruly.com>', // sender address
      to: recipients.map(({email}) => email), // list of receivers
      subject: subject, // Subject line
      text: "Hello world?", // plain text body
      html: content, // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOption, (error, info) => {
      if (error) console.log(error);

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  }

  main(subject, recipients, content).catch(console.error);
};

module.exports = mailer;