import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section
      id="top-doctors"
      className="pt-12 pb-20 px-6 sm:px-10 md:px-16 text-gray-900"
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Top Doctors to Book
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Grid */}
      <div
        className="grid gap-6 max-w-6xl mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
      >
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-contain p-2 bg-blue-50 rounded-t-2xl"
            />
            <div className="p-4 space-y-1">
              <div
                className={`flex items-center gap-2 text-sm ${
                  item.available ? "text-green-500" : "text-red-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-400"
                  }`}
                ></span>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-blue-600 font-medium">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="pt-12 text-center">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-sm shadow hover:bg-blue-700 transition"
        >
          View All Doctors
        </button>
      </div>
    </section>
  );
};

export default TopDoctors;
