import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const Months = [
    " ", "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];

  const navigate = useNavigate();

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + Months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/list-appointments",
        { headers: { token } }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointments",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const body = { ...response, appointmentId: order.receipt };
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            body,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.error("Payment API Error:", error);
      toast.error("Payment initiation failed.");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
      getDoctorsData();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {appointments.map((items, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={items.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{items.docData.name}</p>
              <p>{items.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{items.docData.address.line1}</p>
              <p className="text-xs">{items.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{" "}
                {slotDateFormat(items.slotDate)} | {items.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!items.cancelled && items.payment && !items.iscompleted && (
                <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>
              )}
              {!items.cancelled && !items.payment && !items.iscompleted && (
                <button
                  onClick={() => appointmentRazorpay(items._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  Pay online
                </button>
              )}
              {!items.cancelled && !items.iscompleted && (
                <button
                  onClick={() => cancelAppointment(items._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}
              {items.cancelled && !items.iscompleted && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment cancelled
                </button>
              )}
              {items.iscompleted && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                  Completed
                </button>
              )}
              {items.payment && !items.cancelled && !items.iscompleted && (
                <a
                  href={`/video-call/${items._id}`}
                  className="text-sm text-white text-center sm:min-w-48 py-2 border rounded bg-green-600 hover:bg-green-700 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Video Call
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
