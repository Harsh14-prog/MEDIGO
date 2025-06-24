import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const DoctorProfile = () => {
  const { dToken, setProfileData, profileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfileData = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        await getProfileData();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) return null;

  return (
    <motion.div
      className="p-4 sm:p-8 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Profile Image */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex-shrink-0 w-full sm:w-72 h-64 sm:h-88 bg-gradient-to-br from-blue-100 to-white p-2 rounded-xl shadow-md border border-blue-200 flex items-center justify-center transition-all"
        >
          <img
            className="w-full h-full object-cover rounded-lg"
            src={profileData.image}
            alt="Doctor"
          />
        </motion.div>

        {/* Profile Info */}
        <motion.div
          className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 flex flex-wrap items-center gap-2">
            {profileData.name}
            <motion.span
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer text-sm text-blue-500 hover:underline"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? "Cancel Edit" : "Edit"}
            </motion.span>
          </h2>

          <div className="mt-1 text-gray-600 flex flex-wrap gap-2 items-center">
            <span>
              {profileData.degree} - {profileData.speciality}
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap">
              {profileData.experience}
            </span>
          </div>

          {/* About */}
          <div className="mt-5">
            <h3 className="text-sm font-medium text-gray-800 mb-1">About</h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {profileData.about}
            </p>
          </div>

          {/* Fee */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-medium text-gray-700">Appointment Fee:</span>
            {isEdit ? (
              <input
                type="number"
                className="mt-1 sm:mt-0 px-2 py-1 border rounded text-sm w-full sm:w-24"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    fees: e.target.value,
                  }))
                }
                value={profileData.fees}
              />
            ) : (
              <span className="text-gray-800 mt-1 sm:mt-0">
                {currency} {profileData.fees}
              </span>
            )}
          </div>

          {/* Address */}
          <div className="mt-4">
            <p className="font-medium text-gray-700">Address:</p>
            <div className="text-sm text-gray-600 space-y-1 mt-1">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    placeholder="Line 1"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full mt-2"
                    placeholder="Line 2"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </>
              ) : (
                <>
                  <p>{profileData.address.line1}</p>
                  <p>{profileData.address.line2}</p>
                </>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-blue-600"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
            />
            <span className="text-sm text-gray-700">
              Available for appointments
            </span>
          </div>

          {/* Save Button */}
          {isEdit && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={updateProfileData}
              className="mt-5 w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DoctorProfile;
