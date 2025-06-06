import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {

  const { aToken } = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext)
  

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-200 ${
      isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500 text-blue-600 font-semibold" : "hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-white border-r border-gray-100">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink to="/admin-dashboard" className={navLinkClass}>
            <img src={assets.home_icon} alt="Dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink to="/all-appointements" className={navLinkClass}>
            <img src={assets.appointment_icon} alt="Appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink to="/add-doctor" className={navLinkClass}>
            <img src={assets.add_icon} alt="Add Doctor" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          <NavLink to="/doctor-list" className={navLinkClass}>
            <img src={assets.people_icon} alt="Doctors List" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink to="/doctor-dashboard" className={navLinkClass}>
            <img src={assets.home_icon} alt="Dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink to="/doctor-appointments" className={navLinkClass}>
            <img src={assets.appointment_icon} alt="Appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink to="/doctor-profile" className={navLinkClass}>
            <img src={assets.people_icon} alt="Doctors List" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
