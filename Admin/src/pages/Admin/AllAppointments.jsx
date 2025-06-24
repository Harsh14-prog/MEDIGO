import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { MdDelete } from "react-icons/md";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        📅 All Appointments
      </h1>

      {/* Desktop View */}
      <div className="hidden md:grid bg-white border border-gray-200 rounded-lg overflow-hidden text-sm">
        <div className="grid grid-cols-[40px_1.5fr_0.5fr_2fr_2fr_1fr_1fr] bg-gray-50 px-6 py-3 font-semibold text-gray-600 border-b gap-x-3">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[40px_1.5fr_0.5fr_2fr_2fr_1fr_1fr] items-center px-6 py-4 border-b text-gray-700 hover:bg-gray-50 transition gap-x-3"
          >
            <p>{index + 1}</p>

            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt=""
                className="w-9 h-9 rounded-full object-cover"
              />
              <span>{item.userData.name}</span>
            </div>

            <p>{calculateAge(item.userData.dob)}</p>

            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <div className="flex items-center gap-2">
              <img
                src={item.docData.image}
                alt=""
                className="w-10 h-10 object-cover rounded-full bg-gray-100"
              />
              <span>{item.docData.name}</span>
            </div>

            <p>
              {currency}
              {item.amount}
            </p>

            <div className="flex justify-center">
              {item.cancelled ? (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                  Cancelled
                </span>
              ) : item.iscompleted ? (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                  Completed
                </span>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-red-500 hover:bg-red-100 p-2 rounded-full transition duration-200"
                  title="Cancel Appointment"
                >
                  <MdDelete size={22} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
              <span>#{index + 1}</span>
              <span>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <img
                src={item.userData.image}
                className="w-10 h-10 object-cover rounded-full"
                alt=""
              />
              <div>
                <p className="text-gray-800 font-medium">
                  {item.userData.name}
                </p>
                <p className="text-xs text-gray-500">
                  Age: {calculateAge(item.userData.dob)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <img
                src={item.docData.image}
                className="w-10 h-10 object-cover rounded-full bg-gray-100"
                alt=""
              />
              <div>
                <p className="text-gray-800 font-medium">{item.docData.name}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-gray-700">
                Fees: {currency}
                {item.amount}
              </p>

              {item.cancelled ? (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                  Cancelled
                </span>
              ) : item.iscompleted ? (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                  Completed
                </span>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-red-500 hover:bg-red-100 p-4 rounded-full transition duration-200"
                  title="Cancel Appointment"
                >
                  <MdDelete size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
