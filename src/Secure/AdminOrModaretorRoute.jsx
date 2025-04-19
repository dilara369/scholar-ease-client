import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import FancySpinner from "../Components/Accessories/FancySpinner/FancySpinner";

const AdminOrModaretorRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isRole, isPending] = useRole()

    if (loading || isPending) {
        return <FancySpinner></FancySpinner>
    }
    if (user && isRole.role === "Modaretor" || isRole.role === "Admin") {
        return children
    }
    return <Navigate to={'/login'} replace></Navigate>
};

export default AdminOrModaretorRoute;
