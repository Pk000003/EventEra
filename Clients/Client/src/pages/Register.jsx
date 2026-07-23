import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");

    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const { register, verifyOtp } = useContext(AuthContext);

    const navigate = useNavigate();



    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");


        try {


            if (!showOTP) {


                await register({
                    name,
                    email,
                    password
                });


                setShowOTP(true);



            } else {


                await verifyOtp(email, otp);

                navigate("/dashboard");


            }



        } catch (err) {


            console.log(err);


            setError(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong"
            );


        } finally {

            setLoading(false);

        }

    };




    return (

        <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-xl border">


            <div className="text-center mb-8">

                <h2 className="text-3xl font-bold text-gray-900">
                    Create an Account
                </h2>


                <p className="text-gray-500 mt-2">
                    Join EventEra today
                </p>


            </div>



            {
                error && (

                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
                        {error}
                    </div>

                )
            }




            <form onSubmit={handleSubmit} className="space-y-5">



                {
                    !showOTP ? (

                        <>


                            <div>

                                <label className="block mb-2 font-semibold">
                                    Full Name
                                </label>


                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    className="w-full px-4 py-3 border rounded-lg"
                                    placeholder="Enter your name"
                                />

                            </div>




                            <div>

                                <label className="block mb-2 font-semibold">
                                    Email
                                </label>


                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border rounded-lg"
                                    placeholder="Enter email"
                                />


                            </div>




                            <div>

                                <label className="block mb-2 font-semibold">
                                    Password
                                </label>


                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border rounded-lg"
                                    placeholder="Enter password"
                                />


                            </div>



                        </>


                    ) : (


                        <>


                            <div className="bg-green-100 text-green-700 p-3 rounded-lg">

                                OTP sent to your email

                            </div>



                            <input
                                type="text"
                                required
                                value={otp}
                                onChange={(e)=>setOtp(e.target.value)}
                                maxLength="6"
                                placeholder="Enter OTP"
                                className="w-full px-4 py-3 border rounded-lg text-center"
                            />


                        </>


                    )
                }




                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-black"
                >

                    {
                        loading
                        ? "Processing..."
                        : showOTP
                        ? "Verify OTP"
                        : "Register"
                    }


                </button>



            </form>




            {
                !showOTP && (

                    <p className="text-center mt-6">

                        Already have an account?


                        <Link
                            to="/login"
                            className="font-bold ml-2"
                        >
                            Login
                        </Link>


                    </p>

                )
            }



        </div>

    );

};


export default Register;