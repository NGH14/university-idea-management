import axios from "axios";

import { STORAGE_VARS } from "./env";

const SERVER_DOMAIN = process.env.REACT_APP_SERVER_URL + '/api';

export class AnonRequest {
	static post = async (path, params, configs) => {
		return await axios.post(`${SERVER_DOMAIN}/${path}`, params, configs);
	};

	static get = async (path, configs) => {
		return await axios.get(`${SERVER_DOMAIN}/${path}`, configs);
	};

	static delete = async (path, configs) => {
		return await axios.delete(`${SERVER_DOMAIN}/${path}`, configs);
	};

	static put = async (path, params, configs) => {
		return await axios.put(`${SERVER_DOMAIN}/${path}`, params, configs);
	};
}

export class AuthRequest {
	static post = async (path, params, configs) => {
		return await axios.post(`${SERVER_DOMAIN}/${path}`, params, {
			...configs,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};

	static get = async (path, configs) => {
		return await axios.get(`${SERVER_DOMAIN}/${path}`, {
			...configs,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};

	static delete = async (path, configs) => {
		return await axios.delete(`${SERVER_DOMAIN}/${path}`, {
			...configs,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};

	static put = async (path, params, configs) => {
		return await axios.put(`${SERVER_DOMAIN}/${path}`, params, {
			...configs,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
			},
		});
	};
}

export function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getGuid() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(
			16,
		),
	);
}

export function toReadableFileSize(bytes) {
	const thresh = 1000;
	const dp = 1;

	if (Math.abs(bytes) < thresh) {
		return bytes + ' B';
	}

	// kB | MB | GB | TB | PB | EB | ZB | YB
	// KiB | MiB | GiB | TiB | PiB | EiB | ZiB | YiB
	const units = ['kB', 'MB'];

	let u = -1;
	const r = 10 ** dp;

	do {
		bytes /= thresh;
		++u;
	} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

	return bytes.toFixed(dp) + ' ' + units[u];
}
