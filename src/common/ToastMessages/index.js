export const toastMessages = {
	WAIT: 'Please wait...',
	errs: {
		added: (entity) => `Failed to create ${entity} !!`,
		edited: (entity) => `Failed to update ${entity} !!`,
		deleted: (entity) => `Failed to delete ${entity} !!`,
		UNEXPECTED: 'Something went wrong, please try again !!',
	},
	succs: {
		added: (entity) => `Create ${entity} successful !!`,
		edited: (entity) => `Update ${entity} successful !!`,
		deleted: (entity) => `Delete ${entity} successful !!`,
	},
};
