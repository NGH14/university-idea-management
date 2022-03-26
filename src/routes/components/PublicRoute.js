import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { URL_PATHS } from "../../common/env";
import { UserContext } from "../../context/AppContext";

export default function PublicRoute({ children }) {
	const navigate = useNavigate();
	const { state } = useContext(UserContext);

	if (state?.isLogin) {
		navigate(URL_PATHS.HOME);
	}

	return children;
}
