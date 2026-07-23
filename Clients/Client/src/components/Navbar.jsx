import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTicketAlt,
  FaSearch,
  FaMapMarkerAlt,
  FaUserCircle,
  FaChevronDown,
  FaBars,
  FaTimes
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext.jsx";


const Navbar = () => {


  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState(false);
  const [account, setAccount] = useState(false);



  const handleLogout = () => {

    logout();

    navigate("/login");

  };



  return (

    <nav className="
      sticky
      top-0
      z-50
      bg-white
      shadow-md
    ">


      <div className="
        max-w-7xl
        mx-auto
        px-6
      ">


        <div className="
          h-20
          flex
          items-center
          justify-between
        ">



          {/* LOGO */}

          <Link
            to="/"
            className="
              flex
              items-center
              gap-3
              text-2xl
              font-bold
              text-gray-900
            "
          >

            <div className="
              bg-purple-600
              text-white
              p-3
              rounded-xl
            ">

              <FaTicketAlt/>

            </div>


            EventEra


          </Link>





          {/* SEARCH */}


          <div className="
            hidden
            lg:flex
            items-center
            bg-gray-100
            rounded-full
            px-5
            py-3
            w-96
          ">


            <FaSearch className="text-gray-500"/>


            <input

              type="text"

              placeholder="Search events..."

              className="
                bg-transparent
                outline-none
                ml-3
                w-full
              "

            />


          </div>






          {/* LOCATION */}


          <div className="
            hidden
            md:flex
            items-center
            gap-2
            text-gray-700
          ">

            <FaMapMarkerAlt
              className="text-purple-600"
            />

            Pune


          </div>







          {/* DESKTOP MENU */}


          <div className="
            hidden
            md:flex
            items-center
            gap-6
          ">



            {/* CATEGORY */}


            <div className="relative">


              <button

                onClick={()=>setCategory(!category)}

                className="
                  flex
                  items-center
                  gap-2
                  text-gray-700
                "

              >

                Categories

                <FaChevronDown size={12}/>


              </button>




              {
                category && (

                  <div className="
                    absolute
                    top-10
                    bg-white
                    shadow-xl
                    rounded-xl
                    p-4
                    w-40
                  ">


                    <p className="hover:text-purple-600">
                      Music
                    </p>

                    <p className="hover:text-purple-600">
                      Sports
                    </p>

                    <p className="hover:text-purple-600">
                      Workshops
                    </p>


                  </div>

                )
              }



            </div>





            <Link
              to="/events"
              className="text-gray-700"
            >

              Events

            </Link>




            {
              user && (

                <Link
                  to={
                    user.role==="admin"
                    ?"/admin"
                    :"/dashboard"
                  }
                  className="text-gray-700"
                >

                  Dashboard

                </Link>

              )
            }






            {/* ACCOUNT */}



            {
              user ?

              (

              <div className="relative">


                <button

                  onClick={()=>setAccount(!account)}

                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <FaUserCircle size={25}/>

                  {user.name}

                </button>



                {
                  account && (

                    <div className="
                      absolute
                      right-0
                      top-12
                      bg-white
                      shadow-xl
                      rounded-xl
                      p-4
                      w-40
                    ">


                      <button
                        onClick={handleLogout}
                        className="
                          text-red-500
                        "
                      >

                        Logout

                      </button>


                    </div>

                  )
                }


              </div>


              )

              :

              (

              <>

              <Link
                to="/login"
                className="text-gray-700"
              >
                Login
              </Link>


              <Link
                to="/register"
                className="
                  bg-purple-600
                  text-white
                  px-5
                  py-2
                  rounded-full
                "
              >

                Register

              </Link>


              </>

              )

            }



          </div>







          {/* MOBILE BUTTON */}


          <button

            onClick={()=>setMenu(!menu)}

            className="
              md:hidden
              text-2xl
            "

          >

            {
              menu
              ?
              <FaTimes/>
              :
              <FaBars/>
            }


          </button>



        </div>



      </div>


    </nav>

  );

};


export default Navbar;