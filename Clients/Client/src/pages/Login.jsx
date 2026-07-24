import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaTicketAlt,
    FaShieldAlt
} from "react-icons/fa";
import { motion } from "framer-motion";


const Login = () => {


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [otp,setOtp] = useState("");

    const [showOTP,setShowOTP] = useState(false);
    const [showPassword,setShowPassword] = useState(false);

    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);



    const { login, verifyOtp } = useContext(AuthContext);

    const navigate = useNavigate();





    const handleSubmit = async(e)=>{

        e.preventDefault();

        setLoading(true);
        setError("");

        try{


            if(!showOTP){


                const data = await login(
                    email,
                    password
                );


                if(data.role==="admin"){

                    navigate("/admin");

                }
                else{

                    navigate("/dashboard");

                }



            }
            else{


                const data = await verifyOtp(
                    email,
                    otp
                );


                if(data.role==="admin"){

                    navigate("/admin");

                }
                else{

                    navigate("/dashboard");

                }


            }



        }
        catch(err){


            if(err.needsVerification){

                setShowOTP(true);

                setError(
                    "Account not verified. OTP sent to your email."
                );

            }
            else{

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Login failed"
                );

            }


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
text-4xl
font-black

mt-6

text-black
dark:text-white

">

Welcome Back

</h1>



<p className="
mt-2

text-gray-500
dark:text-gray-300

">

Login to continue your experience

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

text-center

font-semibold

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

>


</input>


</div>







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


placeholder="Enter password"


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




<div>


<label className="
font-bold
text-gray-700
dark:text-gray-200
">

Verification OTP

</label>


<input


type="text"

required

maxLength="6"

value={otp}

onChange={(e)=>
setOtp(e.target.value)
}


placeholder="Enter 6 digit OTP"


className="
w-full

mt-2

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



</div>



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

"Login"

}


</button>






</form>









<p className="
text-center

mt-8

text-gray-600

dark:text-gray-300

">


Don't have account?


<Link

to="/register"

className="
ml-2

font-black

text-yellow-500

dark:text-purple-400

"

>

Register

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


<FaShieldAlt/>

Secure authentication

</div>






</motion.div>






</div>


);


};


export default Login;