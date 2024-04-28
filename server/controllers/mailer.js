import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import emailConfig from '../config/emailConfig.js'

const nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: emailConfig.EMAIL, // generated ethereal user
        pass: emailConfig.PASSWORD, // generated ethereal password
    }
}
// console.log(emailConfig.EMAIL, emailConfig.PASSWORD)

const transporter = nodemailer.createTransport(nodeConfig)

const MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail = async (req, res, next) => {
    const { username, userEmail, text, subject } = req.body

    // Create body of email
    var email = {
        body: {
            name: username,
            intro: text || 'Welcome to our service! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email)

    // Create a complete email using created email body
    let message = {
        from: emailConfig.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successful!",
        html: emailBody
    }

    // Sent email to registered user's email (Sends an email using the preselected transport object)
    try {
        await transporter.sendMail(message)
        return res.status(200).json({ msg: "You should received an email from us." })
    } catch (error) {
        next(error)
    }
    // transporter.sendMail(message)
    //     .then(() => {
    //         return res.status(200).json({ msg: "You should receive an email from us." })
    //     })
    //     .catch(error => res.status(500).json({ error }))
}