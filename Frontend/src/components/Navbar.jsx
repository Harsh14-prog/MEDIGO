import React, { useState, useContext } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate, NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-16 sm:w-24 md:w-20 cursor-pointer object-contain"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex item-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <div
              className="flex items-center gap-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                className="w-10 rounded-full"
                src={userData.image}
                alt="User"
              />
              <img className="w-3" src={assets.dropdown_icon} alt="Dropdown" />
            </div>

            {/* Desktop Dropdown */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-50 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>

            {/* Mobile Dropdown */}
            {showDropdown && (
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 md:hidden">
                <div className="min-w-50 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/my-profile");
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/my-appointments");
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      setShowDropdown(false);
                      setToken(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Desktop Create Account Button
          <button
            onClick={() => navigate("/login", { state: { mode: "signup" } })}
            className="bg-blue-500 text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            <h2 className="font-semibold text-zinc-100">Create account</h2>
          </button>
        )}

        {/* Mobile Menu Toggle Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* -------------------- Mobile Menu ------------------------ */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img
              className="w-24 sm:w-32 md:w-40 object-contain"
              src={assets.logo}
              alt="Logo"
            />

            <img
              className="w-10"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>

            {/* Mobile Create Account Button (fixed version) */}
            {token && userData ? (
              <p
                onClick={() => {
                  setShowMenu(false);
                  logout();
                }}
                className="px-4 py-2 rounded inline-block text-white bg-blue-500 cursor-pointer"
              >
                Logout
              </p>
            ) : (
              <p
                onClick={() => {
                  setShowMenu(false);
                  navigate("/login", { state: { mode: "signup" } });
                }}
                className="px-4 py-2 rounded inline-block text-white bg-blue-500 cursor-pointer"
              >
                Create Account
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
