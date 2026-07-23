const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../utils/email");


const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d"
        }
    );
};


// ================= REGISTER =================

exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        const existingUser = await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }



        const hashedPassword = await bcrypt.hash(
            password,
            10
        );



        const user = await User.create({

            name,
            email,
            password: hashedPassword,
            role: "user",
            isVerified: false

        });



        await OTP.deleteMany({

            email,
            action: "account_verification"

        });



        const otp = generateOTP();



        await OTP.create({

            email,
            otp,
            action: "account_verification"

        });



        console.log("REGISTER OTP:", otp);



        await sendOTPEmail(
            email,
            otp
        );



        res.status(201).json({

            message: "OTP sent to your email",
            email

        });



    } catch(error) {


        console.log("REGISTER ERROR:", error);


        res.status(500).json({

            message:error.message

        });


    }

};




// ================= LOGIN =================


exports.login = async(req,res)=>{

    try{


        const {email,password}=req.body;


        console.log("LOGIN:", email);



        const user = await User.findOne({
            email
        });



        if(!user){

            return res.status(400).json({

                message:"User not found"

            });

        }




        const isMatch = await bcrypt.compare(

            password,

            user.password

        );




        if(!isMatch){

            return res.status(400).json({

                message:"Wrong password"

            });

        }





        if(!user.isVerified){


            const otp = generateOTP();



            await OTP.deleteMany({

                email,

                action:"account_verification"

            });



            await OTP.create({

                email,

                otp,

                action:"account_verification"

            });



            console.log("LOGIN OTP:", otp);



            await sendOTPEmail(

                email,

                otp

            );



            return res.status(403).json({

                message:"Account not verified",

                needsVerification:true,

                email

            });


        }





        const token = generateToken(

            user._id,

            user.role

        );




        res.json({

            _id:user._id,

            name:user.name,

            email:user.email,

            role:user.role,

            token

        });



    }catch(error){


        console.log("LOGIN ERROR:",error);



        res.status(500).json({

            message:error.message

        });


    }


};





// ================= VERIFY OTP =================


exports.verifyOTP = async(req,res)=>{


    try{


        const {email,otp}=req.body;



        console.log(
            "VERIFY:",
            email,
            otp
        );



        const otpData = await OTP.findOne({

            email,

            otp,

            action:"account_verification"

        });



        if(!otpData){


            return res.status(400).json({

                message:"Invalid or expired OTP"

            });


        }




        const user = await User.findOneAndUpdate(

            {
                email
            },

            {
                isVerified:true
            },

            {
                new:true
            }

        );




        if(!user){


            return res.status(400).json({

                message:"User not found"

            });


        }




        await OTP.deleteOne({

            _id:otpData._id

        });





        const token = generateToken(

            user._id,

            user.role

        );





        res.json({

            _id:user._id,

            name:user.name,

            email:user.email,

            role:user.role,

            token

        });



    }catch(error){


        console.log(
            "VERIFY ERROR:",
            error
        );



        res.status(500).json({

            message:error.message

        });


    }


};