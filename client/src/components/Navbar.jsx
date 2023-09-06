import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from '../images/logo.png';



const Navbar = () => {
  const [toggleMenu,setToggleMenu] = React.useState(false);
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <NavItem title="Market" />
        <NavItem title="Exchange" />
        <NavItem title="Tutorials" />
        <NavItem title="Wallets" />
      </ul>

      <button className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] text-white">
        Login
      </button>

      

    </nav>
  );
}

const NavItem = ({title}) => {
  <li className="cursor-pointer">{title}</li>
}

export default Navbar;
