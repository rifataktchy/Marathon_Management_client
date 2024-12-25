
import {
    createBrowserRouter,
   
  } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Pages/Login";
import Register from "../components/Pages/Register";
import CreateMarathon from "../components/Pages/CreateMarathon";
import AllMarathon from "../components/Pages/AllMerathon";
import MarathonDetails from "../components/Pages/MarathonDetails";
import RegistrationForm from "../components/Pages/RegistrationForm";
import PrivateRoute from "./PrivateRoute";
import MyApplyList from "../components/Pages/MyApplyList";
import MyMarathon from "../components/Pages/MyMarathon";
import Dashboard from "../components/Pages/Dashboard";
  

  const router = createBrowserRouter([
    {
      path: '/',
      element : <HomeLayout></HomeLayout>,
      children: [
          {
               path: '/',
              element : <Home></Home>
              // loader: () => fetch('https://merathon-server.vercel.app/sixevents')
       },
       {
          path: '/createmerathon',
          element : (<PrivateRoute><CreateMarathon></CreateMarathon></PrivateRoute>),
         
      }, 
     
      {
        path: '/allmerathon',
        element : <AllMarathon></AllMarathon>,
        loader: () => fetch('https://merathon-server.vercel.app/events')
    },
    {
      path: '/merathon/:id',
      element: (<PrivateRoute><MarathonDetails></MarathonDetails></PrivateRoute>),
      loader: ({ params }) => fetch(`https://merathon-server.vercel.app/merathon/${params.id}`),
  },
  {
    path: "/register/:id",
    element: <RegistrationForm></RegistrationForm>,
    loader: ({ params }) => fetch(`https://merathon-server.vercel.app/merathon/${params.id}`),
  },
  {
    path: "/register",
    element: (<PrivateRoute><MyApplyList></MyApplyList></PrivateRoute>),
   
  },
  {
    path: "/dashboard",
    element: (<PrivateRoute><Dashboard></Dashboard></PrivateRoute>),
   
  },
  {
    path: "/mymerathon",
    element: (<PrivateRoute><MyMarathon></MyMarathon></PrivateRoute>),
   
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
  