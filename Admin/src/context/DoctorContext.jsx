import { useContext, useState } from "react";
import { createContext } from "react";
import React from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
  
   const backendUrl = import .meta.env.VITE_BACKEND_URL

   const[dToken , setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')

   const [appointments , setAppointments] = useState([])

   const [dashData , setDashData] = useState(false)

   const [profileData , setProfileData] = useState(false)

   const getAllAppointments = async () => {
      try {
          
         const {data} = await axios.get(backendUrl + '/api/doctor/appointments',  {headers : {dtoken: dToken }}) 

         if (data.success){
            // console.log(data.appointments)
            setAppointments(data.appointments)
         }
         else{
            toast.error(data.message)
         }

      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
   }

   const completeAppointment = async (appointmentId) => {
      
      try {
          
         const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment' , {appointmentId} , {headers : {dtoken : dToken}})
         if(data.success){
            toast.success(data.message)
            getAllAppointments()
         }
         else{
            toast.error(data.message)
         }

      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
   }

      const cancelAppointment = async (appointmentId) => {
      
      try {
          
         const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment' , {appointmentId} , {headers : {dtoken : dToken}})
         if(data.success){
            toast.success(data.message)
            getAllAppointments()
         }
         else{
            toast.error(data.message)
         }

      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
   }

   const getDashData = async () => {
      try {
         
         const {data} = await axios.get(backendUrl + '/api/doctor/dashboard' , {headers : {dtoken : dToken}})
         if(data.success){
            setDashData(data.dashData)
            console.log(data.dashData)
         }
         else{
            toast.error(data.message)
         }

      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
   }

   const getProfileData = async () => {
      try {
          
         const {data} = await axios.get(backendUrl + '/api/doctor/profile' , {headers : {dtoken : dToken}})
         if(data.success){
            setProfileData(data.profileData)
            console.log(data.profileData)
         }
         else{
            toast.error(data.message)
         }

      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
   }


   const value = {
      backendUrl ,
      dToken ,
      setDToken,
      getAllAppointments,
      appointments,
      setAppointments,
      completeAppointment,
      cancelAppointment,
      dashData,
      setDashData,
      getDashData,
      setProfileData,
      profileData,
      getProfileData,
   }

   return (
      <DoctorContext.Provider value={value}>
          {props.children}
      </DoctorContext.Provider>
   )
}

export default DoctorContextProvider