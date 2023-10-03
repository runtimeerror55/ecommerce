import { useContext, useEffect } from "react";
import { authContext } from "../../context/authentication";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute = () => {
      const { token } = useContext(authContext);
      const navigate = useNavigate();
      useEffect(() => {
            if (!token) {
                  navigate("/login");
            }
      });
      if (token) {
            return <Outlet></Outlet>;
      }
};
