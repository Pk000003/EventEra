import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaTicketAlt,
    FaMoon,
    FaSun,
    FaUserCircle
} from "react-icons/fa";

import { ThemeContext } from "../context/ThemeContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";



const Navbar = () => {


    const { dark, setDark } = useContext(ThemeContext);

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();



    const handleLogout = () => {

        logout();

        navigate("/login");

    };



return (

<nav className="
w-full
px-4
pt-4
">


<div className="

max-w-7xl
mx-auto

flex
items-center
justify-between

px-6
py-4

rounded-3xl

bg-white/90
dark:bg-[#140021]/90

backdrop-blur-xl

border

border-yellow-300
dark:border-purple-800

shadow-xl

">





{/* LOGO */}


<Link

to="/"

className="
flex
items-center
gap-3
text-2xl
font-black
"

>


<div className="

p-3

rounded-xl

bg-yellow-400

dark:bg-purple-600

text-black

dark:text-white

">

<FaTicketAlt/>

</div>



<span className="
text-black
dark:text-white
">

EventEra

</span>


</Link>








{/* MENU */}


<div className="

hidden

md:flex

items-center

gap-8

">



<Link

to="/events"

className="
font-semibold

text-gray-700

dark:text-gray-200

hover:text-yellow-500

dark:hover:text-purple-400

transition

"

>

Events

</Link>







{

user &&

<Link

to={
user.role==="admin"
?
"/admin"
:
"/dashboard"
}

className="
font-semibold

text-gray-700

dark:text-gray-200

hover:text-yellow-500

dark:hover:text-purple-400

transition

"

>

Dashboard

</Link>


}








{

user &&

<div className="

flex
items-center
gap-2

px-4
py-2

rounded-full

bg-gray-100

dark:bg-[#24003d]

text-black

dark:text-white

">


<FaUserCircle/>

<span>

{user.name}

</span>


</div>


}








{/* THEME BUTTON */}


<button

onClick={()=>setDark(!dark)}

className="

p-3

rounded-full

bg-yellow-400

dark:bg-purple-600

text-black

dark:text-white

"

>


{

dark

?

<FaSun/>

:

<FaMoon/>

}


</button>







{

user

?


<button

onClick={handleLogout}

className="

px-5

py-2

rounded-full

font-bold

bg-black

text-white

dark:bg-purple-600

dark:text-white

hover:scale-105

transition

"

>

Logout

</button>



:


<Link

to="/login"

className="

px-5

py-2

rounded-full

font-bold

bg-yellow-400

text-black

dark:bg-purple-600

dark:text-white

hover:scale-105

transition

"

>

Login

</Link>


}



</div>



</div>


</nav>


);


};


export default Navbar;