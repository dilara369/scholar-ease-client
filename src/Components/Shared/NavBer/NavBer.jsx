import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import useRole from "../../../Hooks/useRole";

const NavBer = () => {
  const { user, userSignOut } = useAuth();
  const [isRole] = useRole();
  const [open, setOpen] = useState(false);

  const nav = (
    <>
      <NavLink to={"/"}>
        <li className="text-lg text-black hover:text-primary transition-colors">
          Home
        </li>
      </NavLink>
      <NavLink to={"/allScholarship"}>
        <li className="text-lg text-black hover:text-primary transition-colors">
          All Scholarship
        </li>
      </NavLink>

      {user ? (
        isRole.role === "Admin" ? (
          <NavLink to={"/dashboard/adminProfile"}>
            <li className="text-lg text-black hover:text-primary transition-colors">
              Dashboard
            </li>
          </NavLink>
        ) : isRole.role === "Moderator" ? (
          <NavLink to={"/dashboard/moderatorProfile"}>
            <li className="text-lg text-black hover:text-primary transition-colors">
              Dashboard
            </li>
          </NavLink>
        ) : (
          <NavLink to={"/dashboard/myProfile"}>
            <li className="text-lg text-black hover:text-primary transition-colors">
              Dashboard
            </li>
          </NavLink>
        )
      ) : (
        ""
      )}
    </>
  );

  const handleLogout = () => {
    userSignOut()
      .then(() => {
        toast.success("Logout successful", {
          position: "top-center",
          hideProgressBar: true,
          autoClose: 2000,
          theme: "colored",
        });
      })
      .catch(() => {});
  };

  return (
    <div className="bg-darkBlue text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <div className="md:hidden block">
          <button onClick={() => setOpen(!open)} className="text-3xl">
            {open ? (
              <img
                className="w-8"
                src="https://img.icons8.com/?size=100&id=26140&format=png&color=10B981"
                alt="close"
              />
            ) : (
              <img
                className="w-8"
                src="https://img.icons8.com/?size=100&id=26141&format=png&color=10B981"
                alt="menu"
              />
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="text-xl  text-black font-bold">
          <Link to="/" className="hover:text-primary transition-colors">
            ScholarEase
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">{nav}</div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative group">
              <img
                width={40}
                height={40}
                className="rounded-full object-cover"
                src={
                  user?.photoUrl ||
                  "https://i.pinimg.com/originals/cb/c9/27/cbc9275294787315181530cd84e2a7bc.jpg"
                }
                alt="avatar"
              />
              <div className="absolute right-0 top-12 hidden group-hover:block bg-darkGray/80 text-white rounded-lg shadow-lg p-3 w-48">
                <h1 className="text-sm">{user?.displayName}</h1>
                <h2 className="text-xs">{user?.email}</h2>
                <button
                  onClick={handleLogout}
                  className="mt-2 text-xs text-red-500 hover:bg-darkGray px-2 py-1 rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to={"/login"}>
                <button className="border-2 border-black text-black py-1 px-4 rounded-md hover:bg-lightGray transition-colors">
                  Login
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="border-2 border-black text-black py-1 px-4 rounded-md hover:bg-lightGray transition-colors">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {open && (
        <div className="md:hidden bg-darkBlue p-4 rounded-b-lg absolute left-0 right-0 top-16 shadow-xl">
          <ul className="space-y-4">{nav}</ul>
        </div>
      )}
    </div>
  );
};

export default NavBer;
