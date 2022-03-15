import React from "react";
import { Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

import Sidebar from "../components/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";

const LIST_ROUTES_PRIVATE = [
  {
    path: "*",
    component: React.lazy(() => import("../containers/Homepage")),
  },
  {
    path: "/",
    component: React.lazy(() => import("../containers/Homepage")),
  },
  {
    path: "/homepage",
    component: React.lazy(() => import("../containers/Homepage")),
  },
  {
    path: "/user-management",
    component: React.lazy(() => import("../containers/UserManagement")),
  },
];
const LIST_ROUTES_PUBLIC = [
  {
    path: "*",
    component: React.lazy(() => import("../containers/Login")),
  },
  {
    path: "/login",
    component: React.lazy(() => import("../containers/Login")),
  },
  {
    path: "/signin",
    component: React.lazy(() => import("../containers/Login")),
  },
];

export const listRoute = () => {
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
              <PublicRoute>
                <Sidebar>
                  <route.component />
                </Sidebar>
              </PublicRoute>
            </React.Suspense>
          }
        />
      );
    });
  };

  return (
    <>
      {publicRoute()}
      {privateRoute()}
    </>
  );
};
