import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, getAllDoctors, aToken, changeAvailibility } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-6 overflow-y-auto min-h-screen bg-[#f9fbff]">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        🩺 All Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
          >
            {/* Image */}
            <div className="bg-indigo-50 hover:bg-blue-100 transition duration-300 rounded-t-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{item.speciality}</p>

              {/* Availability Toggle (Updated for responsiveness) */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    onChange={() => changeAvailibility(item._id)}
                    checked={item.available}
                    readOnly
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                  <span className="text-base font-medium">
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                </label>

                <span
                  className={`text-sm px-3 py-1 rounded-full font-semibold text-center w-fit ${
                    item.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.available ? "✔ Active" : "✖ Inactive"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
