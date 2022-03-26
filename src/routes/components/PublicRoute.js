import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { URL_PATHS } from "../../common/env";
import { UserContext } from "../../context/AppContext";

export default function PublicRoute({ children }) {
	const { state } = useContext(UserContext);
	return state?.isLogin ? <Navigate to={URL_PATHS.HOME} /> : children;
}
