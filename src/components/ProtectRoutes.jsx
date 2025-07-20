import React, { useContext } from "react";
import { Navigate } from "react-router";
import { TokenContext } from "./context/Token.context";

export default function ProtectRoutes({ children }) {
  const { token } = useContext(TokenContext);
  if (token) {
    return children;
  } else {
    return <Navigate to={"/Login"} />;
  }
}
