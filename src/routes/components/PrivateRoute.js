import { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { URL_PATHS } from "../../common/env";
import { UserContext } from "../../context/AppContext";

export default function PrivateRoute({ roles = [], children }) {
	const navigate = useNavigate();
	const location = useLocation();
	const { state } = useContext(UserContext);

	useEffect(() => {
		console.log(roles.includes(state?.dataUser.role));
		if (!roles.includes(state?.dataUser.role)) {
			// TODO: Navigate to unauthorized page
			return navigate(-1);
		}
	}, [location.pathname]);
	return state?.isLogin ? children : <Navigate to={URL_PATHS.LOGIN} replace />;
}
