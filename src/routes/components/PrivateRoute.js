import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { URL_PATHS } from "../../common/env";
import { UserContext } from "../../context/AppContext";

export default function PrivateRoute({ roles = [], children }) {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { state } = useContext(UserContext);

	useEffect(() => {
		console.log(roles.includes(state?.dataUser.role));
		if (!state?.isLogin) {
			return navigate(URL_PATHS.LOGIN);
		}
		if (!roles.includes(state?.dataUser.role)) {
			// TODO: Navigate to unauthorized page
			return navigate(-1);
		}
	}, [pathname]);

	return children;
}
