import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaChair,
    FaMoneyBillWave,
    FaTicketAlt,
    FaLock
} from "react-icons/fa";


const EventDetail = () => {


    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);


    const [event,setEvent] = useState(null);

    const [loading,setLoading] = useState(true);

    const [bookingLoading,setBookingLoading] = useState(false);

    const [otp,setOtp] = useState("");

    const [showOTP,setShowOTP] = useState(false);

    const [error,setError] = useState("");

    const [successMsg,setSuccessMsg] = useState("");




    useEffect(()=>{


        const fetchEvent = async()=>{

            try{

                const {data}=await api.get(
                    `/events/${id}`
                );

                setEvent(data);

            }
            catch(error){

                setError(
                    "Failed to load event details"
                );

            }
            finally{

                setLoading(false);

            }

        };


        fetchEvent();


    },[id]);







    const handleBooking = async()=>{


        if(!user){

            navigate("/login");

            return;

        }


        try{


            setBookingLoading(true);

            setError("");

            setSuccessMsg("");



            if(!showOTP){


                await api.post(
                    "/bookings/send-otp"
                );


                setShowOTP(true);


                setSuccessMsg(
                    "OTP sent to your email"
                );


            }

            else{


                await api.post(
                    "/bookings",
                    {
                        eventId:event._id,
                        otp
                    }
                );



                setSuccessMsg(
                    "Booking request submitted. Waiting for admin approval."
                );


                setShowOTP(false);

                setOtp("");

            }



        }
        catch(error){


            setError(
                error.response?.data?.message ||
                "Booking failed"
            );


        }
        finally{


            setBookingLoading(false);


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

                Loading Event...

            </div>

        );


    }





    if(!event){


        return (

            <div className="
            text-center
            py-20
            text-red-500
            text-xl
            ">

                Event not found

            </div>

        );

    }






    const percentage =
    (event.availableSeats / event.totalSeats) * 100;





return (



<div className="
min-h-screen
pb-20
">





<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.5
}}

className="
max-w-6xl
mx-auto
"

>





{/* IMAGE */}


<div className="
relative
rounded-[40px]
overflow-hidden
h-[350px]
shadow-2xl
">


<img

src={
event.image ||
"https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
}

alt={event.title}

className="
w-full
h-full
object-cover
"

/>



<div className="
absolute
inset-0
bg-gradient-to-t
from-black/80
to-transparent
">


</div>





<div className="
absolute
bottom-8
left-8
text-white
">


<span className="
bg-yellow-400
text-black
px-4
py-2
rounded-full
font-bold
">

{event.category}

</span>



<h1 className="
text-4xl
md:text-6xl
font-black
mt-5
">

{event.title}

</h1>


</div>



</div>









<div className="
grid
lg:grid-cols-3
gap-8
mt-10
">






{/* DETAILS */}



<div className="
lg:col-span-2
bg-white
dark:bg-[#170025]
rounded-[35px]
p-8
shadow-xl
border
dark:border-purple-900
">


<h2 className="
text-3xl
font-black
mb-5
dark:text-white
">

About Event

</h2>



<p className="
text-gray-600
dark:text-gray-300
leading-relaxed
text-lg
">

{event.description}

</p>






<div className="
grid
md:grid-cols-2
gap-5
mt-10
">



<div className="
p-5
rounded-3xl
bg-gray-100
dark:bg-[#220035]
flex
gap-4
items-center
">


<FaCalendarAlt
className="
text-yellow-500
dark:text-purple-400
text-3xl
"/>


<div>

<p className="
text-sm
text-gray-500
">

DATE

</p>


<h3 className="
font-bold
dark:text-white
">

{new Date(event.date)
.toDateString()}

</h3>


</div>


</div>








<div className="
p-5
rounded-3xl
bg-gray-100
dark:bg-[#220035]
flex
gap-4
items-center
">


<FaMapMarkerAlt

className="
text-yellow-500
dark:text-purple-400
text-3xl
"

/>


<div>

<p className="
text-sm
text-gray-500
">

LOCATION

</p>


<h3 className="
font-bold
dark:text-white
">

{event.location}

</h3>


</div>


</div>



</div>






</div>









{/* BOOKING CARD */}



<div className="
bg-black
dark:bg-[#120021]
text-white
rounded-[35px]
p-8
shadow-2xl
h-fit
">



<div className="
flex
items-center
gap-3
mb-6
">


<FaTicketAlt
className="
text-yellow-400
text-3xl
"
/>


<h2 className="
text-2xl
font-black
">

Booking

</h2>


</div>







<div className="
space-y-5
">



<div className="
flex
items-center
gap-4
">


<FaMoneyBillWave
className="
text-yellow-400
"
/>


<div>

<p className="text-gray-400">

Price

</p>


<p className="
text-2xl
font-black
">

{
event.ticketPrice===0
?
"FREE"
:
`₹${event.ticketPrice}`
}

</p>


</div>


</div>







<div>

<div className="
flex
justify-between
mb-2
">


<span>

Seats

</span>


<span>

{event.availableSeats}/{event.totalSeats}

</span>


</div>



<div className="
h-3
bg-gray-700
rounded-full
overflow-hidden
">


<div

style={{
width:`${percentage}%`
}}

className="
h-full
bg-yellow-400
dark:bg-purple-500
"

/>


</div>


</div>





</div>







{
showOTP && (

<div className="
mt-6
">


<div className="
flex
items-center
gap-2
mb-3
">

<FaLock/>

OTP Verification

</div>



<input

value={otp}

onChange={
(e)=>setOtp(e.target.value)
}

maxLength="6"

placeholder="Enter OTP"

className="
w-full
px-5
py-4
rounded-xl
text-black
outline-none
tracking-widest
text-center
font-bold
"

/>


</div>

)

}







<button

onClick={handleBooking}

disabled={
bookingLoading ||
(showOTP && !otp) ||
event.availableSeats<=0
}


className="
w-full
mt-6
py-4
rounded-xl
font-black
text-lg
bg-yellow-400
text-black
hover:scale-105
transition
disabled:bg-gray-500
"

>


{

bookingLoading

?

"Processing..."

:

showOTP

?

"Verify OTP"

:

event.availableSeats<=0

?

"Sold Out"

:

"Book Now"

}


</button>






{
error &&

<p className="
mt-4
bg-red-500/20
text-red-300
p-3
rounded-xl
text-center
">

{error}

</p>

}





{
successMsg &&

<p className="
mt-4
bg-green-500/20
text-green-300
p-3
rounded-xl
text-center
">

{successMsg}

</p>

}






</div>







</div>





</motion.div>




</div>



);


};


export default EventDetail;