export const DEV_CONFIGS = {
	IS_LOGIN: false,
	IS_OFFLINE_DEV: false,
	FAKE_ROLES: [
		{ name: 'admin' },
		{ name: 'manager' },
		{ name: 'staff' },
		{ name: 'supervisor' },
	],
	FAKE_DEPS: [
		{ name: 'it' },
		{ name: 'qa' },
		{ name: 'co' },
		{ name: 'yh' },
		{ name: 'ye' },
	],
};

export const GAPI_CLIENT_ID = process.env.REACT_APP_GAPI_CLIENT_ID;

export const API_PATHS = {
	SHARED: {
		AUTH: {
			INFO: 'auth/info',
			LOGIN: 'auth/login',
			EX_LOGIN: 'auth/login-ex',
			UPDATE_PWD: 'auth/update-password',
			TOKEN_REVOKE: 'auth/token/revoke',
			TOKEN_ROTATE: 'auth/token/rotate',
		},
		TAG: 'tag',
		ROLE: 'role',
		IDEA: 'idea',
		USER: 'user',
		SUB: 'submission',
		COMMENT: 'comment',
	},
	ADMIN: {
		DASHBOAD: {
			SUM_SUBS: 'dashboard/sum-submissions',
			TOP_IDEAS: 'dashboard/top-ideas',
			ACTIVITIES: 'dashboard/activities',
		},
		MANAGE_DEP: 'department-management',
		MANAGE_TAG: 'tag-management',
		MANAGE_IDEA: 'idea-management',
		MANAGE_USER: 'user-management',
		MANAGE_SUB: 'submission-management',
		MANAGE_COMMENT: 'comment-management',
	},
};

export const URL_PATHS = {
	NOT_FOUND: '/notfound',
	DENY_ACCESS: '/unauthorized',
	ANY: '/',
	HOME: '/homepage',
	LOGIN: '/login',
	SIGNIN: '/signin',
	MANAGE_USER: '/user-management',
	MANAGE_IDEA: '/idea-management',
	MANAGE_SUB: '/submission-management',
	MANAGE_DEP: '/department-management',
	MANAGE_TAG: '/tag-management',
	DASHBOARD: '/dashboard',
	PROFILE: '/profile',
	SUB: '/submission',
	IDEA: '/idea',
	DEMO: '/demo',
};

export const STORAGE_VARS = {
	JWT: 'access_token',
	REFRESH: 'refresh_token',
};

export const ROLES = {
	ADMIN: 'admin',
	MANAGER: 'manager',
	SUPERVISOR: 'supervisor',
	STAFF: 'staff',
};
