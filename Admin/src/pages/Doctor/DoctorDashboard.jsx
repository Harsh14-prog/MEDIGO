import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";

const DoctorDashboard = () => {
  const { dToken, dashData, completeAppointment, cancelAppointment, getDashData } =
    useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  return (
    dashData && (
      <div className="p-6 w-full max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Card Component */}
          {[
            {
              icon: assets.earning_icon,
              title: "Earnings",
              value: `${currency}${dashData.earning}`,
            },
            {
              icon: assets.appointments_icon,
              title: "Appointments",
              value: dashData.appointments,
            },
            {
              icon: assets.patients_icon,
              title: "Patients",
              value: dashData.patients,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-6 bg-white border border-blue-200 rounded-xl shadow hover:shadow-md transition"
            >
              <img src={card.icon} alt="" className="w-14 h-14" />
              <div>
                <p className="text-2xl font-bold text-blue-900">{card.value}</p>
                <p className="text-blue-600">{card.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Bookings */}
        <div className="bg-white border border-blue-200 rounded-xl shadow-md">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-blue-300">
            <img src={assets.list_icon} alt="" className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-blue-800">Latest Bookings</h2>
          </div>

          {/* Bookings List */}
          <div className="divide-y divide-blue-100">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4 hover:bg-blue-50 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-14 h-14 rounded-full object-cover border border-blue-200"
                  />
                  <div>
                    <p className="font-semibold text-blue-900">{item.userData.name}</p>
                    <p className="text-sm text-blue-600">{slotDateFormat(item.slotDate)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:ml-auto">
                  {item.cancelled ? (
                    <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                      Cancelled
                    </span>
                  ) : item.iscompleted ? (
                    <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                      Completed
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="p-2 bg-red-50 hover:bg-red-100 rounded-full transition"
                        title="Cancel"
                      >
                        <img src={assets.cancel_icon} alt="cancel" className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className="p-2 bg-green-50 hover:bg-green-100 rounded-full transition"
                        title="Complete"
                      >
                        <img src={assets.tick_icon} alt="tick" className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
