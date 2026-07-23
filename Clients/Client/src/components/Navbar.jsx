import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { FaTicketAlt, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";


const Navbar = () => {

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);


  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };


  const isActive = (path) => {
    return location.pathname === path
      ? "text-white font-semibold"
      : "text-gray-300 hover:text-white";
  };


  return (

    <nav className="
      sticky top-0 z-50
      bg-gray-900/90
      backdrop-blur-md
      text-white
      shadow-lg
    ">


      <div className="max-w-7xl mx-auto px-6">


        <div className="flex justify-between items-center h-20">


          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold"
            aria-label="EventEra Home"
          >

            <motion.div
              whileHover={{ rotate: 10 }}
              className="
                bg-white
                text-gray-900
                p-2
                rounded-xl
              "
            >

              <FaTicketAlt />

            </motion.div>


            EventEra

          </Link>



          {/* Desktop Menu */}

          <div className="
            hidden
            md:flex
            items-center
            gap-7
          ">


            <Link
              to="/"
              className={isActive("/")}
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
                    className={isActive(
                      user.role === "admin"
                      ? "/admin"
                      : "/dashboard"
                    )}
                  >

                    Dashboard

                  </Link>


                  <div className="
                    flex
                    items-center
                    gap-3
                    bg-gray-800
                    px-4
                    py-2
                    rounded-xl
                  ">

                    <FaUserCircle size={22}/>

                    <span>
                      {user.name}
                    </span>

                  </div>


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
                    className={isActive("/login")}
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




          {/* Mobile Button */}


          <button
            className="
              md:hidden
              text-2xl
            "
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >

            {
              menuOpen
              ?
              <FaTimes/>
              :
              <FaBars/>
            }

          </button>



        </div>



        {/* Mobile Menu */}


        {
          menuOpen && (

            <motion.div
              initial={{
                opacity:0,
                height:0
              }}

              animate={{
                opacity:1,
                height:"auto"
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
                onClick={()=>setMenuOpen(false)}
                className={isActive("/")}
              >
                Events
              </Link>



              {
                user ? (

                  <>


                    <Link
                      to={
                        user.role==="admin"
                        ?"/admin"
                        :"/dashboard"
                      }
                      onClick={()=>setMenuOpen(false)}
                      className="text-gray-300"
                    >

                      Dashboard

                    </Link>



                    <button
                      onClick={handleLogout}
                      className="
                        bg-gray-700
                        px-5
                        py-2
                        rounded-lg
                        w-fit
                      "
                    >

                      Logout

                    </button>


                  </>


                )
                :
                (

                  <>


                    <Link
                      to="/login"
                      onClick={()=>setMenuOpen(false)}
                    >
                      Login
                    </Link>


                    <Link
                      to="/register"
                      onClick={()=>setMenuOpen(false)}
                      className="
                        bg-white
                        text-black
                        px-5
                        py-2
                        rounded-lg
                        w-fit
                      "
                    >

                      Sign Up

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