import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // npm install react-slick slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css"; // Import animate.css
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";
import marathonImage from "../../assets/marathon.png"; // Replace with your image path
import Loading from "./Loading";
import Upcoming from "../Upcoming";

const Home = () => {
  const [animateImage, setAnimateImage] = useState(false);
  const [loadedCampaigns, setLoadedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Trigger animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateImage(true);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Fetch the events/campaigns data from the backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('https://merathon-server.vercel.app/events'); // Make sure this matches the backend route
        const data = await response.json();
        setLoadedCampaigns(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div className="home">
      {/* Banner / Slider */}
      <section className="banner mb-12">
        <Slider {...sliderSettings}>
          <div className="relative">
            <img
              src={slide1}
              alt="Slide 1"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 px-8">
              <h2 className="text-white text-3xl font-bold mb-2">
                Support Innovative Projects
              </h2>
              <p className="text-white text-lg">
                Join campaigns to for creative ideas and impactful causes.
              </p>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="relative">
            <img
              src={slide2}
              alt="Slide 2"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 px-8">
              <h2 className="text-white text-3xl font-bold mb-2">
                Innovating Together
              </h2>
              <p className="text-white text-lg">
                Join us and be a part of the movement to support innovative ideas.
              </p>
            </div>
          </div>
          {/* Slide 3 */}
          <div className="relative">
            <img
              src={slide3}
              alt="Slide 3"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 px-8">
              <h2 className="text-white text-3xl font-bold mb-2">
                Empowering Change for marathon projects
              </h2>
              <p className="text-white text-lg">
                Support impactful causes and make a difference.
              </p>
            </div>
          </div>
        </Slider>
      </section>

      {/* Running Campaign Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 bg-black">
  {loading ? (
    <Loading />
  ) : (
    // Slice the first 6 campaigns
    loadedCampaigns.slice(0, 6).map((campaign) => (
      <div
        key={campaign._id}
        className="card  shadow-md rounded-lg overflow-hidden border border-gray-700 hover:shadow-lg"
      >
        {/* Marathon Image */}
        <img
          src={campaign.image || "https://via.placeholder.com/400"} // Fallback image
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />

        {/* Marathon Information */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{campaign.title}</h2>
          <p className="text-gray-600 mt-2">
            <strong>Location:</strong> {campaign.location || "N/A"}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Registration Start:</strong>{" "}
            {campaign.startRegistrationDate
              ? new Date(campaign.startRegistrationDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Registration End:</strong>{" "}
            {campaign.endRegistrationDate
              ? new Date(campaign.endRegistrationDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Actions */}
        <div className="p-4 border-t">
          <Link to={`/merathon/${campaign._id}`}>
            <button className="btn bg-customOrange hover:bg-orange-800 border-none text-white w-full rounded px-4 py-2">
              See More
            </button>
          </Link>
        </div>
      </div>
    ))
  )}
</div>

{/* Extra Section 1: Marathon Management System */}
<section className="marathon-section  py-12">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Image */}
          <div
            className={`${
              animateImage
                ? "animate__animated animate__slideInLeft"
                : "opacity-0"
            }`}
          >
            <img
              src={marathonImage}
              alt="Marathon Management"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Right: Text */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Marathon Management System
            </h2>
            <p className="text-gray-600 text-lg">
              Efficiently organize and manage marathons with our cutting-edge
              system. From participant registrations to real-time tracking and
              results, we've got you covered.
            </p>
            <ul className=" pl-5 text-gray-600 ">
              <li className="animate__animated animate__fadeInLeft animate__delay-1s">Streamlined registration process</li>
              <li className="animate__animated animate__fadeInLeft animate__delay-2s">Real-time participant tracking</li>
              <li className="animate__animated animate__fadeInLeft animate__delay-3s">Automated results and rankings</li>
              <li className="animate__animated animate__fadeInLeft animate__delay-4s">Customizable event setup</li>
            </ul>
            <Link
              to="/allmerathon"
              className="inline-block mt-4 bg-customOrange text-white py-2 px-6 rounded-lg shadow-md hover:bg-orange-800"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

{/* Upcoming marathon Section */}
<Upcoming></Upcoming>

    </div>
  );
};

export default Home;
