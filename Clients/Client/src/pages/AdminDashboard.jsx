import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {


    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const [events,setEvents] = useState([]);
    const [bookings,setBookings] = useState([]);

    const [loading,setLoading] = useState(true);

    const [showEventForm,setShowEventForm] = useState(false);



    const [formData,setFormData] = useState({

        title:"",
        description:"",
        date:"",
        location:"",
        category:"",
        totalSeats:"",
        ticketPrice:"",
        image:null

    });





    useEffect(()=>{


        if(!user || user.role !== "admin"){

            navigate("/login");
            return;

        }


        fetchData();


    },[user]);






    const fetchData = async()=>{


        try{


            const [
                eventsRes,
                bookingsRes
            ] = await Promise.all([

                api.get("/events"),

                api.get("/bookings/my")

            ]);



            setEvents(eventsRes.data);

            setBookings(bookingsRes.data);



        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }


    };









    const handleCreateEvent = async(e)=>{


        e.preventDefault();


        try{


            const data = new FormData();



            Object.keys(formData).forEach(key=>{


                data.append(
                    key,
                    formData[key]
                );


            });




            await api.post(
                "/events",
                data
            );



            setShowEventForm(false);



            setFormData({

                title:"",
                description:"",
                date:"",
                location:"",
                category:"",
                totalSeats:"",
                ticketPrice:"",
                image:null

            });



            fetchData();



        }
        catch(error){

            alert(
                error.response?.data?.message ||
                "Event creation failed"
            );

        }


    };









    const deleteEvent = async(id)=>{


        if(!window.confirm("Delete this event?"))
            return;



        try{


            await api.delete(
                `/events/${id}`
            );


            fetchData();


        }
        catch(error){

            alert("Delete failed");

        }


    };









    const confirmBooking = async(id,status)=>{


        try{


            await api.put(

                `/bookings/${id}/confirm`,

                {
                    paymentStatus:status
                }

            );


            fetchData();



        }
        catch(error){

            alert(
                error.response?.data?.message
            );

        }


    };









    const cancelBooking = async(id)=>{


        if(!window.confirm("Cancel booking?"))
            return;


        try{


            await api.delete(
                `/bookings/${id}`
            );


            fetchData();


        }
        catch(error){

            alert("Failed");

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

                Loading Admin Panel...

            </div>

        );

    }










return (

<div className="
max-w-7xl
mx-auto
">



{/* HEADER */}


<div className="
bg-black
text-white
rounded-3xl
p-8
mb-10
flex
justify-between
items-center
">

<div>

<h1 className="
text-4xl
font-black
">

Admin Dashboard

</h1>


<p className="
text-gray-300
mt-2
">

Manage EventEra platform

</p>


</div>




<button

onClick={()=>setShowEventForm(!showEventForm)}

className="
bg-yellow-400
text-black
px-6
py-3
rounded-xl
font-bold
"

>

{

showEventForm
?
"Close"
:
"+ Create Event"

}

</button>


</div>









{/* STATS */}


<div className="
grid
md:grid-cols-3
gap-6
mb-10
">


<div className="
bg-white
rounded-3xl
p-6
shadow
">

<p className="text-gray-500">
Revenue
</p>


<h2 className="
text-3xl
font-black
text-green-600
">

₹
{
bookings.reduce(

(sum,b)=>

b.status==="confirmed" &&
b.paymentStatus==="paid"

?
sum+b.amount
:
sum

,0)

}

</h2>


</div>





<div className="
bg-white
rounded-3xl
p-6
shadow
">

<p className="text-gray-500">
Events
</p>


<h2 className="
text-3xl
font-black
">

{events.length}

</h2>


</div>





<div className="
bg-white
rounded-3xl
p-6
shadow
">

<p className="text-gray-500">
Pending
</p>


<h2 className="
text-3xl
font-black
text-yellow-600
">

{
bookings.filter(
b=>b.status==="pending"
).length
}

</h2>


</div>



</div>









{/* CREATE EVENT */}


{
showEventForm &&


<form

onSubmit={handleCreateEvent}

className="
bg-white
p-8
rounded-3xl
shadow
mb-10
grid
md:grid-cols-2
gap-5
"


>



<input
required
placeholder="Title"
className="input"
onChange={
e=>setFormData({
...formData,
title:e.target.value
})
}
/>



<input
required
placeholder="Category"
className="input"
onChange={
e=>setFormData({
...formData,
category:e.target.value
})
}
/>




<input

required

type="date"

className="input"

onChange={
e=>setFormData({
...formData,
date:e.target.value
})
}

/>




<input

required

placeholder="Location"

className="input"

onChange={
e=>setFormData({
...formData,
location:e.target.value
})
}

/>




<input

required

type="number"

placeholder="Seats"

className="input"

onChange={
e=>setFormData({
...formData,
totalSeats:e.target.value
})
}

/>




<input

required

type="number"

placeholder="Ticket Price"

className="input"

onChange={
e=>setFormData({
...formData,
ticketPrice:e.target.value
})
}

/>




<input

type="file"

accept="image/*"

className="input"

onChange={
e=>setFormData({
...formData,
image:e.target.files[0]
})
}

/>




<textarea

required

placeholder="Description"

className="
input
md:col-span-2
"

onChange={
e=>setFormData({
...formData,
description:e.target.value
})
}

/>



<button

className="
bg-black
text-white
py-3
rounded-xl
font-bold
md:col-span-2
"

>

Publish Event

</button>



</form>


}









{/* EVENTS */}


<h2 className="
text-3xl
font-black
mb-5
">

Events

</h2>



<div className="
grid
md:grid-cols-3
gap-6
">


{

events.map(event=>(


<div

key={event._id}

className="
bg-white
rounded-3xl
overflow-hidden
shadow
"


>


<img

src={event.image}

className="
h-48
w-full
object-cover
"

/>



<div className="p-5">


<h3 className="
font-bold
text-xl
">

{event.title}

</h3>



<p>
Seats:
{event.availableSeats}
/
{event.totalSeats}
</p>



<button

onClick={()=>deleteEvent(event._id)}

className="
mt-4
bg-red-500
text-white
px-4
py-2
rounded-xl
"

>

Delete

</button>



</div>



</div>


))

}


</div>









{/* BOOKINGS */}


<h2 className="
text-3xl
font-black
mt-14
mb-5
">

Bookings

</h2>



<div className="
space-y-5
">


{

bookings.map(b=>(


<div

key={b._id}

className="
bg-white
p-6
rounded-3xl
shadow
"


>


<h3 className="font-bold text-xl">

{b.eventId?.title}

</h3>


<p>
User:
{b.userId?.name}
</p>


<p>
Amount:
₹{b.amount}
</p>



<p>
Status:
{b.status}
</p>



{
b.status==="pending" &&

<div className="
flex
gap-3
mt-4
">


<button

onClick={()=>confirmBooking(
b._id,
"paid"
)}

className="
bg-green-500
text-white
px-4
py-2
rounded-xl
"

>

Approve

</button>



<button

onClick={()=>cancelBooking(b._id)}

className="
bg-red-500
text-white
px-4
py-2
rounded-xl
"

>

Reject

</button>


</div>


}



</div>


))


}


</div>





</div>


);


};


export default AdminDashboard;