import React, { createContext, useState, useEffect } from "react";
import api from "../utils/axios";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);

  }, []);



  const register = async (userData) => {

    try {

      const { data } = await api.post(
        "/auth/register",
        userData
      );

      return data;

    } catch (error) {

      console.error(
        "Register error:",
        error.response?.data || error.message
      );

      throw error;

    }

  };




  const verifyOtp = async (email, otp) => {

    try {

      const { data } = await api.post(
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


    } catch(error) {

      console.error(
        "OTP error:",
        error.response?.data || error.message
      );

      throw error;

    }

  };




  const login = async (email, password) => {

    try {

      const { data } = await api.post(
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


    } catch(error) {

      console.error(
        "Login error:",
        error.response?.data || error.message
      );

      throw error;

    }

  };




  const logout = () => {

    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

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