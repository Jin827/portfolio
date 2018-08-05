const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

	sendEmail: (data) => {
		const {
			name,
			email,
			subject,
			message
		} = data;

		const mailOptions = {
			from: email,
			to: process.env.MY_EMAIL,
			subject: `Jiah Portfolio Message - ${subject}`,
			html: `<p>Name: ${name} <br/> Contact: ${email}<br/><br/>${message}</p>`,
		};

		return sgMail.send(mailOptions);
	},

	replyEmail: (data) => {
		const {
			name,
			email
		} = data;

		const mailOptions = {
			to: email,
			from: 'noreply@jiahlee.webdeveloper',
			subject: 'Auto reply message from Jiah Lee',
			html: `
                <strong>Hello ${name}</strong>,<br/><br/>
                Thank you for getting in touch.<br/>
                I will reply to you as soon as possible.<br/>
                Thank you.<br/><br/>
                Best,<br/>
              `
		};

		return sgMail.send(mailOptions);
	}
};
