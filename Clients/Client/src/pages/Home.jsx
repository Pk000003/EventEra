import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import api from "../utils/axios";

import {
    FaSearch,
    FaTicketAlt,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaLaptopCode,
    FaMusic,
    FaRunning,
    FaPalette,
    FaUsers,
    FaShieldAlt,
    FaBolt
} from "react-icons/fa";



const Home = () => {


const navigate = useNavigate();


const [events,setEvents] = useState([]);

const [search,setSearch] = useState("");

const [loading,setLoading] = useState(true);







useEffect(()=>{


fetchEvents();


},[]);







const fetchEvents = async()=>{


try{


const {data}=await api.get("/events");


setEvents(data);



}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};










const categories=[


{
name:"Technology",
icon:<FaLaptopCode/>
},


{
name:"Music",
icon:<FaMusic/>
},


{
name:"Sports",
icon:<FaRunning/>
},


{
name:"Art",
icon:<FaPalette/>
}


];









const features=[


{
icon:<FaBolt/>,
title:"Fast Booking",
desc:"Book your favourite events instantly."
},


{
icon:<FaShieldAlt/>,
title:"Secure Platform",
desc:"Safe and reliable experience."
},


{
icon:<FaUsers/>,
title:"Community",
desc:"Connect with thousands of people."
}


];











const searchEvents=()=>{


navigate(

`/events?search=${search}`

);


};









return (


<div className="

min-h-screen

bg-gray-100

dark:bg-[#080014]

transition

">







{/* HERO */}



<section className="

relative

overflow-hidden

rounded-[40px]

bg-white

dark:bg-[#120021]

border

border-gray-200

dark:border-purple-900

mb-20

">





<div className="

absolute

w-96

h-96

bg-yellow-400

dark:bg-purple-600

opacity-20

blur-[150px]

rounded-full

">

</div>







<div className="

relative

z-10

text-center

px-6

py-28

">






<div className="

inline-flex

items-center

gap-3

px-5

py-3

rounded-full

bg-yellow-400

text-black

dark:bg-purple-600

dark:text-white

font-bold

">


<FaTicketAlt/>

EventEra


</div>








<h1 className="

mt-8

text-5xl

md:text-7xl

font-black

text-black

dark:text-white

">


Discover


<br/>


<span className="

text-yellow-500

dark:text-purple-400

">

Amazing Events

</span>


</h1>







<p className="

mt-6

text-lg

text-gray-600

dark:text-gray-300

max-w-2xl

mx-auto

">


Find concerts, workshops, sports and unforgettable experiences near you.


</p>









<div className="

mt-10

max-w-3xl

mx-auto

flex

items-center

rounded-full

bg-gray-100

dark:bg-[#220035]

p-2

">



<FaSearch className="ml-5 text-gray-500"/>





<input


value={search}


onChange={(e)=>setSearch(e.target.value)}


placeholder="Search events..."


className="

flex-1

px-5

py-4

outline-none

bg-transparent

text-black

dark:text-white

placeholder:text-gray-500

"


/>





<button


onClick={searchEvents}


className="

px-7

py-3

rounded-full

font-bold

bg-yellow-400

text-black

dark:bg-purple-600

dark:text-white

"


>


Search


</button>





</div>






</div>



</section>













{/* CATEGORIES */}



<section className="mb-20">



<h2 className="

text-4xl

font-black

mb-10

text-black

dark:text-white

">


Explore Categories


</h2>







<div className="

grid

grid-cols-2

md:grid-cols-4

gap-6

">



{

categories.map((cat,index)=>(


<motion.div


key={index}


whileHover={{

scale:1.05,

y:-8

}}


onClick={()=>navigate(

`/events?category=${cat.name}`

)}


className="

cursor-pointer

bg-white

dark:bg-[#17002b]

p-8

rounded-3xl

text-center

shadow-xl

border

border-gray-200

dark:border-purple-900

transition

"


>



<div className="

text-5xl

flex

justify-center

text-yellow-500

dark:text-purple-400

mb-5

">


{cat.icon}


</div>







<h3 className="

font-bold

text-black

dark:text-white

">


{cat.name}


</h3>



</motion.div>



))


}



</div>




</section>













{/* EVENTS */}



<section>


<div className="

flex

justify-between

items-center

mb-8

">


<h2 className="

text-4xl

font-black

text-black

dark:text-white

">

Upcoming Events

</h2>



<Link

to="/events"

className="

font-bold

text-yellow-500

dark:text-purple-400

"

>

View All

</Link>


</div>









{

loading ?


<div className="text-center py-20">

Loading...

</div>



:


<div className="

grid

md:grid-cols-2

lg:grid-cols-3

gap-8

">


{

events.slice(0,6).map(event=>(



<motion.div


key={event._id}


whileHover={{

y:-10

}}


className="

bg-white

dark:bg-[#17002b]

rounded-3xl

overflow-hidden

shadow-xl

border

dark:border-purple-900

"

>




<img


src={

event.image ||

"https://images.unsplash.com/photo-1492684223066-81342ee5ff30"

}


className="

w-full

h-52

object-cover

"


/>







<div className="p-6">



<h3 className="

text-xl

font-bold

dark:text-white

">


{event.title}


</h3>







<p className="

mt-3

flex

gap-3

text-gray-500

dark:text-gray-300

">

<FaCalendarAlt/>

{new Date(event.date).toDateString()}

</p>






<p className="

mt-2

flex

gap-3

text-gray-500

dark:text-gray-300

">

<FaMapMarkerAlt/>

{event.location}

</p>







<Link


to={`/events/${event._id}`}


className="

block

mt-6

text-center

py-3

rounded-xl

font-bold

bg-yellow-400

text-black

dark:bg-purple-600

dark:text-white

"


>

View Details

</Link>



</div>





</motion.div>


))


}


</div>



}



</section>













{/* FEATURES */}



<section className="

grid

md:grid-cols-3

gap-8

my-24

">


{

features.map((item,index)=>(


<div

key={index}

className="

bg-white

dark:bg-[#17002b]

rounded-3xl

p-8

text-center

border

dark:border-purple-900

"


>


<div className="

text-4xl

flex

justify-center

text-yellow-500

dark:text-purple-400

">


{item.icon}


</div>





<h3 className="

text-xl

font-bold

mt-5

dark:text-white

">

{item.title}

</h3>





<p className="

mt-3

text-gray-500

dark:text-gray-300

">

{item.desc}

</p>



</div>



))


}



</section>











<footer className="

border-t

dark:border-purple-900

py-10

text-center

">


<div className="

flex

justify-center

gap-3

font-black

text-2xl

dark:text-white

">


<FaTicketAlt/>

EventEra


</div>



<p className="text-gray-500 mt-3">

Discover. Connect. Experience.

</p>



</footer>







</div>


);


};



export default Home;