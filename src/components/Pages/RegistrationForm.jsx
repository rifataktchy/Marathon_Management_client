import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../components/provider/AuthProvider";
import Swal from "sweetalert2";

const RegistrationForm = () => {
  const { user } = useContext(AuthContext); // Logged-in user context
  const marathon = useLoaderData();
  console.log(marathon) // Fetch marathon details using loader
  const navigate = useNavigate(); // For navigation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    additionalInfo: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.contactNumber) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all the required fields.",
      });
      return;
    }

    const registrationData = {
      email: user.email,
      marathonId: marathon._id,
      title: marathon.title,
      startDate: marathon.startRegistrationDate,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactNumber: formData.contactNumber,
      additionalInfo: formData.additionalInfo,
    };

    // Save registration details in the database
    fetch("https://merathon-server.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Registration successful
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text: "Your registration has been recorded!",
            });
      
            // Navigate to My Apply page after successful registration
            navigate("/dashboard");
          } else {
            // Handle registration failure from the backend
            Swal.fire({
              icon: "error",
              title: "Registration Failed",
              text: data.message || "Please try again.",
            });
          }
        })
        .catch((error) => {
          // Handle network or server errors
          console.error("Error during registration:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Unable to register. Please try again later.",
          });
        });
    }

  return (
    <div className="p-6 max-w-lg mx-auto text-white">
      <h1 className="text-3xl font-bold text-center mb-4">Register for Marathon</h1>

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        {/* Email (Read-only) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Marathon Title (Read-only) */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Marathon Title
          </label>
          <input
            id="title"
            type="text"
            value={marathon.title}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Marathon Start Date (Read-only) */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            id="startDate"
            type="text"
            value={new Date(marathon.startRegistrationDate).toLocaleDateString()}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Contact Number */}
        <div>
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            id="contactNumber"
            type="text"
            placeholder="Enter your contact number"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Additional Info */}
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
            Additional Info (Optional)
          </label>
          <textarea
            id="additionalInfo"
            placeholder="Provide any additional information"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn  bg-customOrange hover:bg-orange-800 border-none w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
