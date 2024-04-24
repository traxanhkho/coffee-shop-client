import { Fragment, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Dashboard from "./AdminDashboard";
import NotAuthorized from "./Unauthorized";
import useStore from "../store";

export default function Router() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getUserByAccessToken = useStore((store) => store.getUserByAccessToken);
  const handleLogout = useStore((store) => store.handleLogout);

  console.log("Admin Router: ", { authenticatedUser });

  useEffect(() => {
    if (authenticatedUser) return setIsLoggedIn(true);

    const access_token = sessionStorage.getItem("access_token");

    if (access_token) {
      const user = getUserByAccessToken(access_token);
      setAuthenticatedUser(user.data);
      if (user) setIsLoggedIn(true);
    }
  }, [authenticatedUser]);

//   const isAdminUser =
//     authenticatedUser && authenticatedUser.role.slug === "admin";

  return (
      <Fragment>
        <Header
          handleLogout={handleLogout}
          authenticatedUser={authenticatedUser}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          {/* <Route path="/admin/not-authorized">
            <NotAuthorized />
          </Route> */}
          {/* <Route path="/admin/signin">
          <Signin setAuthenticatedUser={setAuthenticatedUser} />
        </Route> */}
          {/* <Route path="/admin/dashboard">
          {isAdminUser ? <Dashboard /> : <Redirect to="/admin/signin" />}
        </Route> */}
          <Route
            path="/admin/dashboard"
            element={
              authenticatedUser && authenticatedUser.role.slug === "admin" ? (
                <Dashboard />
              ) : (
                <Navigate to="/not-auth" />
              )
            }
          />
        </Routes>
      </Fragment>
  );
}
