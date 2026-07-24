import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

import {
    FaEye,
    FaEyeSlash,
    FaTicketAlt,
    FaUserShield
} from "react-icons/fa";

import { motion } from "framer-motion";



const Register = () => {


    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [otp,setOtp] = useState("");

    const [showOTP,setShowOTP] = useState(false);

    const [showPassword,setShowPassword] = useState(false);

    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);



    const {
        register,
        verifyOtp
    } = useContext(AuthContext);



    const navigate = useNavigate();






    const handleSubmit = async(e)=>{


        e.preventDefault();

        setLoading(true);
        setError("");



        try{


            if(!showOTP){


                await register({

                    name,
                    email,
                    password

                });


                setShowOTP(true);



            }
            else{


                await verifyOtp(
                    email,
                    otp
                );


                navigate("/dashboard");


            }



        }
        catch(err){


            setError(

                err.response?.data?.message ||

                err.message ||

                "Something went wrong"

            );


        }
        finally{


            setLoading(false);


        }


    };










return (


<div className="
min-h-screen

flex
items-center
justify-center

px-5
py-16


bg-gray-100

dark:bg-[#080014]

transition

relative

overflow-hidden

">





{/* Glow */}


<div className="
absolute

w-96
h-96

bg-yellow-400

dark:bg-purple-600

opacity-20

blur-[150px]

rounded-full

top-20

">

</div>









<motion.div


initial={{
opacity:0,
y:40
}}


animate={{
opacity:1,
y:0
}}


className="

relative
z-10

w-full
max-w-md


bg-white

dark:bg-[#120021]


rounded-[35px]


p-8


shadow-2xl


border

border-gray-200

dark:border-purple-900


"

>









{/* LOGO */}



<div className="
text-center
mb-8
">


<div className="
inline-flex

items-center

gap-3


px-5

py-3


rounded-full


bg-yellow-400


dark:bg-purple-600


text-black


dark:text-white


font-black

">


<FaTicketAlt/>

EventEra


</div>







<h1 className="
mt-6

text-4xl

font-black


text-black

dark:text-white

">


Create Account


</h1>




<p className="
mt-2

text-gray-500

dark:text-gray-300

">


Join thousands of event lovers


</p>



</div>









{

error &&


<div className="

bg-red-100

dark:bg-red-900/30


text-red-600

dark:text-red-300


p-4


rounded-xl


mb-5


font-semibold


text-center


">

{error}

</div>



}









<form

onSubmit={handleSubmit}

className="
space-y-5
"


>







{

!showOTP ?


<>



{/* NAME */}


<div>


<label className="
font-bold

text-gray-700

dark:text-gray-200

">

Full Name

</label>



<input


type="text"

required


value={name}


onChange={(e)=>
setName(e.target.value)
}


placeholder="Enter your name"


className="

w-full

mt-2

px-5

py-4


rounded-xl


outline-none


border


border-gray-200


dark:border-purple-900


bg-gray-100


dark:bg-[#220035]


text-black


dark:text-white


"


/>


</div>









{/* EMAIL */}



<div>


<label className="
font-bold

text-gray-700

dark:text-gray-200

">

Email

</label>



<input


type="email"

required


value={email}


onChange={(e)=>
setEmail(e.target.value)
}


placeholder="Enter email"


className="

w-full

mt-2

px-5

py-4


rounded-xl


outline-none


border


border-gray-200


dark:border-purple-900


bg-gray-100


dark:bg-[#220035]


text-black


dark:text-white


"


/>


</div>









{/* PASSWORD */}



<div>


<label className="
font-bold

text-gray-700

dark:text-gray-200

">

Password

</label>



<div className="
relative
mt-2
">


<input


type={
showPassword

?

"text"

:

"password"

}


required


value={password}


onChange={(e)=>
setPassword(e.target.value)
}


placeholder="Create password"


className="

w-full

px-5

py-4

pr-12


rounded-xl


outline-none


border


border-gray-200


dark:border-purple-900


bg-gray-100


dark:bg-[#220035]


text-black


dark:text-white


"


/>





<button


type="button"


onClick={()=>
setShowPassword(!showPassword)
}


className="

absolute

right-4

top-1/2

-translate-y-1/2


text-gray-500


dark:text-purple-300


"


>


{

showPassword

?

<FaEyeSlash/>

:

<FaEye/>

}


</button>



</div>



</div>





</>



:





<>


<div className="

bg-green-100

dark:bg-green-900/30


text-green-700

dark:text-green-300


p-4


rounded-xl


text-center


font-bold


">


OTP sent to your email


</div>






<input


type="text"


required


maxLength="6"


value={otp}


onChange={(e)=>
setOtp(e.target.value)
}


placeholder="Enter OTP"


className="

w-full

px-5

py-4


text-center


tracking-[10px]


font-black


text-xl


rounded-xl


outline-none


border


border-gray-200


dark:border-purple-900


bg-gray-100


dark:bg-[#220035]


text-black


dark:text-white


"


/>



</>



}









<button


disabled={loading}


className="

w-full


py-4


rounded-xl


font-black


text-lg


bg-black


text-white


dark:bg-purple-600



hover:scale-105


transition


shadow-xl


disabled:opacity-50


"


>


{

loading

?

"Processing..."

:

showOTP

?

"Verify OTP"

:

"Create Account"

}



</button>








</form>









<p className="
text-center

mt-8


text-gray-600


dark:text-gray-300

">


Already have account?


<Link

to="/login"


className="

ml-2


font-black


text-yellow-500


dark:text-purple-400


"

>


Login


</Link>


</p>









<div className="

mt-6


flex

justify-center

gap-2


text-sm


text-gray-500


dark:text-gray-400


">


<FaUserShield/>


Secure EventEra Account


</div>







</motion.div>









</div>


);


};



export default Register;