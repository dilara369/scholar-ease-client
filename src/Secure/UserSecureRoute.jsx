import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import FancySpinner from "../Components/Accessories/FancySpinner/FancySpinner";

const UserSecureRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const { pathname } = useLocation()

    if (loading) {
        return <FancySpinner></FancySpinner>
    }
    if (user) {
        return children
    }

    return <Navigate to={'/login'} state={{ pathname }} replace></Navigate>
};



export default UserSecureRoute;