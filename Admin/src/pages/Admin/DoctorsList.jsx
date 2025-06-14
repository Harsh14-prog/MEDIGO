import React from 'react'
import { useContext } from 'react'
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from 'react';

const DoctorsList = () => {

  const { doctors , getAllDoctors , aToken , changeAvailibility } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  } , [aToken])

  return (
    <div className='m-5 mx-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item , index) => (
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              
              <div className='bg-indigo-50 group-hover:bg-blue-500 transition-all duration-500'>
                <img src={item.image} alt="" className='w-full h-60 object-cover' />
              </div>

              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 tetx-sm'>
                  <input onChange={() => changeAvailibility(item._id)} type="checkbox" checked={item.available} readOnly />
                  <p>Available</p>
                </div>
              </div>
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
