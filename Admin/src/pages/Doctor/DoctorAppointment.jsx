import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const {
    dToken,
    getAllAppointments,
    appointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (dToken) getAllAppointments();
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-4 text-2xl font-semibold text-gray-800 flex items-center gap-2">
        🗂️ Appointments Overview
      </p>

      {/* Desktop View */}
      {!isMobile && (
        <div className="bg-white border border-gray-300 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto shadow-md">
          <div className="grid grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1fr] gap-2 py-3 px-6 border-b border-gray-200 text-gray-600 font-semibold">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>

          {appointments.slice().reverse().map((item, index) => (
            <div
              key={item._id || index}
              className="min-h-[70px] grid grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1fr] gap-2 items-center text-gray-800 py-3 px-6 border-b border-gray-200 hover:bg-blue-50 transition"
            >
              <p>{index + 1}</p>
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover border border-blue-300"
                  src={item.userData.image || assets.default_profile}
                  alt={item.userData.name}
                />
                <p>{item.userData.name}</p>
              </div>
              <p
                className={`text-xs font-semibold rounded-full px-3 py-1 w-fit text-center ${
                  item.payment
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.payment ? "Online" : "Cash"}
              </p>
              <p>
                {item.userData.dob && !isNaN(calculateAge(item.userData.dob))
                  ? calculateAge(item.userData.dob)
                  : "--"}
              </p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <p>
                {currency}
                {item.amount}
              </p>
              <div className="flex items-center gap-2">
                {item.cancelled ? (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                    Cancelled
                  </span>
                ) : item.iscompleted ? (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                    Completed
                  </span>
                ) : (
                  <>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel Appointment"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt="Complete"
                      title="Mark as Complete"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile View */}
      {isMobile && (
        <div className="flex flex-col space-y-4 mt-4">
          {appointments.slice().reverse().map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>#{index + 1}</span>
                <span>
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <img
                  src={item.userData.image || assets.default_profile}
                  alt={item.userData.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <p className="font-semibold text-gray-800">{item.userData.name}</p>
                  <p className="text-xs text-gray-500">
                    Age:{" "}
                    {item.userData.dob && !isNaN(calculateAge(item.userData.dob))
                      ? calculateAge(item.userData.dob)
                      : "--"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-2 text-sm">
                <p>
                  <span className="font-semibold text-gray-700">Payment:</span>{" "}
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {item.payment ? "Online" : "Cash"}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Fees:</span> {currency}
                  {item.amount}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3">
                {item.cancelled ? (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                    Cancelled
                  </span>
                ) : item.iscompleted ? (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                    Completed
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt="Complete"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
