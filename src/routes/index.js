import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { ROLES, URL_PATHS } from "../common/env";
import LoadingSpinner from "../components/LoadingSpinner";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/AppContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const LIST_ROUTES_PRIVATE = [
	{
		roles: [],
		path: "*",
		component: React.lazy(() => import("../containers/NotMatchPage")),
	},
	{
		roles: [],
		path: "/",
		component: React.lazy(() => import("../containers/Homepage")),
	},
	{
		roles: [],
		path: URL_PATHS.HOME,
		component: React.lazy(() => import("../containers/Homepage")),
	},
	{
		roles: [ROLES.ADMIN],
		path: URL_PATHS.MANAGE_DEP,
		component: React.lazy(() => import("../containers/DepartmentManagement")),
	},
	{
		roles: [ROLES.ADMIN],
		path: URL_PATHS.MANAGE_USER,
		component: React.lazy(() => import("../containers/UserManagement")),
	},
	{
		roles: [ROLES.ADMIN],
		path: URL_PATHS.MANAGE_TAG,
		component: React.lazy(() => import("../containers/TagManagement")),
	},
	{
		roles: [],
		path: URL_PATHS.PROFILE,
		component: React.lazy(() => import("../containers/Profile")),
	},
];

const LIST_ROUTES_PUBLIC = [
	{
		path: URL_PATHS.LOGIN,
		component: React.lazy(() => import("../containers/Login")),
	},
	{
		path: URL_PATHS.SIGNIN,
		component: React.lazy(() => import("../containers/Login")),
	},
];

export function ListRoute() {
	const { state } = useContext(UserContext);
	const publicRoute = () => {
		return LIST_ROUTES_PUBLIC.map((route, index) => {
			return (
				<Route
					key={index}
					path={route.path}
					element={
						<React.Suspense fallback={<LoadingSpinner />}>
							<PublicRoute>
								<route.component />
							</PublicRoute>
						</React.Suspense>
					}
				/>
			);
		});
	};

	const privateRoute = () => {
		return LIST_ROUTES_PRIVATE.map((route, index) => {
			return (
				<Route
					key={index}
					path={route.path}
					element={
						<React.Suspense fallback={<LoadingSpinner />}>
							<Sidebar>
								<PrivateRoute roles={route.roles}>
									<route.component />
								</PrivateRoute>
							</Sidebar>
						</React.Suspense>
					}
				/>
			);
		});
	};

	if (state.loading) {
		return <LoadingSpinner></LoadingSpinner>;
	}

	return (
		<>
			<Routes>
				{publicRoute()}
				{privateRoute()}
			</Routes>
		</>
	);
}
