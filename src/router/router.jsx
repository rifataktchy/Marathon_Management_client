
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
import PrivateRoute from "./PrivateRoute";
  

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
          path: '/createmerathon',
          element : (<PrivateRoute><CreateMarathon></CreateMarathon></PrivateRoute>),
         
      }, 
     
      {
        path: '/allmerathon',
        element : <AllMarathon></AllMarathon>,
        loader: () => fetch('http://localhost:5000/events')
    },
    {
      path: '/merathon/:id',
      element: <MarathonDetails></MarathonDetails>,
      loader: ({ params }) => fetch(`http://localhost:5000/merathon/${params.id}`),
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
  