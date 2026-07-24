import React, { 
    createContext, 
    useState, 
    useEffect 
} from "react";

import api from "../utils/axios";


export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {


    const [user,setUser] = useState(null);

    const [loading,setLoading] = useState(true);






    // Load user when app starts

    useEffect(()=>{


        const storedUser = localStorage.getItem("user");


        const token = localStorage.getItem("token");



        if(storedUser && token){


            setUser(
                JSON.parse(storedUser)
            );


        }



        setLoading(false);



    },[]);









    // REGISTER

    const register = async(userData)=>{


        try{


            const {data} = await api.post(

                "/auth/register",

                userData

            );


            return data;



        }
        catch(error){


            console.log(

                "Register Error:",

                error.response?.data || error.message

            );


            throw error;



        }



    };









    // VERIFY OTP AFTER REGISTER

    const verifyOtp = async(email,otp)=>{


        try{


            const {data} = await api.post(

                "/auth/verify-otp",

                {
                    email,
                    otp
                }

            );




            setUser(data);



            localStorage.setItem(

                "user",

                JSON.stringify(data)

            );



            localStorage.setItem(

                "token",

                data.token

            );



            return data;



        }
        catch(error){


            console.log(

                "OTP Verify Error:",

                error.response?.data || error.message

            );



            throw error;



        }


    };









    // LOGIN

    const login = async(email,password)=>{


        try{


            const {data} = await api.post(

                "/auth/login",

                {
                    email,
                    password
                }

            );




            setUser(data);



            localStorage.setItem(

                "user",

                JSON.stringify(data)

            );



            localStorage.setItem(

                "token",

                data.token

            );



            return data;



        }
        catch(error){


            console.log(

                "Login Error:",

                error.response?.data || error.message

            );


            throw error;



        }



    };









    // LOGOUT

    const logout = ()=>{


        setUser(null);



        localStorage.removeItem(
            "user"
        );


        localStorage.removeItem(
            "token"
        );



    };









    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                register,

                login,

                verifyOtp,

                logout

            }}

        >

            {children}


        </AuthContext.Provider>


    );



};