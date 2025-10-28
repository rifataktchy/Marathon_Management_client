import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import ChatAssistant from '../components/ChatAssistant';
import { AuthContext } from "../components/provider/AuthProvider";
import { useContext } from "react";


const HomeLayout = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className=''>
            <div className='sticky top-0 z-10'><Navbar></Navbar></div>
            <div className='w-11/12 mx-auto'>
            <Outlet></Outlet> 
      
            </div>
             {/* Render ChatAssistant only if user is logged in */}
             {user?.email && <ChatAssistant userEmail={user.email} />}

            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;