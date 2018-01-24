require('dotenv').config()

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  }
})

const daniel = '"Daniel ✨" <daniel@talmud.ai>'

function createOptions(to, subject, text) {
  return {
    from: daniel,
    to: [to],
    subject: subject,
    text: text,
  }
}

function sendMailP(mailOptions) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
  })
}

function sendEmailConfirmP(to, confirmCode) {
  let subject = `Welcome to Talmud! 📖`
  let text = `Welcome to Talmud, ${to}!

To get started, go to talmud.ai/#/login and enter this confirmation code: ${confirmCode}

Adventure awaits!

- Daniel`

  let options = createOptions(to, subject, text)
  return sendMailP(options)
}

exports.sendEmailConfirmP = sendEmailConfirmP
