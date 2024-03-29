import { LoginUser, plannerDatabase, Validation, UtilType } from "../types";

import { makeSource } from "../entities";

export default function makeLoginUser({
	plannerDb,
	Validation,
	Utils
}: {
	plannerDb: plannerDatabase;
	Validation: Validation;
	Utils: UtilType;
}) {
	return async function loginUser({ email, password, source }: LoginUser) {
		if (!email) {
			throw new Validation.PropertyRequiredError(
				"Email address is required",
				"email"
			);
		}

		if (!password) {
			throw new Validation.PropertyRequiredError(
				"Password is required",
				"password"
			);
		}

		if (!Utils.isEmail(email.trim())) {
			throw new Validation.ValidationError("A valid email address is required");
		}

		if (password.length < 8) {
			throw new Validation.ValidationError(
				"Password should be atleast 8 characters"
			);
		}

		const login = await plannerDb.loginUser({ email: Utils.Lp_Secure(email) });

		if (!login.item) {
			throw new Validation.ResponseError(
				"No user was found with the provided email. Check credentials and retry"
			);
		}

		const { salt, password: hash, user_id } = login.item;

		const status = Utils.passwordCheck(password, salt, hash);

		if (!status) {
			await plannerDb.createActivity({
				activity_id: Utils.Id.makeId(),
				user: {
					connect: {
						user_id
					}
				},
				title: "Login attempt failed",
				description: "A login was attempted on this account but failed.",
				metadata: {
					email,
					password,
					date: new Date().toUTCString()
				},
				hash: Utils.md5(Utils.generateReference())
			});

			throw new Validation.ResponseError(
				"Invalid credentials. Check and retry"
			);
		}

		const loginSource = makeSource(source);

		const platformDetails = {
			ip: loginSource.getIp(),
			browser: loginSource.getBrowser(),
			version: loginSource.getVersion(),
			platform: loginSource.getPlatform(),
			referrer: loginSource.getReferrer()
		};

		const sessionId = await plannerDb.createAppSession({
			user_id,
			session_id: Utils.hash(Utils.generateReference()),
			platform: platformDetails.platform || "other",
			platform_details: platformDetails,
			expires_at: new Date(
				new Date().getTime() +
					(Number(process.env.SESSION_EXPIRES) || 30) * 24 * 60 * 60 * 1000
			)
		});

		const { item } = await plannerDb.findUserById({
			userId: user_id,
			details: true,
			profile: true
		});

		await plannerDb.createActivity({
			activity_id: Utils.Id.makeId(),
			user: {
				connect: {
					user_id
				}
			},
			title: "Login attempt successful",
			description: "A login was attempted on this account and was succesful.",
			metadata: {
				email,
				password,
				date: new Date().toUTCString()
			},
			hash: Utils.md5(Utils.generateReference())
		});

		const details = {
			token: sessionId,
			...item
		};

		if (item?.profile?.two_fa) {
			return {
				status: 202,
				message: "2FA Verification Required",
				item: details
			};
		}
		return {
			status: 200,
			message: "User logged in successfully",
			item: details
		};
	};
}
