import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllMerathon = () => {
    const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all marathons from the backend
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => {
        setMarathons(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching marathons:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  }

    return (
        <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Marathons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marathons.map((marathon) => (
          <div
            key={marathon._id}
            className="card bg-base-100 shadow-md rounded-lg overflow-hidden"
          >
            {/* Marathon Image */}
            <img
              src={marathon.image}
              alt={marathon.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              {/* Marathon Title */}
              <h2 className="text-lg font-bold mb-2">{marathon.title}</h2>
              {/* Marathon Location */}
              <p className="text-sm text-gray-600 mb-2">
                Location: {marathon.location}
              </p>
              {/* Registration Dates */}
              <p className="text-sm text-gray-600 mb-2">
                Registration: {marathon.startRegistrationDate} -{" "}
                {marathon.endRegistrationDate}
              </p>
              {/* See Details Button */}
              <button
                onClick={() => navigate(`/marathons/${marathon._id}`)}
                className="btn btn-primary mt-4"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default AllMerathon;