import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { FaTicketAlt } from "react-icons/fa";


const Navbar = () => {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {

    logout();
    navigate("/login");

  };


  return (

    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">


      <div className="max-w-7xl mx-auto px-6">


        <div className="flex justify-between items-center h-20">


          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold"
          >

            <div className="bg-white text-gray-900 p-2 rounded-xl">

              <FaTicketAlt />

            </div>


            EventEra


          </Link>




          <div className="flex items-center gap-6">



            <Link
              to="/"
              className="text-gray-300 hover:text-white transition"
            >

              Events

            </Link>




            {
              user ? (

                <>


                  <Link
                    to={
                      user.role === "admin"
                      ? "/admin"
                      : "/dashboard"
                    }
                    className="text-gray-300 hover:text-white transition"
                  >

                    Dashboard

                  </Link>




                  <button

                    onClick={handleLogout}

                    className="
                    bg-gray-700 
                    hover:bg-white 
                    hover:text-black 
                    px-5 
                    py-2 
                    rounded-lg 
                    transition
                    "

                  >

                    Logout

                  </button>



                </>


              ) : (


                <>



                  <Link

                    to="/login"

                    className="text-gray-300 hover:text-white transition"

                  >

                    Login

                  </Link>





                  <Link

                    to="/register"

                    className="
                    bg-white 
                    text-gray-900 
                    px-5 
                    py-2 
                    rounded-lg 
                    font-semibold 
                    hover:bg-gray-200 
                    transition
                    "

                  >

                    Sign Up

                  </Link>



                </>


              )

            }



          </div>


        </div>


      </div>


    </nav>

  );

};


export default Navbar;