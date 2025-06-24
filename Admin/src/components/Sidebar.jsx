import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import medicalLogo from "../assets/medical.png";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const navLinkClass = ({ isActive }) =>
    `group flex items-center justify-center sm:justify-start gap-4 px-3 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-600"
        : "hover:bg-gray-100 text-gray-600"
    }`;

  return (
    <aside className="min-h-screen bg-white border-r border-gray-200 shadow-sm w-16 sm:w-64 px-2 sm:px-4 py-6 transition-all duration-300">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3 justify-center sm:justify-start">
        <img
          src={medicalLogo}
          alt="Logo"
          className="w-8 h-8 object-contain rounded-md shadow"
        />
        <h1 className="text-lg sm:text-xl font-bold text-blue-700 tracking-wide hidden sm:block">
          Medigo
        </h1>
      </div>

      {/* Admin Menu */}
      {aToken && (
        <ul className="space-y-2 text-xs sm:text-sm font-medium">
          <li>
            <NavLink to="/admin-dashboard" className={navLinkClass}>
              <img src={assets.home_icon} alt="Dashboard" className="w-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-appointements" className={navLinkClass}>
              <img src={assets.appointment_icon} alt="Appointments" className="w-5" />
              <span className="hidden sm:inline">Appointments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-doctor" className={navLinkClass}>
              <img src={assets.add_icon} alt="Add Doctor" className="w-5" />
              <span className="hidden sm:inline">Add Doctor</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctor-list" className={navLinkClass}>
              <img src={assets.people_icon} alt="Doctors List" className="w-5" />
              <span className="hidden sm:inline">Doctors List</span>
            </NavLink>
          </li>
        </ul>
      )}

      {/* Doctor Menu */}
      {dToken && (
        <ul className="space-y-2 text-xs sm:text-sm font-medium">
          <li>
            <NavLink to="/doctor-dashboard" className={navLinkClass}>
              <img src={assets.home_icon} alt="Dashboard" className="w-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctor-appointments" className={navLinkClass}>
              <img src={assets.appointment_icon} alt="Appointments" className="w-5" />
              <span className="hidden sm:inline">Appointments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctor-profile" className={navLinkClass}>
              <img src={assets.people_icon} alt="Profile" className="w-5" />
              <span className="hidden sm:inline">Profile</span>
            </NavLink>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
