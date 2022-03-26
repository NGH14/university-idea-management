import axios from "axios";

import { STORAGE_VARS } from "./env";

const globalApi = "https://localhost:7024/api";

export class AnonRequest {
	static post = async (path, params, configs) => {
		return await axios.post(`${globalApi}/${path}`, params, configs);
	};

	static get = async (path, configs) => {
		return await axios.get(`${globalApi}/${path}`, configs);
	};

	static delete = async (path, configs) => {
		return await axios.delete(`${globalApi}/${path}`, configs);
	};

	static put = async (path, params, configs) => {
		return await axios.put(`${globalApi}/${path}`, params, configs);
	};
}

export class AuthRequest {
	static post = async (path, params, configs) => {
		return await axios.post(`${globalApi}/${path}`, params, {
			...configs,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};

	static get = async (path, configs) => {
		return await axios.get(`${globalApi}/${path}`, {
			...configs,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};

	static delete = async (path, configs) => {
		return await axios.delete(`${globalApi}/${path}`, {
			...configs,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};

	static put = async (path, params, configs) => {
		return await axios.put(`${globalApi}/${path}`, params, {
			...configs,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};
}
