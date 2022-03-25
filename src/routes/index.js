import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { URL_PATHS } from "../common/env";
import LoadingSpinner from "../components/LoadingSpinner";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/AppContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const LIST_ROUTES_PRIVATE = [
  {
    path: "*",
    component: React.lazy(() => import("../containers/NotMatchPage")),
  },
  {
    path: "/",
    component: React.lazy(() => import("../containers/Homepage")),
  },
  {
    path: URL_PATHS.HOME,
    component: React.lazy(() => import("../containers/Homepage")),
  },
  {
    path: URL_PATHS.MANAGE_DEP,
    component: React.lazy(() => import("../containers/DepartmentManagement")),
  },
  {
    path: URL_PATHS.MANAGE_USER,
    component: React.lazy(() => import("../containers/UserManagement")),
  },
  {
    path: URL_PATHS.MANAGE_TAG,
    component: React.lazy(() => import("../containers/TagManagement")),
  },
  {
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
              <PrivateRoute>
                <route.component />
              </PrivateRoute>
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
                <PublicRoute>
                  <route.component />
                </PublicRoute>
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
