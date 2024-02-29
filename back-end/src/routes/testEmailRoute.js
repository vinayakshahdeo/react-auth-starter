import { sendEmail } from '../util/sendEmail';

export const testEmailRoute = {
	path: '/api/test-email',
	method: 'post',
	handler: async (req, res) => {
		try {
			await sendEmail({
				to: 'test+1@gmail.com',
				from: 'test@gmail.com',
				subject: 'does this work?',
				text: 'if you can read this it works!!',
			});
			res.send(200);
		} catch (err) {
			console.log(err.response.body);
			res.sendStatus(500);
		}
	},
};
