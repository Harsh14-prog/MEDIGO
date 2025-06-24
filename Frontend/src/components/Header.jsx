import React from "react";
import Lottie from "lottie-react";
import heroAnimation from "../assets/hero_animation.json";

const Header = () => {
  return (
    <section className="w-full bg-white relative overflow-hidden">
      {/* Blue background on the right side */}
      <div className="absolute right-0 top-0 w-[55%] h-full bg-[#e8f1ff] rounded-bl-[300px] z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[1300px] mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 md:px-16 py-16 lg:py-24 gap-10 lg:gap-20">
        {/* LEFT TEXT */}
        <div className="flex-1 text-left space-y-6 max-w-xl text-[#1f3b5c]">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Smarter Healthcare,
            <br /> Seamless Experience
          </h1>
          <p className="text-base sm:text-lg opacity-90">
            Book verified doctors with ease. Manage your health digitally — faster,
            simpler, safer.
          </p>
          <a
            href="#speciality"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm shadow hover:bg-blue-700 transition"
          >
            Explore Doctors
          </a>
        </div>

        {/* RIGHT: Animation */}
        <div className="flex-1 max-w-sm sm:max-w-md md:max-w-lg w-full">
          <Lottie animationData={heroAnimation} loop className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};

export default Header;
