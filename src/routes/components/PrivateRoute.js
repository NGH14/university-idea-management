import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { URL_PATHS } from 'common/env';
import { UserContext } from 'context/AppContext';

export default function PrivateRoute({ roles = [], children }) {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { state } = useContext(UserContext);

	useEffect(() => {
		if (!state?.isLogin) {
			navigate(URL_PATHS.LOGIN);
		}

		if (roles.length > 0 && !roles.includes(state?.dataUser.role)) {
			navigate(URL_PATHS.DENY_ACCESS);
		}
	}, [pathname]);

	return children;
}
