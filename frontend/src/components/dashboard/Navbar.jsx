import { useState } from "react";
import Profile from "./Profile";

const Navbar = () => {
     const [showProfileModal, setShowProfileModal] = useState(false);

     const handleProfileClick = () => {
          document.activeElement.blur();
          setTimeout(() => {
               setShowProfileModal(true);
          }, 100);
     };

     const handleLogout = () => {
          sessionStorage.removeItem("accessToken");
          window.location.href = "/";
     };

     return (
          <>
               <div className="navbar bg-base-100 shadow-sm px-[10rem] py-2">
                    <div className="flex-1">
                         <a className="btn btn-ghost text-xl">Company Name</a>
                    </div>

                    <div className="dropdown dropdown-end">
                         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                              <div className="w-10 rounded-full">
                                   <img
                                        alt="Profile"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                   />
                              </div>
                         </div>
                         <ul
                              tabIndex={0}
                              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                         >
                              <li>
                                   <button onClick={handleProfileClick}>Profile</button>
                              </li>
                              <li>
                                   <button onClick={handleLogout}>Logout</button>
                              </li>
                         </ul>
                    </div>
               </div>

               {/* Modal */}
               {showProfileModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
                         <div className="bg-white p-6 rounded-lg shadow-lg relative w-[90%] max-w-md">
                              <button
                                   className="absolute top-2 right-2 text-gray-500"
                                   onClick={() => setShowProfileModal(false)}
                              >
                                   ✕
                              </button>
                              <Profile />
                         </div>
                    </div>
               )}
          </>
     );
};

export default Navbar;
