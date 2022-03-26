import axios from "axios";

import { STORAGE_VARS } from "./env";

const globalApi = "https://localhost:7024/api";

export class AnonRequest {
	static post = async (api, params, conf) => {
		return await axios.post(`${globalApi}/${api}`, params, conf);
	};

	static get = async (api, config) => {
		return await axios.get(`${globalApi}/${api}`, config);
	};

	static delete = async (api, config) => {
		return await axios.delete(`${globalApi}/${api}`, config);
	};

	static put = async (api, params, config) => {
		return await axios.put(`${globalApi}/${api}`, params, config);
	};
}

export class AuthRequest {
	static post = async (api, params) => {
		return await axios.post(`${globalApi}/${api}`, params, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};

	static get = async (api) => {
		return await axios.get(`${globalApi}/${api}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};

	static delete = async (api) => {
		return await axios.delete(`${globalApi}/${api}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};

	static put = async (api, params) => {
		return await axios.put(`${globalApi}/${api}`, params, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};
}
