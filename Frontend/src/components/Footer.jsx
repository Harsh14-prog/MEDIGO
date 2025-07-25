import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-30 text-sm'>

        {/* --------- left section -------- */}
        <div>
          <img className='mb-5 w-20' src={assets.logo} alt="Medigo Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Medigo helps you connect with trusted doctors easily and manage your healthcare digitally — making appointments simpler, faster, and safer.
          </p>
        </div>

        {/* --------- center section -------- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* --------- right section -------- */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+0-000-000-000</li>
            <li>Medigo1234@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* ---------- copyright Text */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          © 2024 Medigo.dev — All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
