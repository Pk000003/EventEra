import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaSearch
} from "react-icons/fa";


const Events = () => {

    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        fetchEvents();

    }, [search]);



    const fetchEvents = async () => {

        try {

            setLoading(true);

            const { data } = await api.get(
                `/events?search=${search}`
            );

            setEvents(data);

        } catch (error) {

            console.log(
                "Events Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };



    return (

        <div className="min-h-screen">


            {/* HEADER */}

            <div className="bg-black text-white rounded-3xl p-10 mb-12">


                <h1 className="text-5xl font-black mb-5">

                    Explore Events

                </h1>


                <p className="text-gray-300 text-lg mb-8">

                    Discover amazing experiences happening near you.

                </p>



                <div className="relative max-w-xl">


                    <FaSearch 
                    className="absolute left-5 top-5 text-gray-400"
                    />


                    <input

                    type="text"

                    placeholder="Search events..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                    className="
                    w-full
                    pl-14
                    pr-5
                    py-4
                    rounded-full
                    text-black
                    outline-none
                    "

                    />


                </div>


            </div>





            {
                loading ? (

                    <div className="text-center text-xl py-20">

                        Loading Events...

                    </div>


                ) : events.length === 0 ? (

                    <div className="text-center text-gray-500 py-20">

                        No Events Found

                    </div>


                ) : (



                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


                    {
                        events.map((event)=>(


                            <div

                            key={event._id}

                            className="
                            bg-white
                            rounded-3xl
                            overflow-hidden
                            shadow-lg
                            hover:shadow-2xl
                            transition
                            "

                            >



                                <div className="h-52">


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


                                </div>





                                <div className="p-6">


                                    <span className="
                                    bg-blue-100
                                    text-blue-600
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
                                    mb-3
                                    ">

                                    {event.title}

                                    </h2>




                                    <div className="
                                    space-y-3
                                    text-gray-600
                                    ">


                                        <p className="flex gap-3 items-center">

                                            <FaCalendarAlt/>

                                            {
                                            new Date(event.date)
                                            .toDateString()
                                            }

                                        </p>




                                        <p className="flex gap-3 items-center">

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


                                        <p className="
                                        text-xl
                                        font-bold
                                        text-blue-600
                                        ">

                                        {
                                        event.ticketPrice===0
                                        ? "FREE"
                                        : `₹${event.ticketPrice}`
                                        }

                                        </p>



                                        <Link

                                        to={`/events/${event._id}`}

                                        className="
                                        bg-black
                                        text-white
                                        px-5
                                        py-2
                                        rounded-xl
                                        hover:bg-gray-800
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


                )
            }


        </div>

    );

};


export default Events;