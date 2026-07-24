const Event = require("../models/Event");


exports.getEvents = async(req,res)=>{

try{


const {
search,
category,
location,
sort
}=req.query;



let filter={};



// SEARCH

if(search){

filter.$or=[

{
title:{
$regex:search,
$options:"i"
}
},

{
description:{
$regex:search,
$options:"i"
}
}

];

}




// CATEGORY

if(category){

filter.category={

$regex:category,

$options:"i"

};

}




// LOCATION

if(location){

filter.location={

$regex:location,

$options:"i"

};

}





let query = Event.find(filter);



// SORT

if(sort==="priceLow"){

query=query.sort({
ticketPrice:1
});

}

else if(sort==="priceHigh"){

query=query.sort({
ticketPrice:-1
});

}

else{

query=query.sort({
createdAt:-1
});

}



const events = await query.populate(
"createdBy",
"name email"
);



res.status(200).json(events);



}

catch(error){


res.status(500).json({

message:"Server Error",

error:error.message

});


}

};






exports.getEventById = async(req,res)=>{


try{


const event = await Event.findById(req.params.id)
.populate(
"createdBy",
"name email"
);


if(!event){

return res.status(404).json({

message:"Event not found"

});

}


res.json(event);



}

catch(error){


res.status(500).json({

message:error.message

});


}


};






exports.createEvent = async (req, res) => {

    try {


        const event = await Event.create({

            title: req.body.title,

            description: req.body.description,

            date: req.body.date,

            location: req.body.location,

            category: req.body.category,

            totalSeats: req.body.totalSeats,

            availableSeats: req.body.totalSeats,

            ticketPrice: req.body.ticketPrice,


            // Cloudinary image URL
            image: req.file ? req.file.path : "",


            createdBy: req.user.id

        });



        res.status(201).json(event);



    } catch(error) {


        res.status(500).json({

            message:"Event creation failed",

            error:error.message

        });


    }

};






exports.updateEvent = async(req,res)=>{


try{


const event =
await Event.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);



res.json(event);



}

catch(error){


res.status(500).json({

message:error.message

});


}


};






exports.deleteEvent = async(req,res)=>{


try{


await Event.findByIdAndDelete(
req.params.id
);


res.json({

message:"Event deleted"

});


}

catch(error){


res.status(500).json({

message:error.message

});


}


};