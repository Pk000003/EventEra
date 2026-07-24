import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
    FaTicketAlt,
    FaTimesCircle,
    FaCheckCircle,
    FaClock,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaMapMarkerAlt
} from "react-icons/fa";



const UserDashboard = () => {


    const { user } = useContext(AuthContext);

    const navigate = useNavigate();


    const [bookings,setBookings] = useState([]);

    const [loading,setLoading] = useState(true);






    useEffect(()=>{


        if(!user){

            navigate("/login");

            return;

        }


        fetchBookings();


    },[user,navigate]);






    const fetchBookings = async()=>{


        try{


            const {data}=await api.get(
                "/bookings/my"
            );


            setBookings(data);


        }
        catch(error){

            console.log(
                error
            );

        }
        finally{

            setLoading(false);

        }


    };









    const cancelBooking = async(id)=>{


        if(
            window.confirm(
                "Cancel this booking?"
            )
        ){


            try{


                await api.delete(
                    `/bookings/${id}`
                );


                fetchBookings();


            }
            catch(error){


                alert(
                    error.response?.data?.message ||
                    "Cancel failed"
                );


            }


        }


    };






    if(loading){


        return (

            <div className="
            text-center
            py-20
            text-xl
            font-bold
            ">

                Loading Dashboard...

            </div>

        );


    }







    const confirmed =
    bookings.filter(
        b=>b.status==="confirmed"
    ).length;



    const pending =
    bookings.filter(
        b=>b.status==="pending"
    ).length;



    const cancelled =
    bookings.filter(
        b=>b.status==="cancelled"
    ).length;







return (


<div className="
min-h-screen
pb-20
">







{/* PROFILE HEADER */}



<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="
bg-black
dark:bg-[#120021]
text-white
rounded-[35px]
p-8
mb-10
shadow-2xl
flex
flex-col
md:flex-row
gap-6
items-center
"


>


<div className="
w-24
h-24
rounded-full
bg-yellow-400
text-black
flex
items-center
justify-center
text-4xl
font-black
">


{
user?.name?.charAt(0)
}



</div>





<div>


<h1 className="
text-4xl
font-black
">

Welcome,
<br/>

{user?.name} 👋

</h1>



<p className="
text-gray-300
mt-2
">

Manage your EventEra bookings

</p>



</div>



</motion.div>









{/* STATS */}



<div className="
grid
grid-cols-1
md:grid-cols-4
gap-6
mb-12
">





<StatCard

title="Total"

value={bookings.length}

icon={<FaTicketAlt/>}

/>



<StatCard

title="Confirmed"

value={confirmed}

icon={<FaCheckCircle/>}

/>



<StatCard

title="Pending"

value={pending}

icon={<FaClock/>}

/>



<StatCard

title="Cancelled"

value={cancelled}

icon={<FaTimesCircle/>}

/>



</div>









<h2 className="
text-3xl
font-black
dark:text-white
mb-8
flex
gap-3
items-center
">


<FaTicketAlt/>

My Bookings


</h2>









{

bookings.length===0 ?


<div className="
bg-white
dark:bg-[#170025]
rounded-3xl
p-12
text-center
shadow-xl
">


<h3 className="
text-2xl
font-bold
dark:text-white
">

No bookings yet

</h3>



<Link

to="/events"

className="
inline-block
mt-6
bg-yellow-400
text-black
font-bold
px-8
py-3
rounded-xl
"

>

Explore Events

</Link>



</div>

:



<div className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-8
">


{


bookings.map((booking)=>(



<motion.div


key={booking._id}


whileHover={{
y:-8
}}


className="
bg-white
dark:bg-[#170025]
rounded-[30px]
shadow-xl
overflow-hidden
border
dark:border-purple-900
"


>




{
booking.eventId?.image &&


<img

src={booking.eventId.image}

className="
h-48
w-full
object-cover
"

/>


}






<div className="p-6">


<h3 className="
text-2xl
font-black
dark:text-white
mb-4
">


{
booking.eventId?.title ||
"Event Removed"
}



</h3>







<div className="
space-y-3
text-gray-600
dark:text-gray-300
">



<p className="
flex
gap-3
items-center
">


<FaCalendarAlt/>


{

booking.eventId &&
new Date(
booking.eventId.date
).toDateString()

}


</p>







<p className="
flex
gap-3
items-center
">


<FaMapMarkerAlt/>


{

booking.eventId?.location ||
"Unknown"

}


</p>







<p className="
flex
gap-3
items-center
">


<FaMoneyBillWave/>


{

booking.amount===0
?
"FREE"
:
`₹${booking.amount}`

}


</p>



</div>









<div className="
flex
justify-between
items-center
mt-6
">



<span

className={`
px-4
py-2
rounded-full
font-bold
text-sm

${
booking.status==="confirmed"

?

"bg-green-100 text-green-700"

:

booking.status==="pending"

?

"bg-yellow-100 text-yellow-700"

:

"bg-red-100 text-red-700"

}

`}

>

{booking.status}

</span>



</div>








<div className="
flex
gap-3
mt-6
">


{
booking.eventId &&

<Link

to={`/events/${booking.eventId._id}`}

className="
flex-1
text-center
bg-black
dark:bg-purple-600
text-white
py-3
rounded-xl
font-bold
"

>

View

</Link>

}







{
booking.status!=="cancelled" &&


<button

onClick={()=>cancelBooking(booking._id)}

className="
px-4
rounded-xl
bg-red-100
text-red-600
"

>


<FaTimesCircle/>


</button>


}




</div>







</div>




</motion.div>



))


}



</div>



}





</div>


);


};







const StatCard=({title,value,icon})=>{


return (

<div className="
bg-white
dark:bg-[#170025]
rounded-3xl
p-6
shadow-xl
border
dark:border-purple-900
flex
justify-between
items-center
">


<div>

<p className="
text-gray-500
">

{title}

</p>


<h3 className="
text-4xl
font-black
dark:text-white
">

{value}

</h3>


</div>


<div className="
text-4xl
text-yellow-500
dark:text-purple-400
">

{icon}

</div>



</div>

);


};



export default UserDashboard;