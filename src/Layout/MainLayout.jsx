import { Outlet } from "react-router-dom";
import NavBer from "../Components/Shared/NavBer/NavBer";
import Footer from "../Components/Shared/Footer/Footer";
import { ToastContainer } from "react-toastify";


const MainLayout = () => {
    return (
        <div>
            <ToastContainer />
            <nav className="sticky top-0 z-50">
                <NavBer></NavBer>
            </nav>
            <main className="min-h-[80vh]">
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};
export default MainLayout;
