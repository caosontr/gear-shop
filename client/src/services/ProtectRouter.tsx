import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};
const ProtectRouter: FC<Props> = ({ children }) => {
  const accessToken = window.localStorage.getItem("access-token");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectRouter;
