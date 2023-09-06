import React from 'react';

import logo from ".././images/logo.png";

const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
       <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />
      

      <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">Come join us and hear for the unexpected miracle</p>
      <p className="text-white text-sm text-center font-medium mt-2">info@22harshit.com</p>
      </div>

     
     

    </div>
  )
}

export default Footer