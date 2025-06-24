import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, dashData, getDashData } = useContext(AdminContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  return (
    dashData && (
      <div className="p-6 w-full max-w-7xl mx-auto">
        {/* Dashboard Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📊 Admin Dashboard
        </h2>

        {/* Metrics Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Earnings */}
          <div className="bg-white border border-blue-200 rounded-xl shadow hover:shadow-lg transition p-6 flex items-center gap-5">
            <img
              src={assets.earning_icon}
              alt="Earnings"
              className="w-14 h-14 object-contain"
            />
            <div>
              <p className="text-xl font-bold text-blue-800">
                {currency} {dashData.earning}
              </p>
              <p className="text-blue-600 font-medium">Total Earnings</p>
            </div>
          </div>

          {/* Total Appointments */}
          <div className="bg-white border border-blue-200 rounded-xl shadow hover:shadow-lg transition p-6 flex items-center gap-5">
            <img
              src={assets.appointments_icon}
              alt="Appointments"
              className="w-14 h-14 object-contain"
            />
            <div>
              <p className="text-xl font-bold text-blue-800">
                {dashData.appointments}
              </p>
              <p className="text-blue-600 font-medium">Appointments</p>
            </div>
          </div>

          {/* Total Doctors */}
          <div className="bg-white border border-blue-200 rounded-xl shadow hover:shadow-lg transition p-6 flex items-center gap-5">
            <img
              src={assets.doctor_icon} // <-- updated key here
              alt="Doctors"
              className="w-14 h-14 object-contain"
            />
            <div>
              <p className="text-xl font-bold text-blue-800">
                {dashData.doctors}
              </p>
              <p className="text-blue-600 font-medium">Registered Doctors</p>
            </div>
          </div>
        </div>

        {/* Latest Appointments Table */}
        <div className="mt-10 bg-white border border-gray-200 rounded-xl shadow overflow-x-auto">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <img src={assets.list_icon} alt="list" className="w-6 h-6" />
            <h3 className="text-lg font-semibold text-blue-800">
              Recent Appointments
            </h3>
          </div>

          <div className="min-w-[600px]">
            <div className="grid grid-cols-[0.5fr_2.5fr_2.5fr_1fr_1.5fr] px-6 py-3 text-sm text-gray-500 font-semibold border-b bg-gray-50">
              <p>#</p>
              <p>Patient</p>
              <p>Doctor</p>
              <p>Fees</p>
              <p>Status</p>
            </div>

            {dashData.latestAppointments.map((item, index) => (
              <div
                key={item._id}
                className="grid grid-cols-[0.5fr_2.5fr_2.5fr_1fr_1.5fr] items-center px-6 py-4 border-b text-sm hover:bg-blue-50 transition"
              >
                <p>{index + 1}</p>

                {/* Patient Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="font-medium text-gray-800">
                    {item.userData.name}
                  </span>
                </div>

                {/* Doctor Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="font-medium text-gray-800">
                    {item.docData.name}
                  </span>
                </div>

                {/* Amount */}
                <p className="text-gray-700 font-medium">
                  {currency}
                  {item.amount}
                </p>

                {/* Status */}
                {item.cancelled ? (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium w-fit">
                    Cancelled
                  </span>
                ) : item.iscompleted ? (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium w-fit">
                    Completed
                  </span>
                ) : (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium w-fit">
                    Upcoming
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
