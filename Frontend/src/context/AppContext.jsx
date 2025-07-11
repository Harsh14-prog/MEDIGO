import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") || false
  );
  const [userData, setUserData] = useState(false);

  const navigate = useNavigate();

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) setDoctors(data.doctors);
      else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) setUserData(data.userData);
      else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ NEW: Listen to doctor start call
  useEffect(() => {
    if (!userData?._id) return;
    const socket = io(backendUrl);

    socket.emit("join", userData._id);
    console.log("Socket joined room:", userData._id);

    socket.on("call-started", ({ appointmentId }) => {
      toast.info("Doctor has started the video call, joining...");
      navigate(`/video-call/${appointmentId}`);
    });

    return () => socket.disconnect();
  }, [userData, backendUrl]);

  useEffect(() => { getDoctorsData(); }, []);

  useEffect(() => {
    if (token) loadUserProfileData();
    else setUserData(false);
  }, [token]);

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    getDoctorsData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
