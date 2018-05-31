const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD
    }
});

module.exports = {

    sendEmail: (data) => {
        const { name, email, subject, message } = data;
        const mailOptions = {
            from: `${name} ${email}`,
            to: 'jiah.lee827@gmail.com',
            subject: subject,
            html: `<h6>Name: ${name} <br/> Contact: ${email}</h6> <p>${message}</p>`,
        }
        
        transporter.sendMail(mailOptions, function(error, info) {
            error ? console.log(`Unable to send the email: ${error}`) : console.log(`Email sent: ${info.response}`);
        })

        return data;
    },

    replyEmail: (data) => {
        const { name, email } = data;
        const mailOptions = {
            from: 'jiah.lee827@gmail.com',
            to: email,
            subject: 'Auto reply message from Jiah Lee',
            html: `
                <h6>Hello ${name},</h6>
                <p>Thank you for getting in touch!<br/>
                    I will reply to you as soon as possible<br/><br/>
                    Thank you<br/>
                    Best,<br/><br/>
                </p>
                <h6>Jiah Lee<h6>
                
            `
        }

        return transporter.sendMail(mailOptions, function(error, info) {
            error ? console.log(`Unable to send the email: ${error}`) : console.log(`Email sent: ${info.response}`);
        })
    }
}