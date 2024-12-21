
import {
    createBrowserRouter,
   
  } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Pages/Login";
import Register from "../components/Pages/Register";
  

  const router = createBrowserRouter([
    {
      path: '/',
      element : <HomeLayout></HomeLayout>,
      children: [
          {
               path: '/',
              element : <Home></Home>
       },
       {
          path: '/allcampaigns',
          element : <h1>hello</h1>
         
      }, 
     
      
       {
          path: 'auth',
          element : <AuthLayout></AuthLayout>,
          children: [
              {
                  path: '/auth/login',
                  element : <Login></Login>
              }, 
              {
                  path: '/auth/register',
                  element : <Register></Register>
              } ,
           
          ],
      },
      ],
  },
  
  {
      path: '*',
      element : <h1>not</h1>
  },
 
]);
  export default router;
  