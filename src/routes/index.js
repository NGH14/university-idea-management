import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROLES, URL_PATHS } from 'common/env';
import LoadingSpinner from 'components/LoadingSpinner';
import Sidebar from 'components/Sidebar';
import { UserContext } from 'context/AppContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const LIST_ROUTES_PRIVATE = [
	{
		roles: [],
		path: '*',
		component: React.lazy(() => import('../containers/NotMatchPage')),
	},
	{
		roles: [],
		path: URL_PATHS.DENY_ACCESS,
		component: React.lazy(() => import('../containers/NoPermissionPage')),
	},
	{
		roles: [],
		path: URL_PATHS.NOT_FOUND,
		component: React.lazy(() => import('../containers/NotMatchPage')),
	},
	{
		roles: [],
		path: '/',
		component: React.lazy(() => import('../containers/Homepage')),
	},
	{
		roles: [],
		path: URL_PATHS.HOME,
		component: React.lazy(() => import('../containers/Homepage')),
	},
	{
		roles: [ROLES.ADMIN, ROLES.MANAGER],
		path: URL_PATHS.MANAGE_DEP,
		component: React.lazy(() => import('../containers/DepartmentManagement')),
	},
	{
		roles: [ROLES.ADMIN, ROLES.MANAGER],
		path: URL_PATHS.MANAGE_USER,
		component: React.lazy(() => import('../containers/UserManagement')),
	},
	{
		roles: [ROLES.ADMIN, ROLES.MANAGER],
		path: URL_PATHS.MANAGE_TAG,
		component: React.lazy(() => import('../containers/TagManagement')),
	},
	{
		roles: [ROLES.ADMIN, ROLES.MANAGER],
		path: URL_PATHS.MANAGE_SUB + '/:id',
		component: React.lazy(() => import('components/Submission/DetailView')),
	},
	{
		roles: [],
		path: URL_PATHS.PROFILE,
		component: React.lazy(() => import('../containers/Profile')),
	},
	{
		roles: [ROLES.ADMIN, ROLES.MANAGER],
		path: URL_PATHS.MANAGE_SUB,
		component: React.lazy(() => import('../containers/SubmissionManagement')),
	},
	{
		roles: [],
		path: URL_PATHS.SUB + '/:id',
		component: React.lazy(() => import('../containers/Submission')),
	},
	{
		roles: [ROLES.ADMIN, ROLES.MANAGER],
		path: URL_PATHS.MANAGE_IDEA,
		component: React.lazy(() => import('../containers/IdeaManagement')),
	},
	{
		roles: [ROLES.ADMIN, ROLES.MANAGER],
		path: URL_PATHS.DASHBOARD,
		component: React.lazy(() => import('../containers/Dashboard/Dashboard')),
	},
	{
		roles: [],
		path: URL_PATHS.IDEA + '/:id',
		component: React.lazy(() => import('../containers/IdeaDetailView')),
	},
	{
		roles: [],
		path: URL_PATHS.TERM_CONDITION,
		component: React.lazy(() => import('../containers/TermCondition')),
	},
];

const LIST_ROUTES_PUBLIC = [
	{
		path: URL_PATHS.LOGIN,
		component: React.lazy(() => import('../containers/Login')),
	},
	{
		path: URL_PATHS.SIGNIN,
		component: React.lazy(() => import('../containers/Login')),
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
						<Sidebar>
							<PrivateRoute roles={route.roles}>
								<React.Suspense
									fallback={<LoadingSpinner inputHeight='80vh' />}
								>
									<route.component />
								</React.Suspense>
							</PrivateRoute>
						</Sidebar>
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
				<Route
					// key={index}
					// path={route.path}
					element={
						<React.Suspense fallback={<LoadingSpinner />}>
							<Sidebar>
								<PrivateRoute></PrivateRoute>
							</Sidebar>
						</React.Suspense>
					}
				/>
				{publicRoute()}
				{privateRoute()}
			</Routes>
		</>
	);
}
