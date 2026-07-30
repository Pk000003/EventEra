const model = require("../utils/gemini");
const Event = require("../models/Event");


exports.chat = async (req, res) => {

    try {

        const { message } = req.body;


        const events = await Event.find();


        const prompt = `

You are EventEra AI Assistant.

You help users find and understand events.

Here are the available events:

${JSON.stringify(events)}


User question:

${message}


Give a helpful and short answer.

        `;


        const ai = require("../utils/gemini");


        const result = await ai.models.generateContent({

        model: "gemini-2.0-flash",

        contents: prompt

    });


const reply = result.text;


        res.json({
            reply
        });


    }
    catch(error){

        console.log("CHATBOT ERROR:", error);

        res.status(500).json({
            message:"AI response failed"
        });

    }

};