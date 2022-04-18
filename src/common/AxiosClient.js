import axios from 'axios';

import { STORAGE_VARS } from './env';

const instance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL + '/api',
	headers: {
		Authorization: localStorage.getItem(STORAGE_VARS.JWT)
			? `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`
			: '',
	},
});

instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(STORAGE_VARS.JWT);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

export const axioc = {
	async get(url, config) {
		return await instance
			.get(url, { ...config })
			.then((res) => res)
			.catch((reason) => Promise.reject(reason));
	},

	async post(url, data, config) {
		return await instance
			.post(url, data, { ...config })
			.then((res) => res)
			.catch((reason) => Promise.reject(reason));
	},

	async put(url, data, config) {
		return await instance
			.put(url, data, { ...config })
			.then((res) => res)
			.catch((reason) => Promise.reject(reason));
	},

	async delete(url, config) {
		return await instance
			.delete(url, { ...config })
			.then((res) => res)
			.catch((reason) => Promise.reject(reason));
	},

	async awaitAll() {
		return await axios
			.all(Array.from(arguments))
			.then(axios.spread((...responses) => responses))
			.catch((reasons) => Promise.reject(reasons));
	},
};
