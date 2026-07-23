import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import { motion } from "framer-motion";

import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaSearch,
    FaTicketAlt,
    FaUsers,
    FaStar,
    FaLaptopCode,
    FaMusic,
    FaRunning,
    FaPalette
} from "react-icons/fa";


const Home = () => {


    const [events,setEvents] = useState([]);
    const [search,setSearch] = useState("");
    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        const timer=setTimeout(()=>{

            fetchEvents();

        },400);


        return ()=>clearTimeout(timer);


    },[search]);





    const fetchEvents = async()=>{

        try{

            const {data}=await api.get(
                `/events?search=${search}`
            );

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





return (

<div className="min-h-screen bg-gray-50">



{/* HERO */}


<section className="relative overflow-hidden rounded-3xl bg-black text-white mb-20">


<div
className="absolute inset-0 bg-cover bg-center opacity-40"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1506157786151-b8491531f063')"
}}
></div>


<div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black"></div>



<div className="relative z-10 text-center px-6 py-24 md:py-32">


<motion.h1

initial={{opacity:0,y:40}}

animate={{opacity:1,y:0}}

transition={{duration:0.8}}

className="text-5xl md:text-7xl font-black mb-6"

>

Discover
<br/>

<span className="text-blue-400">

Amazing Events

</span>

</motion.h1>



<p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">

Find concerts, technology events, workshops and unforgettable experiences near you.

</p>




<div className="max-w-2xl mx-auto relative">


<FaSearch className="absolute left-6 top-5 text-gray-400"/>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search events..."

className="w-full py-5 pl-14 pr-6 rounded-full text-black text-lg outline-none"

/>


</div>



<div className="flex justify-center gap-5 mt-10">


<Link

to="/"

className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full font-bold"

>

Explore Events

</Link>



<Link

to="/register"

className="border border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition"

>

Host Event

</Link>


</div>


</div>


</section>







{/* CATEGORIES */}


<section className="mb-20">


<h2 className="text-3xl font-bold mb-8">

Explore Categories

</h2>


<div className="grid grid-cols-2 md:grid-cols-4 gap-6">


{
categories.map((cat,index)=>(


<motion.div

whileHover={{scale:1.05}}

key={index}

className="bg-white p-8 rounded-2xl shadow hover:shadow-xl flex flex-col items-center gap-4"

>


<div className="text-4xl text-blue-500">

{cat.icon}

</div>


<h3 className="font-bold">

{cat.name}

</h3>


</motion.div>


))
}


</div>


</section>








{/* STATS */}


<section className="grid md:grid-cols-3 gap-6 mb-20">


{

[
["10K+","Events"],
["50K+","Users"],
["500+","Organizers"]
].map((item,index)=>(


<div

key={index}

className="bg-white rounded-2xl p-8 text-center shadow"

>

<h2 className="text-4xl font-black text-blue-500">

{item[0]}

</h2>


<p className="text-gray-500 mt-2">

{item[1]}

</p>


</div>


))


}


</section>








{/* EVENTS */}



<section>


<div className="flex justify-between items-center mb-8">


<h2 className="text-3xl font-bold">

Upcoming Events

</h2>


<p className="text-gray-500">

{events.length} events

</p>


</div>





{

loading ?

(

<div className="text-center py-20">

Loading events...

</div>

)


:

events.length===0 ?

(

<div className="text-center py-20 text-gray-500">

No events found

</div>

)


:


<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


{

events.map(event=>(


<motion.div

whileHover={{y:-8}}

key={event._id}

className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition"

>


<div className="h-52 relative">


<img

src={event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"}

className="w-full h-full object-cover"

/>


<span className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">

Trending

</span>


</div>




<div className="p-6">


<h3 className="text-xl font-bold mb-3">

{event.title}

</h3>



<div className="space-y-2 text-gray-600 text-sm">


<p className="flex gap-2">

<FaCalendarAlt/>

{new Date(event.date).toDateString()}

</p>



<p className="flex gap-2">

<FaMapMarkerAlt/>

{event.location}

</p>



</div>



<div className="flex justify-between items-center mt-6">


<span className="font-bold text-blue-600">

₹{event.ticketPrice}

</span>



<Link

to={`/events/${event._id}`}

className="bg-black text-white px-5 py-2 rounded-xl"

>

View

</Link>


</div>


</div>


</motion.div>


))


}


</div>


}


</section>






<footer className="mt-20 py-10 text-center border-t">


<div className="flex justify-center items-center gap-2 font-bold text-xl">

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