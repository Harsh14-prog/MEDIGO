import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
   <section className="bg-gradient-to-r from-[#e8f1ff] to-white rounded-3xl mt-8 mb-10 mx-4 sm:mx-8 md:mx-10 py-12 px-6 sm:px-10 md:px-16 shadow-sm">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Text */}
        <div className="flex-1 text-left space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-snug">
            Book Appointment<br />
            With 100+ Trusted Doctors
          </h2>
          <button
            onClick={() => {
              navigate('/login');
              scrollTo(0, 0);
            }}
            className="bg-blue-600 text-white text-sm sm:text-base px-8 py-3 rounded-full shadow hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={assets.appointment_img}
            alt="Book Appointment"
            className="w-64 sm:w-72 md:w-80 lg:w-96 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
