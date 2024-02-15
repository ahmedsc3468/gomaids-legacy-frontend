import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";

const AuthRoute = ({ component: Component, ...rest }) => {
  const user = AuthService.getCurrentUser();
  let isAuth = true;
  let routePath = "/login";
  if (user) {
    if (!user.is_mobile_verified) {
      routePath = "/number-verification";
      isAuth = false;
    }
    if (!user.is_email_verified) {
      routePath = "/email-verification";
      isAuth = false;
    }
  }
  console.log(user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user && isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: routePath, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
