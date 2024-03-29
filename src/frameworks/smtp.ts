import nodemailer from "nodemailer";
import { MailBody } from "../types";

export const sendSMTPMail = async (mailBody: MailBody) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: process.env.SMTP_ENCRYPTION === "true", // true for 465, false for other ports
			auth: {
				user: process.env.SMTP_USERNAME,
				pass: process.env.SMTP_PASSWORD
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		const response = await transporter.sendMail({
			from: `${process.env.SMTP_FROM}" <${process.env.SMTP_FROM_EMAIL}>`,
			to: mailBody.recipient,
			subject: mailBody.subject,
			html: mailBody.body
		});

		return Boolean(response.messageId);
	} catch (e) {
		// TODO: error logging with sentry
		console.log({ e });
		return false;
	}
};
