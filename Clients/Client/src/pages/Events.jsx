import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import api from "../utils/axios";

import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaSearch
} from "react-icons/fa";



const Events = () => {


const [events,setEvents] = useState([]);

const [loading,setLoading] = useState(true);


const [searchParams,setSearchParams] = useSearchParams();



const [search,setSearch] = useState(
    searchParams.get("search") || ""
);

const [category,setCategory] = useState(
    searchParams.get("category") || ""
);

const [location,setLocation] = useState(
    searchParams.get("location") || ""
);

const [sort,setSort] = useState(
    searchParams.get("sort") || ""
);





const categories=[
    "Technology",
    "Music",
    "Sports",
    "Art",
    "Workshop",
    "Other"
];






useEffect(()=>{

    fetchEvents();

},[searchParams]);







const fetchEvents = async()=>{

try{


setLoading(true);


const query = new URLSearchParams(searchParams).toString();



const response = await api.get(
    `/events?${query}`
);



setEvents(response.data);



}

catch(error){

console.log(
"Fetch Events Error:",
error
);

}

finally{

setLoading(false);

}


};









const applyFilters = ()=>{


let params={};



if(search.trim()){

params.search=search.trim();

}



if(category){

params.category=category;

}



if(location.trim()){

params.location=location.trim();

}



if(sort){

params.sort=sort;

}



setSearchParams(params);



};









return (

<div className="min-h-screen">






<div className="

bg-black

dark:bg-[#120021]

rounded-[35px]

p-10

mb-12

text-white

shadow-xl

">





<h1 className="

text-5xl

font-black

mb-5

">

Explore Events

</h1>





<p className="text-gray-300 text-lg">

Discover amazing experiences happening near you.

</p>









<div className="

mt-10

grid

md:grid-cols-4

gap-4

">







<div className="

flex

items-center

bg-white

rounded-2xl

px-4

">


<FaSearch className="text-gray-400"/>



<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search events"

className="

w-full

px-3

py-4

outline-none

bg-white

text-black

placeholder:text-gray-400

"

/>


</div>









<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="

rounded-2xl

px-4

py-4

bg-white

text-black

outline-none

"

>

<option value="">

All Categories

</option>


{
categories.map(cat=>(

<option

key={cat}

value={cat}

>

{cat}

</option>

))

}


</select>









<input

value={location}

onChange={(e)=>setLocation(e.target.value)}

placeholder="Location"

className="

rounded-2xl

px-4

py-4

bg-white

text-black

outline-none

"

/>









<select

value={sort}

onChange={(e)=>setSort(e.target.value)}

className="

rounded-2xl

px-4

py-4

bg-white

text-black

outline-none

"

>


<option value="">

Latest

</option>


<option value="priceLow">

Price Low

</option>


<option value="priceHigh">

Price High

</option>


</select>






</div>







<button

onClick={applyFilters}

className="

mt-6

bg-yellow-400

text-black

font-bold

px-8

py-3

rounded-full

hover:scale-105

transition

"

>

Apply Filters

</button>







</div>









{

loading ?


<div className="text-center py-20">

Loading Events...

</div>



:

events.length===0 ?



<div className="text-center py-20 text-gray-500">


<h2 className="text-3xl font-bold">

No Events Found

</h2>


</div>





:



<div className="

grid

grid-cols-1

md:grid-cols-2

lg:grid-cols-3

gap-8

">


{

events.map(event=>(



<div

key={event._id}

className="

bg-white

dark:bg-[#170025]

rounded-3xl

overflow-hidden

shadow-xl

border

border-gray-200

dark:border-purple-900

"

>



<img

src={

event.image ||

"https://images.unsplash.com/photo-1492684223066-81342ee5ff30"

}

alt={event.title}

className="

w-full

h-52

object-cover

"

/>





<div className="p-6">



<span className="

bg-purple-100

text-purple-700

px-3

py-1

rounded-full

text-sm

font-bold

">

{event.category}

</span>





<h2 className="

text-2xl

font-bold

mt-4

dark:text-white

">

{event.title}

</h2>






<div className="

mt-4

space-y-3

text-gray-600

dark:text-gray-300

">


<p className="flex gap-3">

<FaCalendarAlt/>

{new Date(event.date).toDateString()}

</p>



<p className="flex gap-3">

<FaMapMarkerAlt/>

{event.location}

</p>


</div>







<div className="

flex

justify-between

items-center

mt-6

">


<span className="

text-xl

font-bold

text-purple-600

">


{

event.ticketPrice===0

?

"FREE"

:

`₹${event.ticketPrice}`

}


</span>





<Link

to={`/events/${event._id}`}

className="

bg-black

dark:bg-white

dark:text-black

text-white

px-5

py-2

rounded-xl

"

>

View Details

</Link>



</div>





</div>





</div>



))


}



</div>



}



</div>


);


};



export default Events;