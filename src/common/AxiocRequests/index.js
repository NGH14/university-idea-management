import axioc from '../AxiosClient';

export const axiocRequests = {
	post: async (path, params, configs) => await axioc.post(path, params, configs),
	get: async (path, configs) => await axioc.get(path, configs),
	delete: async (path, configs) => await axioc.delete(path, configs),
	put: async (path, params, configs) => await axioc.put(path, params, configs),
};
