import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
           <Outlet></Outlet> 
           <Footer></Footer>
        </div>
    );
};

export default HomeLayout;