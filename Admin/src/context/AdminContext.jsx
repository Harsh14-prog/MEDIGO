import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import React from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

   const [aToken ,setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

   const [doctors , setDoctors] = useState([])

   const backendUrl = import.meta.env.VITE_BACKEND_URL

   const getAllDoctors = async () => {
      try {
         
           const {data} = await axios.post(backendUrl + '/api/admin/all-doctors' , {} , {headers : {aToken}})
           if (data.success) {
            setDoctors(data.doctors)
            console.log(data.doctors)
           }
           else {
            toast.error(data.message)
           }

      } catch (error) {
         toast.error(error.message)
      }
   }

   const changeAvailibility = async (docId) => {
      
      try {
         
         const {data} = await axios.post(backendUrl + '/api/admin/change-availibility' , {docId} , {headers : {aToken}})

         if (data.success) {
            toast.success(data.message)
            getAllDoctors()
         }

         else {
            toast.error(data.message)
         }

      } catch (error) {
         toast.error(message.error)
      }
   }

   const value = {
      aToken , setAToken , backendUrl, doctors ,getAllDoctors , changeAvailibility
   }

   return (
      <AdminContext.Provider value = {value}>
          {props.children}
      </AdminContext.Provider>
   )
}

export default AdminContextProvider