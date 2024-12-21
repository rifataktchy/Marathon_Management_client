import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, getAuth, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const { createNewUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photoURL = form.get("photo"); // Added photo URL

    // Password validation
    if (!/[A-Z]/.test(password)) {
        setPasswordError("Password must have at least one uppercase letter.");
        return;
      }
      if (!/[a-z]/.test(password)) {
        setPasswordError("Password must have at least one lowercase letter.");
        return;
      }
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters long.");
        return;
      }

    setPasswordError(""); // Clear password error if validation passes

    // Create new user
    createNewUser(email, password)
      .then((result) => {
    
        const createdAt = result?.user?.metadata?.creationTime;

        const newUser = { name, email, createdAt };
        

        // Save new user info to the database
        fetch('https://crowdcube-server-eight.vercel.app/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            // Update the user's displayName and photoURL in Firebase after creation
            const user = result.user;
            updateProfile(user, {
              displayName: name,  // Set display name from the form input
              photoURL: photoURL, // Set photo URL from the form input (optional)
            })
              .then(() => {
                console.log("User profile updated successfully");
                Swal.fire({
                  icon: "success",
                  title: "Registration Successful",
                  text: "You have successfully registered! Redirecting to home.",
                }).then(() => {
                  navigate("/"); // Redirect to home on successful registration
                });
              })
              .catch((error) => {
                console.error("Error updating profile: ", error);
                Swal.fire({
                  icon: "error",
                  title: "Profile Update Failed",
                  text: error.message,
                });
              });
          })
          .catch((err) => {
            setError(err.message);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: err.message,
            });
          });
      })
      .catch((error) => {
        console.log('Error creating user:', error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
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

        Swal.fire({
          icon: "success",
          title: "Google Sign-In Successful",
          text: "You have signed in successfully with Google!",
        }).then(() => {
          navigate("/"); // Redirect after successful Google sign-in
        });
      })
      .catch((err) => {
        setError({ ...error, google: err.message });
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: `Reason: ${err.message}`,
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl p-10 mb-6">
        <h1 className="text-2xl font-bold text-center">Register to account</h1>
        <form onSubmit={handleSubmit} className="card-body">
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input name="name" type="text" placeholder="Name" className="input input-bordered" required />
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
          </div>

          {/* Photo URL Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input name="photo" type="text" placeholder="Photo URL" className="input input-bordered" />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered"
              required
            />
            {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-green-500 hover:bg-green-400 text-white">
              Register
            </button>
          </div>
        </form>

        {/* General Error Message */}
        {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}

        {/* Google Sign-in Button */}
        <div className="divider">OR</div>
        <div className="form-control">
          <button onClick={handleGoogleSignIn} className="btn  bg-green-500 hover:bg-green-400 text-white">
            Continue with Google
          </button>
        </div>

        <p className="text-center font-semibold mt-4 dark:text-black">
          Already have an account?{" "}
          <Link className="text-red-500" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;



