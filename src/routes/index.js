import React from "react";
import { Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import Header from ".././components/Header";
import Sidebar from "../components/Sidebar";

const LIST_ROUTES_PUBLIC = [
  {
    path: "/homepage",
    component: React.lazy(() => import("../containers/Homepage")),
  },
  {
    path: "/user-management",
    component: React.lazy(() => import("../containers/UserManagement")),
  },
];
const LIST_ROUTES_PRIVATE = [
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
            <React.Suspense fallback={<div style={{ height: "100vh" }}></div>}>
              <PublicRoute>
                <Sidebar />
                <div className="main-content">
                  <Header />
                  <route.component />
                </div>
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
            <React.Suspense fallback={<div style={{ height: "100vh" }}></div>}>
              <PrivateRoute>
                <route.component />
              </PrivateRoute>
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
