import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../components/provider/AuthProvider";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const MarathonDetails = () => {
  const campaign = useLoaderData(); // Get marathon details from loader
  const { user } = useContext(AuthContext); // Get logged-in user details
  const [totalRegistrations, setTotalRegistrations] = useState(campaign.registrationCount || 0); // Track total registrations
  const navigate = useNavigate(); // For navigation

  // Calculate the time left until the marathon starts
  const marathonStartDate = new Date(campaign.marathonStartDate).getTime(); // Marathon start timestamp
  const currentTime = new Date().getTime(); // Current timestamp
  const timeLeftInSeconds = Math.max((marathonStartDate - currentTime) / 1000, 0); // Time left in seconds

  // Function to check if registration is open
  const isRegistrationOpen = () => {
    const currentDate = new Date();
    const startDate = new Date(campaign.startRegistrationDate);
    const endDate = new Date(campaign.endRegistrationDate);
    return currentDate >= startDate && currentDate <= endDate;
  };

  useEffect(() => {
    // Optionally fetch updated registration counts from an API
    setTotalRegistrations(campaign.registrationCount || 0); // Initialize with the value from campaign
  }, [campaign]); // Re-run when the campaign changes

  return (
    <div className="p-6 flex flex-col items-center justify-center text-white">
      {/* Marathon Image */}
      <img
        src={campaign.image || "https://via.placeholder.com/600"}
        alt="Campaign"
        className="w-full max-w-3xl h-80 object-cover rounded-lg shadow-md"
      />

      {/* Marathon Title */}
      <h1 className="text-3xl font-bold text-center mt-6">{campaign.title}</h1>

    

      {/* Marathon Details */}
      <div className="mt-6 flex flex-col gap-4 text-left w-full max-w-3xl">
        <p className="text-lg">
          <strong>Location:</strong> {campaign.location || "Not Specified"}
        </p>
        <p className="text-lg">
          <strong>Distance:</strong> {campaign.distance || "Not Specified"}
        </p>
        <p className="text-lg">
          <strong>Minimum Donation:</strong> ${campaign.minimumDonation}
        </p>
        <p className="text-lg">
          <strong>Registration Start:</strong>{" "}
          {campaign.startRegistrationDate
            ? new Date(campaign.startRegistrationDate).toLocaleDateString()
            : "N/A"}
        </p>
        <p className="text-lg">
          <strong>Registration End:</strong>{" "}
          {campaign.endRegistrationDate
            ? new Date(campaign.endRegistrationDate).toLocaleDateString()
            : "N/A"}
        </p>
        <p className="text-lg">
          <strong>Marathon Start Date:</strong>{" "}
          {campaign.marathonStartDate
            ? new Date(campaign.marathonStartDate).toLocaleDateString()
            : "N/A"}
        </p>
        <p className="text-lg">
          <strong>Deadline:</strong>{" "}
          {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : "N/A"}
        </p>
        <p className="text-lg">
          <strong>Creator:</strong> {campaign.userName} ({campaign.userEmail})
        </p>
        <p className="text-lg">
          <strong>Total Registrations:</strong> {totalRegistrations}
        </p>
      </div>
      
       {/* Countdown Timer */}
       <div className="mt-6 flex justify-center items-center">
        <h2 className="text-xl font-bold text-center mb-4">Time Left Until Marathon Starts</h2>
        <CountdownCircleTimer
          isPlaying
          duration={timeLeftInSeconds} // Total time left in seconds
          colors={["#FFFFFF"]} // Circle color matches background
          colorsTime={[timeLeftInSeconds]} // Single color stop
          strokeWidth={0} // Removes circle outline
          onComplete={() => ({ shouldRepeat: false })} // Stops when time ends
        >
          {({ remainingTime }) => {
            const days = Math.floor(remainingTime / (24 * 60 * 60));
            const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
            return (
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {days}d {hours}h {minutes}m
                </div>
                <div className="text-sm text-gray-300">until the marathon starts</div>
              </div>
            );
          }}
        </CountdownCircleTimer>
      </div>

      {/* Register Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => {
            if (!user) {
              Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "You need to log in to register.",
                confirmButtonText: "Login",
              }).then(() => {
                navigate("/login");
              });
              return;
            }
            navigate(`/register/${campaign._id}`); // Redirect to registration page with campaign ID
          }}
          className={`btn px-6 py-2 rounded ${
            isRegistrationOpen()
              ? "bg-customOrange hover:bg-orange-800 border-none text-white"
              : "bg-gray-200 text-white cursor-not-allowed"
          }`}
          disabled={!isRegistrationOpen()}
        >
          {isRegistrationOpen() ? "Register Now" : "Registration Closed"}
        </button>
      </div>
    </div>
  );
};

export default MarathonDetails;




