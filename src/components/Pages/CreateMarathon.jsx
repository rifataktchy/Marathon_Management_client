import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider"; // Adjust the path based on your project structure
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateMarathon = () => {
    const { user } = useContext(AuthContext); // Access the authenticated user
    const navigate = useNavigate();
  
    const [startRegistrationDate, setStartRegistrationDate] = useState(new Date());
    const [endRegistrationDate, setEndRegistrationDate] = useState(new Date());
    const [marathonStartDate, setMarathonStartDate] = useState(new Date());
    const [error, setError] = useState("");
  
    const handleAddMarathon = (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
  
      const title = form.get("title");
      const location = form.get("location");
      const distance = form.get("distance");
      const description = form.get("description");
      const image = form.get("image");
  
      const newMarathon = {
        title,
        startRegistrationDate,
        endRegistrationDate,
        marathonStartDate,
        location,
        distance,
        description,
        image,
        createdAt: new Date(), // Automatically set the creation date
        totalRegistrations: 0, // Initial registration count is 0
        userEmail: user?.email,
        userName: user?.displayName,
      };
  
      // Save the marathon data to the database
      fetch("https://merathon-server.vercel.app/events", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newMarathon),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Marathon Added!",
              text: "Your marathon has been successfully added.",
            }).then(() => {
              navigate("/"); // Redirect to home after successful creation
            });
          }
        })
        .catch((err) => {
          setError(err.message);
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: `An error occurred: ${err.message}`,
          });
        });
    };
  
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="card bg-orange-300 w-full max-w-lg shadow-2xl p-10 mb-6">
          <h1 className="text-2xl font-bold text-center dark:text-black">Add New Marathon</h1>
          <form onSubmit={handleAddMarathon} className="card-body dark:text-black">
            {/* Marathon Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Marathon Title</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Marathon Title"
                className="input input-bordered"
                required
              />
            </div>
  
            {/* Start Registration Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Start Registration Date</span>
              </label>
              <DatePicker
                selected={startRegistrationDate}
                onChange={(date) => setStartRegistrationDate(date)}
                dateFormat="yyyy-MM-dd"
                className="input input-bordered"
                required
              />
            </div>
  
            {/* End Registration Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">End Registration Date</span>
              </label>
              <DatePicker
                selected={endRegistrationDate}
                onChange={(date) => setEndRegistrationDate(date)}
                dateFormat="yyyy-MM-dd"
                className="input input-bordered"
                required
              />
            </div>
  
            {/* Marathon Start Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Marathon Start Date</span>
              </label>
              <DatePicker
                selected={marathonStartDate}
                onChange={(date) => setMarathonStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="input input-bordered"
                required
              />
            </div>
  
            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                name="location"
                type="text"
                placeholder="Marathon Location"
                className="input input-bordered"
                required
              />
            </div>
  
            {/* Running Distance */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Running Distance</span>
              </label>
              <select name="distance" className="select select-bordered" required>
                <option value="">Select Distance</option>
                <option value="25k">25k</option>
                <option value="10k">10k</option>
                <option value="3k">3k</option>
              </select>
            </div>
  
            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Write about the marathon..."
                className="textarea textarea-bordered"
                required
              ></textarea>
            </div>
  
            {/* Marathon Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Marathon Image</span>
              </label>
              <input
                name="image"
                type="text"
                placeholder="Image URL"
                className="input input-bordered"
                required
              />
            </div>
  
            {/* User Email (Read Only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Email</span>
              </label>
              <input
                name="userEmail"
                type="email"
                value={user?.email || ""}
                className="input input-bordered"
                readOnly
              />
            </div>
  
            {/* User Name (Read Only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                name="userName"
                type="text"
                value={user?.displayName || ""}
                className="input input-bordered"
                readOnly
              />
            </div>
  
            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-bred-300 hover:bg-blue-400 text-white">
                Submit
              </button>
            </div>
          </form>
  
          {/* Error Message */}
          {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
        </div>
      </div>
    );
  };
export default CreateMarathon;