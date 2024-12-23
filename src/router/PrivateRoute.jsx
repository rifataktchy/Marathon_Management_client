import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../components/provider/AuthProvider';
import { useContext } from 'react';
import Loading from '../components/Pages/Loading';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
      return children;
    }
     return <Navigate state={location.pathname} to={'/auth/login'}></Navigate>
};

export default PrivateRoute;