import React from "react";
import { BsFillBellFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/nexible.gif";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
    <div>
      <header className="bg-gray-200 py-4 px-8 shadow flex justify-between">
        {/* <h1 className="text-2xl ml-[1rem] font-bold">NEXIBLES</h1> */}
        <img className="h-[2rem] w-[12rem]" src={logo}></img>
        <div className="flex">
          <BsFillBellFill className="items-center pt-2 mr-[1rem] text-4xl" />
          <Link to='/login'>
          <button 
          ><CgProfile className="items-center pt-2 mr-[1rem] text-4xl" /></button>
          </Link>
        </div>
      </header>
    </div>
    
    </>
  );
}

export default Navbar;
