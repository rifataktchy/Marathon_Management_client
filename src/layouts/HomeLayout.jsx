import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <div className=''>
            <div className='sticky top-0 z-10'><Navbar></Navbar></div>
            <div className='w-11/12 mx-auto'>
            <Outlet></Outlet> 
      
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;