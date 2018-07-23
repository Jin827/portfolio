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
			email
		} = data;
		const mailOptions = {
			from: `Jiah Lee <${process.env.GOOGLE_EMAIL}>`,
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

			transporter.verify(function (error, success) {
				if (error) {
					console.error(`Nodemail verification error: ${error}`);
				} else {
					return transporter.sendMail(mailOptions, function (error, info) {
						error ?
							console.error(`Unable to send the email to the client: ${error}`) :
							console.log(`Email's sent to the client: ${info.response}`);
					});
				}
			});
		})
			.catch(err => console.error(`sendEmail function error : ${err}`));
	},

	replyEmail: (data) => {

		const {
			name,
			email,
			subject,
			message
		} = data;
		const mailOptions = {
			from: `Client via Portfolio <${process.env.GOOGLE_EMAIL}>`,
			to: process.env.MY_EMAIL,
			subject: subject,
			html: `<p>Name: ${name} <br/> Contact: ${email}<br/><br/>${message}</p>`,
		};

		return new Promise((resolve, reject) => {
			return transporter.sendMail(mailOptions, function (error, info) {
				error ?
					console.error(`Unable to send the email to Jiah Lee: ${error}`) :
					console.log(`Email's sent back to Jiah Lee: ${info.response}`);
			});
		})
			.catch(err => console.error(`replyEmail function error : ${err}`));
	}
};
