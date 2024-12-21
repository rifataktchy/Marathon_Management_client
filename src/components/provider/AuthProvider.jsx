import { createContext, useEffect, useState } from "react";
import app from "../../firebase/firebase.init";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create a new user
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login with email and password
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Sign-In
    const googleSignIn = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // Log out the user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Update user profile
    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    // Track authenticated user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // Auth context value
    const authInfo = {
        user,
        setUser,
        createNewUser,
        logOut,
        userLogin,
        googleSignIn, 
        loading,
        updateUserProfile
    };
    console.log(user)

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;