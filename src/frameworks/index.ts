import { Id } from "./Id";
import makeCallback from "./callback";
import {
	PropertyRequiredError,
	formatErrorResponse,
	RouteError,
	ResponseError,
	PermissionError,
	DatabaseError,
	ValidationError
} from "./errors";
import {
	isPhone,
	isEmail,
	isNumber,
	isValidIP,
	sanitize,
	sanitizeString,
	hash,
	md5,
	generateReference,
	validatePassword,
	passwordCheck,
	passwordEncryption,
	generateSalt
} from "./utils";

const Utils = Object.freeze({
	isPhone,
	isEmail,
	isNumber,
	sanitize,
	sanitizeString,
	hash,
	md5,
	generateReference,
	isValidIP,
	validatePassword,
	passwordCheck,
	passwordEncryption,
	generateSalt
});

export {
	makeCallback,
	Id,
	Utils,
	PermissionError,
	PropertyRequiredError,
	ResponseError,
	RouteError,
	DatabaseError,
	ValidationError,
	formatErrorResponse
};
