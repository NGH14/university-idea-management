import { createContext, useEffect, useState } from "react";

import { AuthRequest } from "../common/AppUse";
import { API_PATHS, STORAGE_VARS } from "../common/env";

export const UserContext = createContext();

export const AppContext = (props) => {
	const [state, setState] = useState({
		isLogin: false,
		loading: true,
		dataUser: {},
	});

	useEffect(() => {
		checkAuth();
	}, [state.isLogin]);

	const checkAuth = async () => {
		if (
			!localStorage.getItem(STORAGE_VARS.JWT) ||
			!localStorage.getItem(STORAGE_VARS.REFRESH)
		) {
			localStorage.removeItem(STORAGE_VARS.JWT);
			localStorage.removeItem(STORAGE_VARS.REFRESH);

			return setState({
				...state,
				loading: false,
				isLogin: false,
			});
		}

		AuthRequest.get(API_PATHS.SHARED.AUTH.INFO)
			.then((res) => {
				if (res?.data?.succeeded) {
					setState({
						...state,
						loading: false,
						isLogin: true,
						dataUser: res?.data?.result,
					});
				} else
					localStorage.getItem(STORAGE_VARS.REFRESH) &&
						AuthRequest.get(API_PATHS.SHARED.AUTH.TOKEN_ROTATE, {
							access_token: localStorage.getItem(STORAGE_VARS.JWT),
							refresh_token: localStorage.getItem(STORAGE_VARS.REFRESH),
						}).then((res) => {
							if (res?.data?.succeeded) {
								setState({
									...state,
									loading: false,
									isLogin: true,
									dataUser: res?.data?.result,
								});
							}
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
			});
	};

	return (
		<UserContext.Provider value={{ state, setState }}>
			{props.children}
		</UserContext.Provider>
	);
};
