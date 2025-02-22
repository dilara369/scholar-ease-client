import { Navigate } from "react-router-dom";
import FancySpinner from "../Components/Accessories/FancySpinner/FancySpinner";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isRole, isPending] = useRole()

    if (loading || isPending) {
        return <FancySpinner></FancySpinner>
    }
    if (user && isRole.role === "Admin") {
        return children
    }

    return <Navigate to={'/login'} replace></Navigate>
};

export default AdminRoute;