import {
	Utils,
	Id,
	PropertyRequiredError,
	ValidationError,
	ResponseError
} from "../frameworks";

import buildMakeUser from "./user";

const Validation = Object.freeze({
	ValidationError,
	PropertyRequiredError,
	ResponseError
});

const makeUser = buildMakeUser({ Utils, Id, Validation });

export { makeUser };
