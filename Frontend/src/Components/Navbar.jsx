import React, { useState, useEffect } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/nexible.gif";
import { Link } from "react-router-dom";

function Navbar() {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Connect to WebSocket server
    const socket = new WebSocket("ws://localhost:3000"); // Replace with your WebSocket server URL

    // Listen for messages from WebSocket server
    socket.onmessage = (event) => {
      // Increment notification count when a new notification is received
      setNotificationCount((prevCount) => prevCount + 1);
    };

    return () => {
      // Clean up WebSocket connection
      socket.close();
    };
  }, []);

  return (
    <>
    <div>
      <header className="bg-gray-200 py-4 px-8 shadow flex justify-between">
        {/* <h1 className="text-2xl ml-[1rem] font-bold">NEXIBLES</h1> */}
        <img className="h-[2rem] w-[12rem]" src={logo} alt="Nexible Logo" />
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
















//final
// import React from "react";
// import { BsFillBellFill } from "react-icons/bs";
// import { CgProfile } from "react-icons/cg";
// import logo from "../assets/nexible.gif";

// function Navbar() {
//   return (
//     <div>
//       <header className="bg-gray-200 py-4 px-8 shadow flex justify-between">
//         {/* <h1 className="text-2xl ml-[1rem] font-bold">NEXIBLES</h1> */}
//         <img className="h-[2rem] w-[12rem]" src={logo}></img>
//         <div className="flex">
//           <BsFillBellFill className="items-center pt-2 mr-[1rem] text-4xl" />
//           <button onClick={() => window.location.href='/login'}><CgProfile className="items-center pt-2 mr-[1rem] text-4xl" /></button>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Navbar;
