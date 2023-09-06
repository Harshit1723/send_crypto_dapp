import React from 'react';
import { BsShieldFillCheck } from 'react-icons/bs';
import {BiSearchAlt} from 'react-icons/bi';
import {RiHeart2Fill} from 'react-icons/ri';

  const serviceCard = ({color,title,icon,subtitle}) => (
    <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
                   {icon}
      </div>
      </div>
  );

const Services = () => {
  return (
    <div className="flex w-full  justify-center items-center  gradient-bg-services">
    
      <div className="flex-1 flex flex-col justify-start items-center">

      <serviceCard
         color="bg-[#2952E3]"
         title="Security gurantee"
         icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
         subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products" />

      </div>

    </div>
  )
}

export default Services