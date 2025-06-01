import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {

  const {docId} = useParams()
  const{doctors , currencySymbol} = useContext(AppContext)

  const daysOfWeek = ['SUN' , 'MON' , 'TUE' , 'WED' , 'THU' , 'FRI' , 'SAT']

  const [docInfo , setDocInfo] = useState(null)
  const [docSlots , setdocSlots] = useState([])
  const[slotIndex , setSlotIndex] = useState(0)
  const [slotTime, setslotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = await doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    // console.log(docInfo)
  }


const getAvailableSlots = async () => {
  setdocSlots([]); // reset existing slots

  let today = new Date();
  let allSlots = [];

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date();
    currentDate.setDate(today.getDate() + i); // get date i days from today

    // Set the start time (10:00 AM)
    currentDate.setHours(10, 0, 0, 0);

    // Create a new Date for end time (9:00 PM)
    let endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0);

    let daySlots = [];

    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      daySlots.push({
        datetime: new Date(currentDate), // exact date-time
        time: formattedTime,             // human-readable time
      });

      currentDate.setMinutes(currentDate.getMinutes() + 30); // next 30-min slot
    }

    allSlots.push(daySlots); // add today's slots to main array
  }

  setdocSlots(allSlots); // update state
};

  useEffect(() => {
    fetchDocInfo()
  } , [doctors , docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])
  

  return docInfo && (
    <div>
       {/* Doctor Details */}
       <div className='flex flex-col sm:flex-row gap-4 '>
          <div>
             <img className='bg-blue-500 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
          </div>

          <div className='flex-2 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
             {/* ------------Doc Info : name , degree , experience ----------*/}
             <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
               {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
             </p>
              <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                <p>{docInfo.degree} - {docInfo.speciality}</p>
                <button className='py-0.5 px-2 border text-xs rounded-full '>{docInfo.experience}</button>
              </div>

              {/* ------- Doctor About ------- */}
              <div>
                 <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
                 <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
              </div>
              <p className='text-gray-500 font-medium mt-4'>
                Appointment fee : <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
              </p>
          </div>
       </div>

       {/* -------- Booking Slots ----------- */}
         <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 '>
             <p>Booking Slots</p>
             <div className='flex gap-3 items-center w-full over-x-scroll mt-4'>
                {
                  docSlots.length && docSlots.map((item , index) => (
                     <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-500 text-white' : 'border border-gray-200'}`} key={index}>
                        <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                        <p>{item[0] && item[0].datetime.getDate()}</p>
                     </div>
                  ))
                }
             </div>

             <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                {
                  docSlots.length && docSlots[slotIndex].map((item , index) => (
                      <p onClick={() => setslotTime(item.time)} className = {`text-sm font-medium flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-500 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                         {item.time.toLowerCase()}
                      </p>
                  ))
                }
             </div>
             <button className='bg-blue-500 text-white text-sm font-medium px-14 py-3 rounded-full my-6'>Book an appointment</button>
             
         </div>
         
         {/* ------------- listing related doctors ------------------- */}
          <RelatedDoctors docId = {docId} speciality = {docInfo.speciality}/>
    </div>
  ) 
}

export default Appointment