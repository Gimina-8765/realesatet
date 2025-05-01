import React, { useContext, useEffect } from "react"; // Added useEffect import
import {  Outlet } from "react-router-dom"; // Import Outlet for nested routes
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import UserDetailContext from "../../context/UserDetailContext";
import useFavourites from "../../hooks/useFavourites";
import Chatbot from "../Chatbot/Chatbot";

const Layout = () => {

useFavourites();

  const { isAuthenticated, user, getAccessTokenWithPopup} = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email,token),
  });

  useEffect(() => {
    const getTokenAndRegsiter = async () => {

      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
        },
      });
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      mutate(res)
    };
    
    isAuthenticated && getTokenAndRegsiter();
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        {/* Render child routes here */}
        <Outlet />
        
      </div>
      <Footer />
      <Chatbot /> {/* Add Chatbot here */}
    </>
  );
};

export default Layout;