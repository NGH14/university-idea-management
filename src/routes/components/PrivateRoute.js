import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { URL_PATHS } from "../../common/env";
import { UserContext } from "../../context/AppContext";

export default function PrivateRoute({ roles = [], children }) {
	const navigate = useNavigate();
	const { state } = useContext(UserContext);

	useEffect(() => {
		if (state?.isLogin && roles.indexOf(state?.dataUser.role)) {
			navigate(URL_PATHS.HOME);
		}
	}, []);
	return children;
}
