export const AUTH = {
	GOOGLE_CLIENT_ID:
		"149599602064-503d6jfus46t0o24gik0eeinpmj6si33.apps.googleusercontent.com",
};

export const API_PATHS = {
	SHARED: {
		AUTH: {
			INFO: "auth/info",
			LOGIN: "auth/login",
			EX_LOGIN: "auth/login-ex",
			UPDATE_PWD: "auth/update-password",
			TOKEN_REVOKE: "auth/token/revoke",
			TOKEN_ROTATE: "auth/token/rotate",
		},
		ROLE: "role",
		TAG: "tag",
		IDEA: "idea",
		USER: "user",
		SUB: "submission",
		DEP: "department",
	},
	ADMIN: {
		TAG: "tag-management",
		IDEA: "idea-management",
		USER: "user-management",
		SUB: "submission-management",
		DEP: "department-management",
	},
};

export const URL_PATHS = {
	ANY: "/",
	HOME: "/homepage",
	LOGIN: "/login",
	SIGNIN: "/signin",
	MANAGE_USER: "/user-management",
	MANAGE_DEP: "/department-management",
	MANAGE_TAG: "/tag-management",
	PROFILE: "/profile",
};

export const STORAGE_VARS = {
	JWT: "access_token",
	REFRESH: "refresh_token",
};

export const ROLES = {
	ADMIN: "admin",
	MANAGER: "manager",
	SUPERVISOR: "supervisor",
	STAFF: "staff",
};
