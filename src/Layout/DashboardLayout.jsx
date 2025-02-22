import { useState } from 'react';
import { AiFillTool } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { FaGoogleScholar, FaRegStarHalfStroke } from "react-icons/fa6";
import { MdAssignmentAdd, MdManageAccounts } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useRole from "../Hooks/useRole";

const DashboardLayout = () => {
    const [isRole] = useRole();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <ToastContainer />
            <div className="flex">
                {/* Sidebar */}
                <div className={`w-1/4 bg-primary text-white min-h-screen p-5 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">ScholarEase</h2>
                        <button
                            className="text-2xl md:hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                    <hr className="my-5" />

                    <nav className="space-y-4">
                        <NavLink
                            to="/"
                            className="flex items-center gap-3 text-lg p-3 hover:bg-secondary rounded-lg"
                        >
                            <FaHome />
                            Home
                        </NavLink>

                        {isRole?.role === "Admin" && (
                            <div>
                                <h3 className="text-xl font-semibold mt-5">Admin Menu</h3>
                                <NavLink
                                    to="/dashboard/adminProfile"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <RiAdminFill />
                                    Admin Profile
                                </NavLink>
                                <NavLink
                                    to="/dashboard/addScholarship"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <MdAssignmentAdd />
                                    Add Scholarship
                                </NavLink>
                                <NavLink
                                    to="/dashboard/manageScholarship"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <FaGoogleScholar />
                                    Manage Scholarship
                                </NavLink>
                                <NavLink
                                    to="/dashboard/manageApplications"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <AiFillTool />
                                    Manage Applied Application
                                </NavLink>
                                <NavLink
                                    to="/dashboard/manageUsers"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <MdManageAccounts />
                                    Manage Users
                                </NavLink>
                                <NavLink
                                    to="/dashboard/manageReview"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <FaRegStarHalfStroke />
                                    Manage Review
                                </NavLink>
                            </div>
                        )}

                        {isRole?.role === "Moderator" && (
                            <div>
                                <h3 className="text-xl font-semibold mt-5">Moderator Menu</h3>
                                <NavLink
                                    to="/dashboard/moderatorProfile"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <RiAdminFill />
                                    Moderator Profile
                                </NavLink>
                                <NavLink
                                    to="/dashboard/addScholarship"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <MdAssignmentAdd />
                                    Add Scholarship
                                </NavLink>
                                <NavLink
                                    to="/dashboard/manageScholarship"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <FaGoogleScholar />
                                    Manage Scholarship
                                </NavLink>
                                <NavLink
                                    to="/dashboard/manageApplications"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <AiFillTool />
                                    Manage Applied Application
                                </NavLink>
                                <NavLink
                                    to="/dashboard/manageReview"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <FaRegStarHalfStroke />
                                    Manage Review
                                </NavLink>
                            </div>
                        )}

                        {isRole?.role !== "Admin" && isRole?.role !== "Moderator" && (
                            <div>
                                <h3 className="text-xl font-semibold mt-5">User Menu</h3>
                                <NavLink
                                    to="/dashboard/myProfile"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <MdAssignmentAdd />
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/dashboard/myApplication"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <AiFillTool />
                                    Application
                                </NavLink>
                                <NavLink
                                    to="/dashboard/myReview"
                                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg"
                                >
                                    <FaRegStarHalfStroke />
                                    Review
                                </NavLink>
                            </div>
                        )}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="w-full p-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
