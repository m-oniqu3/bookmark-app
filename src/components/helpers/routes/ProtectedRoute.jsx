import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
  const { isSignedIn } = useSelector((state) => state.auth);

  //if user is not signed in redirect home else return children components
  if (!isSignedIn) return <Navigate to="/" />;
  else return <div>{props.children}</div>;
};

export default ProtectedRoute;
