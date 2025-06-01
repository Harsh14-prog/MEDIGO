import React, { useState } from 'react'
import {assets} from "../assets/assets.js"

const MyProfile = () => {

  const [userData, setUserData] = useState({
      name : 'Harshad Khambe',
      image : assets.profile_pic,
      email:'harshadkhambe844@gmail.com',
      phone: '+91 7058103547',
      Address : {
        line1: "41101 , Sadashiv Peth" ,
        line2: "Bajirav Road , Sujata Mastani , Pune"
      },
      gender:'Male',
      DOB : '2003-04-14'
  })
  
  const [IsEdit, setIsEdit] = useState(false)

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

        <img className='w-36 rounded' src={userData.image} alt="" />

        {
          IsEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={(eve) => setUserData((prevData) =>({...prevData ,name:eve.target.value}))} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
        }

        <hr className='bg-zinc-400 h-[1px] border-none' />

        <div>
           <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
           <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
             <p className='font-medium'>Email id</p>
             <p className='text-blue-500'>{userData.email}</p>
             <p className='font-medium'>Phone:</p>
              {
                IsEdit
                ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={(eve) => setUserData((prevData) =>({...prevData ,phone:eve.target.value}))} />
                : <p className='text-blue-400'>{userData.phone}</p>
              }
              <p className='font-medium'>Address:</p>
               {
                 IsEdit
                 ? <p>
                      <input className='bg-gray-50' value={userData.Address.line1} onChange={(eve) => setUserData((prev) => ({...prev , address : {...prev.Address , line1 : eve.target.value }}))} type="text" />
                      <br />
                      <input className='bg-gray-50' value={userData.Address.line2} onChange={(eve) => setUserData((prev) => ({...prev , address : {...prev.Address , line2 : eve.target.value }}))}  type="text" />
                  </p>
                  
                 : <p className='text-gray-500'>
                      {userData.Address.line1}
                      <br />
                      {userData.Address.line2}
                   </p>   
               }
           </div>
        </div>
         <div>
           <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
           <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
             <p className='font-medium'>Gender:</p>
               {
                 IsEdit
                 ? <select className='max-w-20 bg-gray-100' value={userData.gender} onChange={(eve) => setUserData({...prevData , gender:eve.target.value})}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                   </select>
                 : <p className='text-gray-400'>{userData.gender}</p>
               }
               <p className='font-medium'>Birthday:</p>
               {
                 IsEdit 
                 ? <input className='max-w-28 bg-gray-100' value={userData.DOB} onChange={(eve) => setUserData({...prevData , DOB:eve.target.value})} type="date" />
                 : <p className='text-gray-400'>{userData.DOB}</p>
               }
           </div>
         </div>

         <div className='mt-10'>
            {
              IsEdit 
              ? <button className='border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all ' onChange = {() => setIsEdit(false)}>Save Information</button> 
              : <button className='border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all ' onChange = {() => setIsEdit(true)}>Edit</button> 
            } 
         </div>
    </div>
  )
}

export default MyProfile