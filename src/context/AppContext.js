import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthRequest } from "../common/AppUse";
import { API_PATHS, DEV_CONFIGS, STORAGE_VARS } from "../common/env";

const toastMessages = {
	ERR_SESSION_OVER: 'Session timeout !!',
};

export const UserContext = createContext();

export const AppContext = (props) => {
	const [state, setState] = useState({
		isLogin: DEV_CONFIGS.IS_LOGIN,
		loading: true,
		dataUser: DEV_CONFIGS.IS_OFFLINE_DEV
			? {
					id: 'MGY3MGYwMzgtYWQzZi00ZTk4LTkzNTktNjU2OGY1ZjRjNDcy',
					email: 'aptu@mitep.pt',
					full_name: 'Madge Valdez',
					department: null,
					role: 'admin',
					gender: 'male',
					phone_number: '0919927066',
					date_of_birth: null,
					is_default_password: false,
			  }
			: {},
	});

	useEffect(() => {
		DEV_CONFIGS.IS_OFFLINE_DEV
			? setState({
					...state,
					loading: false,
					isLogin: true,
			  })
			: checkAuth();
	}, [state.isLogin]);

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

		await AuthRequest.get(API_PATHS.SHARED.AUTH.INFO)
			.then((res) => {
				setState({
					...state,
					loading: false,
					isLogin: true,
					dataUser: res?.data?.result,
				});
			})
			.catch(async () => {
				await AuthRequest.put(API_PATHS.SHARED.AUTH.TOKEN_ROTATE, {
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

						toast.error(toastMessages.ERR_SESSION_OVER);
					});
			});
	};

	return (
		<UserContext.Provider value={{ state, setState }}>
			{props.children}
		</UserContext.Provider>
	);
};
