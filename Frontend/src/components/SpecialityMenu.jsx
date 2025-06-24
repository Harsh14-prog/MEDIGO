import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope, Brain, HeartPulse, Bone, Syringe, Eye
} from 'lucide-react';

const specialities = [
  { name: 'General', icon: <Stethoscope className="text-blue-600 w-6 h-6" /> },
  { name: 'Neurology', icon: <Brain className="text-purple-600 w-6 h-6" /> },
  { name: 'Cardiology', icon: <HeartPulse className="text-red-500 w-6 h-6" /> },
  { name: 'Orthopaedics', icon: <Bone className="text-gray-600 w-6 h-6" /> },
  { name: 'Immunology', icon: <Syringe className="text-green-600 w-6 h-6" /> },
  { name: 'Ophthalmology', icon: <Eye className="text-indigo-600 w-6 h-6" /> },
];

const SpecialityMenu = () => {
  const navigate = useNavigate();

  const handleClick = (speciality) => {
    navigate(`/doctors?speciality=${encodeURIComponent(speciality)}`);
    scrollTo(0, 0);
  };

  return (
    <section id="speciality" className="py-20 px-4 md:px-12 lg:px-20 bg-[#f9fbff]">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">Explore by Speciality</h2>
      <p className="text-center text-base text-gray-500 mb-12">
        Choose from a wide range of specialities to consult top doctors.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
        {specialities.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item.name)}
            className="flex flex-col items-center justify-center text-center bg-white shadow-md p-5 rounded-xl hover:shadow-lg transition-all cursor-pointer w-full"
          >
            <div className="mb-3">{item.icon}</div>
            <p className="text-sm font-semibold text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
