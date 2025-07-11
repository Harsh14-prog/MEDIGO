import { createContext } from "react";
import React from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = '$';

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log("🌐 Loaded backendUrl:", backendUrl); // ✅ debug in browser console

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const Months = [
    " ", "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  const slotDateFormat = (slotDate) => {
    if (!slotDate || typeof slotDate !== "string") return "Invalid Slot";
    const dateArray = slotDate.split("_");
    if (dateArray.length !== 3) return "Invalid Slot";
    return dateArray[0] + " " + Months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const value = {
    calculateAge,
    slotDateFormat,
    currency,
    backendUrl, // ✅ add this
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
