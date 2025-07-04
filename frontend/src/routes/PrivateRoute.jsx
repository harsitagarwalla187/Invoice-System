import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
     const token = sessionStorage.getItem("accessToken");
     return token ? children : <Navigate to="/LoginRegister" />;
};

export default PrivateRoute;
