const { BrevoClient } = require("@getbrevo/brevo");
require("dotenv").config();


const client = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY
});


// ================= BOOKING EMAIL =================

const sendBookingEmail = async (
    userEmail,
    userName,
    eventTitle
) => {

    try {

        await client.transactionalEmails.sendTransacEmail({

            sender: {
                name: "EventEra",
                email: process.env.EMAIL_USER
            },

            to: [
                {
                    email: userEmail,
                    name: userName
                }
            ],

            subject: `Booking Confirmed: ${eventTitle}`,

            htmlContent: `
                <h2>Hi ${userName}!</h2>

                <p>
                    Your booking for 
                    <strong>${eventTitle}</strong>
                    is confirmed.
                </p>

                <p>
                    Thank you for choosing EventEra.
                </p>
            `
        });


        console.log(
            "Booking email sent to",
            userEmail
        );


    } catch(error){

        console.error(
            "BOOKING EMAIL ERROR:",
            error.message
        );

        throw error;
    }
};




// ================= OTP EMAIL =================

const sendOTPEmail = async (
    userEmail,
    otp,
    type
) => {

    try {


        const title =
            type === "account_verification"
            ? "Verify your EventEra Account"
            : "EventEra Booking Verification";



        await client.transactionalEmails.sendTransacEmail({

            sender: {
                name: "EventEra",
                email: process.env.EMAIL_USER
            },


            to: [
                {
                    email: userEmail
                }
            ],


            subject: title,


            htmlContent: `

                <div style="
                    font-family:Arial;
                    text-align:center;
                    padding:20px;
                ">

                    <h2>${title}</h2>


                    <p>
                        Your OTP is:
                    </p>


                    <h1>
                        ${otp}
                    </h1>


                    <p>
                        This OTP expires in 5 minutes.
                    </p>

                </div>

            `
        });


        console.log(
            "OTP sent successfully to",
            userEmail
        );


    } catch(error){

        console.error(
            "OTP EMAIL ERROR:",
            error.message
        );

        throw error;
    }

};



module.exports = {
    sendBookingEmail,
    sendOTPEmail
};