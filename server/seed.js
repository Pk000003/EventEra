const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Event = require("./models/Event");
const Booking = require("./models/Booking");

dotenv.config();



const users = [
    {
        name: "Admin User",
        email: "admin@eventora.com",
        password: "password123",
        role: "admin"
    },
    {
        name: "Demo User",
        email: "user@eventora.com",
        password: "password123",
        role: "user"
    }
];



const events = [

{
title:"Sunburn Music Festival Goa",
description:"Asia's biggest EDM festival featuring international DJs, music and nightlife.",
category:"Music",
date:"2026-12-28",
location:"Vagator Beach, Goa",
ticketPrice:2999,
totalSeats:5000,
image:"https://images.unsplash.com/photo-1506157786151-b8491531f063"
},


{
title:"Ganesh Chaturthi Celebration",
description:"Mumbai's famous Ganpati celebration with cultural programs.",
category:"Festival",
date:"2026-09-05",
location:"Mumbai Maharashtra",
ticketPrice:299,
totalSeats:10000,
image:"https://images.unsplash.com/photo-1591604466107-ec97de577aff"
},


{
title:"Navratri Garba Night",
description:"Traditional Gujarati Garba with music and dance.",
category:"Festival",
date:"2026-10-15",
location:"Ahmedabad Gujarat",
ticketPrice:999,
totalSeats:3000,
image:"https://images.unsplash.com/photo-1604503468506-a8da13d82791"
},


{
title:"Diwali Lights Festival",
description:"Celebrate Diwali with lights, food and cultural shows.",
category:"Festival",
date:"2026-11-08",
location:"Jaipur Rajasthan",
ticketPrice:499,
totalSeats:5000,
image:"https://images.unsplash.com/photo-1605649487212-47bdab064df7"
},


{
title:"Holi Color Festival",
description:"Biggest Holi celebration with music and colors.",
category:"Festival",
date:"2027-03-12",
location:"Vrindavan Uttar Pradesh",
ticketPrice:799,
totalSeats:4000,
image:"https://images.unsplash.com/photo-1581299894007-aaa50297cf16"
},


{
title:"IPL Cricket Fan Experience",
description:"Live cricket experience with fan zones.",
category:"Sports",
date:"2026-04-10",
location:"Mumbai",
ticketPrice:1499,
totalSeats:2000,
image:"https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"
},


{
title:"Pune Marathon 2026",
description:"Fitness marathon for runners.",
category:"Sports",
date:"2026-12-20",
location:"Pune",
ticketPrice:499,
totalSeats:8000,
image:"https://images.unsplash.com/photo-1552674605-db6ffd4facb5"
},


{
title:"ISRO Space Expo",
description:"Explore India's space missions and technology.",
category:"Technology",
date:"2026-08-20",
location:"Bangalore",
ticketPrice:299,
totalSeats:1500,
image:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
},


{
title:"AI Machine Learning Summit India",
description:"Conference for AI developers and technology enthusiasts.",
category:"Technology",
date:"2026-09-25",
location:"Hyderabad",
ticketPrice:1999,
totalSeats:1000,
image:"https://images.unsplash.com/photo-1518770660439-4636190af475"
},


{
title:"Startup India Meetup",
description:"Meet entrepreneurs, founders and investors.",
category:"Business",
date:"2026-10-12",
location:"Bangalore",
ticketPrice:999,
totalSeats:500,
image:"https://images.unsplash.com/photo-1556761175-b413da4baf72"
},


{
title:"NH7 Weekender",
description:"India's popular multi genre music festival.",
category:"Music",
date:"2026-12-05",
location:"Pune",
ticketPrice:1999,
totalSeats:6000,
image:"https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b"
},


{
title:"Durga Puja Cultural Festival",
description:"Kolkata's grand cultural celebration.",
category:"Festival",
date:"2026-10-18",
location:"Kolkata",
ticketPrice:399,
totalSeats:7000,
image:"https://images.unsplash.com/photo-1577083552431-6e5fd01988c5"
},


{
title:"Rajasthan Folk Art Festival",
description:"Traditional music and dance performances.",
category:"Art",
date:"2026-11-20",
location:"Udaipur",
ticketPrice:799,
totalSeats:2000,
image:"https://images.unsplash.com/photo-1518005020951-eccb494ad742"
},


{
title:"Photography Workshop Mumbai",
description:"Learn photography from professionals.",
category:"Art",
date:"2026-09-14",
location:"Mumbai",
ticketPrice:499,
totalSeats:100,
image:"https://images.unsplash.com/photo-1452780212940-6f5c0d14d848"
},


{
title:"TEDx Pune",
description:"Inspiring talks from speakers.",
category:"Education",
date:"2026-11-30",
location:"Pune",
ticketPrice:1499,
totalSeats:800,
image:"https://images.unsplash.com/photo-1475721027785-f74eccf877e2"
},


{
title:"Food Festival India",
description:"Taste India's best cuisines.",
category:"Food",
date:"2026-12-15",
location:"Delhi",
ticketPrice:299,
totalSeats:5000,
image:"https://images.unsplash.com/photo-1504674900247-0877df9cc836"
},


{
title:"College Cultural Fest",
description:"Music, dance and competitions.",
category:"College",
date:"2026-02-15",
location:"Pune",
ticketPrice:199,
totalSeats:3000,
image:"https://images.unsplash.com/photo-1527529482837-4698179dc6ce"
},


{
title:"Mumbai Street Art Festival",
description:"Graffiti and street creativity festival.",
category:"Art",
date:"2026-12-22",
location:"Mumbai",
ticketPrice:399,
totalSeats:1000,
image:"https://images.unsplash.com/photo-1549490349-8643362247b5"
},


{
title:"Yoga Wellness Retreat",
description:"Yoga meditation and wellness sessions.",
category:"Health",
date:"2026-08-30",
location:"Rishikesh",
ticketPrice:1999,
totalSeats:500,
image:"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
},


{
title:"Himalayan Adventure Trek",
description:"Thrilling trekking experience.",
category:"Adventure",
date:"2026-06-10",
location:"Manali",
ticketPrice:4999,
totalSeats:300,
image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
}

];





async function seedDatabase(){

try{


await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDB Connected");


await User.deleteMany({});
await Event.deleteMany({});
await Booking.deleteMany({});


console.log("Old data cleared");



const salt = await bcrypt.genSalt(10);



const createdUsers = await User.insertMany(

users.map(user=>({

...user,

password:bcrypt.hashSync(
user.password,
salt
),

isVerified:true

}))

);



const admin = createdUsers.find(
u=>u.role==="admin"
);



const normalUser = createdUsers.find(
u=>u.role==="user"
);



const createdEvents = await Event.insertMany(

events.map(event=>({

...event,

availableSeats:event.totalSeats,

createdBy:admin._id

}))

);



console.log(
`${createdEvents.length} Events Created`
);



const bookings = createdEvents.map(event=>({

userId:normalUser._id,

eventId:event._id,

status:"confirmed",

paymentStatus:"paid",

amount:event.ticketPrice

}));



await Booking.insertMany(bookings);



console.log("Bookings Created");

console.log("DATABASE SEEDED SUCCESSFULLY 🚀");


process.exit();



}
catch(error){

console.log(error);

process.exit(1);

}

}



seedDatabase();