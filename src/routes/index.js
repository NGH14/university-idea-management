import React from "react";
import { Route } from "react-router-dom";

const LIST_ROUTES = [
  {
    path: "*",
    component: React.lazy(() => import("../containers/Login")),
  },

  {
    path: "/",
    component: React.lazy(() => import("../containers/Homepage")),
  },
];

export const listRoute = () => {
  return LIST_ROUTES.map((route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <React.Suspense fallback={<div style={{ height: "100vh" }}></div>}>
            <route.component />
          </React.Suspense>
        }
      />
    );
  });
};
