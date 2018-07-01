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
        const {
            name,
            email,
            subject,
            message
        } = data;
        const mailOptions = {
            from: 'Client via Portfolio <contact.portfolio@gmail.com>',
            to: process.env.MY_EMAIL,
            subject: subject,
            html: `<p>Name: ${name} <br/> Contact: ${email}<br/><br/>${message}</p>`,
        };

        return new Promise((resolve, reject) => {

                transporter.verify(function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        return transporter.sendMail(mailOptions, function (error, info) {
                            error ?
                                console.error(`Unable to send the email: ${error}`) :
                                console.log(`Email sent: ${info.response}`);
                        });
                    }
                });
            })
            .catch(err => console.error(`sendEmail func err : ${err}`));
    },

    replyEmail: (data) => {
        const {
            name,
            email
        } = data;
        const mailOptions = {
            from: 'Jiah Lee <donotreply@gmail.com>',
            to: `${name} <${email}>`,
            subject: 'Auto reply message from Jiah Lee',
            html: `          
                <p>
                    Hello ${name},<br/><br/>
                    Thank you for getting in touch.<br/>
                    I will reply to you as soon as possible.<br/>
                    Thank you.<br/><br/>
                    Best,<br/><br/>
                    Jiah Lee
                </p>   
            `
        };

        return new Promise((resolve, reject) => {
                return transporter.sendMail(mailOptions, function (error, info) {
                    error ?
                        console.error(`Unable to send the email: ${error}`) :
                        console.log(`Email sent: ${info.response}`);
                });
            })
            .catch(err => console.error(`replyEmail func err : ${err}`));
    }
};