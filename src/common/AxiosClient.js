import axios from 'axios';

import { STORAGE_VARS } from './env';

const axioc = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL + '/api',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: localStorage.getItem(STORAGE_VARS.JWT)
			? `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`
			: '',
	},
});

export default axioc;
