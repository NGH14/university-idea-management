/* eslint-disable react-hooks/exhaustive-deps */
import { axioc, toastMessages } from 'common';
import { API_PATHS, STORAGE_VARS } from 'common/env';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const AppContext = (props) => {
	const [state, setState] = useState({
		isLogin: false,
		loading: true,
		dataUser: {},
	});

	useEffect(() => checkAuth(), [state.isLogin]);

	const checkAuth = async () => {
		let accessToken = localStorage.getItem(STORAGE_VARS.JWT);
		let refreshToken = localStorage.getItem(STORAGE_VARS.REFRESH);

		if (
			!accessToken ||
			!refreshToken ||
			accessToken === 'undefined' ||
			refreshToken === 'undefined'
		) {
			localStorage.removeItem(STORAGE_VARS.JWT);
			localStorage.removeItem(STORAGE_VARS.REFRESH);

			return setState({
				...state,
				loading: false,
				isLogin: false,
			});
		}

		await axioc
			.get(API_PATHS.SHARED.AUTH.INFO)
			.then((res) =>
				setState({
					...state,
					loading: false,
					isLogin: true,
					dataUser: res?.data?.result,
				}),
			)
			.catch(async () => {
				await axioc
					.put(API_PATHS.SHARED.AUTH.TOKEN_ROTATE, {
						access_token: accessToken,
						refresh_token: refreshToken,
					})
					.then((res) => {
						localStorage.setItem(
							STORAGE_VARS.JWT,
							res?.data?.result?.access_token?.token,
						);
						localStorage.setItem(
							STORAGE_VARS.REFRESH,
							res?.data?.result?.refresh_token,
						);

						setState({
							...state,
							loading: false,
							isLogin: true,
							dataUser: res?.data?.result,
						});
					})
					.catch(() => {
						localStorage.removeItem(STORAGE_VARS.JWT);
						localStorage.removeItem(STORAGE_VARS.REFRESH);

						setState({
							...state,
							loading: false,
							isLogin: false,
						});

						toast.error(toastMessages.errs.SESSION_OVER);
					});
			});
	};

	return (
		<UserContext.Provider value={{ state, setState }}>
			{props.children}
		</UserContext.Provider>
	);
};
