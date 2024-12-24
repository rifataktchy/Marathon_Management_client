import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
    const { userLogin, setUser } = useContext(AuthContext);
    const [error, setError] = useState({});
    const emailRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);

                // Update last login time
                const lastSignInTime = result?.user?.metadata?.lastSignInTime;
                const loginInfo = { email, lastSignInTime };

                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => console.log(res.data))

                // fetch(`https://crowdcube-server-eight.vercel.app/users`, {
                //     method: "PATCH",
                //     headers: {
                //         "content-type": "application/json",
                //     },
                //     body: JSON.stringify(loginInfo),
                // })
                //     .then((res) => res.json())
                //     .then((data) => {
                //         console.log("Sign-in info updated in DB", data);
                //     });

                navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
                setError({ ...error, login: err.code });

                // SweetAlert2 error alert
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: `Reason: ${err.message}`,
                    confirmButtonColor: "#FF0000", // Custom color for button
                });
            });
    };

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user);

                navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
                setError({ ...error, google: err.message });

                // SweetAlert2 popup for error
                Swal.fire({
                    icon: "error",
                    title: "Google Sign-In Failed",
                    text: `Reason: ${err.message}`,
                    confirmButtonColor: "#FF0000",
                });
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl p-10 mb-6">
                <h1 className="text-2xl font-bold text-center pt-2">Login to account</h1>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            ref={emailRef}
                            placeholder="email"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            required
                        />
                        {error.login && (
                            <label className="label text-sm text-red-600">{error.login}</label>
                        )}
                        <label className="label">
                            <Link
                                to={`/auth/forgot-password?email=${emailRef.current?.value || ""}`}
                                className="label-text-alt link link-hover"
                            >
                                Forgot password?
                            </Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-green-500 hover:bg-green-400 text-white">
                            Login
                        </button>
                    </div>
                </form>
                <div className="divider">OR</div>
                <div className="form-control">
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn  bg-green-500 hover:bg-green-400 text-white"
                    >
                        Continue with Google
                    </button>
                </div>
                <p className="text-center font-semibold mt-4 dark:text-black">
                    Don't have an account?{" "}
                    <Link className="text-red-500" to="/auth/register">
                        Register
                    </Link>
                </p>
                {error.google && <p className="text-sm text-red-500 text-center mt-2">{error.google}</p>}
            </div>
        </div>
    );
};

export default Login;

