import { PrismaClient, User, Prisma } from "@prisma/client";
import {
	DatabaseError,
	Utils,
	Id,
	PropertyRequiredError,
	ValidationError,
	ResponseError
} from "../frameworks";
import { plannerDb } from "../data-access";

export interface ErrorResponseConstructor extends Error {
	code: number | string;
	message: string;

	name: string;
}

export interface ErrorInstance {
	orm: string;
	code: string | number | undefined;
	meta?: unknown;
	version: string;
	message?: string;
}

export interface FormatErrorObject {
	code: number;
	reason: string;
	message: string;
	property?: string;
	path?: string;
	method?: string;
	extendedHelper?: string;
	sendReport?: string;
	instance?: ErrorInstance;
}

interface KeyValuePairs {
	[key: string]: unknown;
}

interface Headers extends KeyValuePairs {
	"Content-Type": string | undefined;
	Referer?: string | undefined;
	"User-Agent"?: string | undefined;
}
export interface AppRequest {
	body: KeyValuePairs;
	query: KeyValuePairs;
	params: KeyValuePairs;
	ip: string;
	method: string;
	path: string;
	headers: Headers;
}

export type Client = PrismaClient;
export type DbError = typeof DatabaseError;
export type UtilType = typeof Utils;
export type IdType = typeof Id;
export type plannerDatabase = typeof plannerDb;
export type Validation = {
	PropertyRequiredError: typeof PropertyRequiredError;
	ValidationError: typeof ValidationError;
	ResponseError: typeof ResponseError;
};

export interface CreateUser {
	user_id: string;
	first_name: string;
	other_names: string;
	email: string;
	phone?: string;
	password: string;

	salt: string;
	hash: string;
}
export interface MakeCreateUser {
	id?: string;
	firstName: string;
	otherNames: string;
	email: string;
	phone?: string;
	password: string;
}

export interface Response<T> {
	status: number;
	message: string;
	item?: T;
	items?: T;
}

export interface AppResponse {
	body: Response<any> | FormatErrorObject;
	headers?: Headers;
	statusCode: number;
}

export interface controllerFun {
	// eslint-disable-next-line no-unused-vars
	(request: AppRequest): Promise<AppResponse>;
}

export type UserResponse = Response<User>;

export interface UserQueryParams {
	userId: string;
	details: boolean;
	accounts?: boolean;
	goals?: boolean;
	transactions?: boolean;
	profile?: boolean;
	subscriptions?: boolean;
	expenses?: boolean;
	income?: boolean;
	notes?: boolean;
	debt?: boolean;
	responsibilities?: boolean;
	future_plans?: boolean;
	employers?: boolean;
	projects?: boolean;
	branding?: boolean;
	memories?: boolean;
	learnings?: boolean;
	relationships?: boolean;
	careers?: boolean;
	account_transfers?: boolean;
	investments?: boolean;
	savings?: boolean;
	reminders?: boolean;
	reports?: boolean;
	activities?: boolean;
	notifications?: boolean;
	wishlists?: boolean;
	schedules?: boolean;
}
export interface AccountsQueryParams {
	userId: string;
	goal_savings?: boolean;
	transactions?: boolean;
	transaction_income?: boolean;
	transaction_expense?: boolean;
	subscriptions?: boolean;
	expenses?: boolean;
	income?: boolean;
	debt?: boolean;
	employers?: boolean;
	to_accounts?: boolean;
	from_accounts?: boolean;
	investments?: boolean;
	savings?: boolean;
}
export interface AccountQueryParams {
	id: string;
	userId: string;
	goal_savings?: boolean;
	transactions?: boolean;
	transaction_income?: boolean;
	transaction_expense?: boolean;
	subscriptions?: boolean;
	expenses?: boolean;
	income?: boolean;
	debt?: boolean;
	employers?: boolean;
	to_accounts?: boolean;
	from_accounts?: boolean;
	investments?: boolean;
	savings?: boolean;
}
export interface GoalsQueryParams {
	userId: string;
	goal_savings?: boolean;
}
export interface GoalQueryParams {
	id: string;
	userId: string;
	goal_savings?: boolean;
}

export type hash = {
	hash: string;
};
export type UserSelectOptions = Prisma.UserSelect;
export type AccountSelectOptions = Prisma.AccountSelect;
export type GoalSelectOptions = Prisma.GoalSelect;
