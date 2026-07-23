import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import {
  FaTicketAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";
import { motion } from "framer-motion";


const Navbar = () => {

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);


  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };


  const links = [
    {
      name: "Events",
      path: "/"
    }
  ];


  return (

    <nav className="
      fixed
      top-0
      w-full
      z-50
      bg-black/40
      backdrop-blur-xl
      border-b
      border-white/10
      text-white
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
              text-3xl
              font-extrabold
            "
          >

            <motion.div
              whileHover={{
                rotate:360
              }}
              transition={{
                duration:0.5
              }}
              className="
                p-3
                rounded-2xl
                bg-gradient-to-r
                from-purple-500
                to-pink-500
                text-white
              "
            >

              <FaTicketAlt size={22}/>

            </motion.div>


            <span className="
              bg-gradient-to-r
              from-purple-400
              to-pink-400
              bg-clip-text
              text-transparent
            ">

              EventEra

            </span>


          </Link>




          {/* DESKTOP LINKS */}


          <div className="
            hidden
            md:flex
            items-center
            gap-8
          ">


            {
              links.map((item)=>(

                <Link
                  key={item.path}
                  to={item.path}
                  className="
                    relative
                    text-gray-300
                    hover:text-white
                    transition
                    font-medium
                  "
                >

                  {item.name}


                  {
                    location.pathname===item.path && (

                      <motion.span
                        layoutId="active"
                        className="
                          absolute
                          left-0
                          -bottom-2
                          h-1
                          w-full
                          bg-gradient-to-r
                          from-purple-500
                          to-pink-500
                          rounded-full
                        "
                      />

                    )
                  }


                </Link>

              ))
            }





            {
              user ? (

                <>


                  <Link
                    to={
                      user.role==="admin"
                      ?"/admin"
                      :"/dashboard"
                    }
                    className="
                      text-gray-300
                      hover:text-white
                    "
                  >

                    Dashboard

                  </Link>



                  <div className="
                    flex
                    items-center
                    gap-3
                    bg-white/10
                    px-4
                    py-2
                    rounded-full
                    border
                    border-white/10
                  ">


                    <FaUserCircle size={22}/>


                    <span>
                      {user.name}
                    </span>


                  </div>



                  <button
                    onClick={handleLogout}
                    className="
                      flex
                      items-center
                      gap-2
                      bg-red-500/80
                      hover:bg-red-600
                      px-5
                      py-2
                      rounded-full
                      transition
                    "
                  >

                    <FaSignOutAlt/>

                    Logout

                  </button>


                </>


              ) : (

                <>


                  <Link
                    to="/login"
                    className="
                      text-gray-300
                      hover:text-white
                    "
                  >

                    Login

                  </Link>



                  <Link
                    to="/register"
                    className="
                      bg-gradient-to-r
                      from-purple-500
                      to-pink-500
                      px-6
                      py-3
                      rounded-full
                      font-semibold
                      hover:scale-105
                      transition
                    "
                  >

                    Get Started

                  </Link>


                </>

              )

            }


          </div>




          {/* MOBILE BUTTON */}


          <button
            onClick={()=>setOpen(!open)}
            className="
              md:hidden
              text-3xl
            "
          >

            {
              open
              ?
              <FaTimes/>
              :
              <FaBars/>
            }


          </button>


        </div>





        {/* MOBILE MENU */}


        {
          open && (

            <motion.div

              initial={{
                opacity:0,
                y:-20
              }}

              animate={{
                opacity:1,
                y:0
              }}

              className="
                md:hidden
                pb-6
                flex
                flex-col
                gap-5
              "

            >


              <Link
                to="/"
                onClick={()=>setOpen(false)}
              >
                Events
              </Link>


              {
                user ? (

                  <>

                  <Link
                    to="/dashboard"
                    onClick={()=>setOpen(false)}
                  >
                    Dashboard
                  </Link>


                  <button
                    onClick={handleLogout}
                    className="
                      bg-red-500
                      px-4
                      py-2
                      rounded-lg
                    "
                  >

                    Logout

                  </button>


                  </>


                )
                :
                (

                  <>

                  <Link to="/login">
                    Login
                  </Link>


                  <Link
                    to="/register"
                    className="
                      bg-purple-500
                      px-4
                      py-2
                      rounded-lg
                    "
                  >

                    Register

                  </Link>

                  </>

                )
              }


            </motion.div>

          )
        }


      </div>


    </nav>

  );

};


export default Navbar;