const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();


const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    family: 4,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },

    tls: {
        rejectUnauthorized: false
    }

});



// Check SMTP connection

transporter.verify((error) => {

    if (error) {

        console.error("SMTP Error:", error);

    } else {

        console.log("SMTP Server Ready");

    }

});





const sendBookingEmail = async (
    userEmail,
    userName,
    eventTitle
) => {

    try {

        const mailOptions = {

            from: process.env.EMAIL_USER,

            to: userEmail,

            subject: `Booking Confirmed: ${eventTitle}`,

            html: `

                <div style="font-family:Arial;padding:20px">

                    <h2>
                        Hi ${userName}!
                    </h2>

                    <p>
                        Your booking for 
                        <strong>${eventTitle}</strong>
                        is successfully confirmed.
                    </p>

                    <p>
                        Thank you for choosing EventEra.
                    </p>

                </div>

            `

        };


        await transporter.sendMail(mailOptions);


        console.log(
            "Booking email sent successfully to",
            userEmail
        );


    } catch(error) {


        console.error(
            "BOOKING EMAIL ERROR:",
            error
        );


        throw error;

    }

};








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



        const msg =
            type === "account_verification"
            ? "Please use the following OTP to verify your new EventEra account."
            : "Please use the following OTP to verify and confirm your event booking.";





        const mailOptions = {


            from: process.env.EMAIL_USER,


            to: userEmail,


            subject: title,


            html: `

            <div style="
                font-family:Arial;
                text-align:center;
                padding:20px;
            ">


                <h2>
                    ${title}
                </h2>


                <p>
                    ${msg}
                </p>


                <div style="
                    margin:20px auto;
                    padding:15px;
                    font-size:28px;
                    font-weight:bold;
                    background:#f4f4f4;
                    width:max-content;
                    letter-spacing:8px;
                ">

                    ${otp}

                </div>


                <p style="color:#999;font-size:12px">

                    This OTP expires in 5 minutes.

                </p>


            </div>

            `

        };




        await transporter.sendMail(mailOptions);



        console.log(
            `OTP sent to ${userEmail} for ${type}`
        );



    } catch(error) {



        console.error(
            "OTP EMAIL ERROR:",
            error
        );


        throw error;


    }


};





module.exports = {

    sendBookingEmail,

    sendOTPEmail

};