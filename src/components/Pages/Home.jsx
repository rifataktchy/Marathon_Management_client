import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // npm install react-slick slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css"; // Import animate.css
import slide1 from "../../assets/slide1.jpg";
import marathonImage from "../../assets/marathon.png"; // Replace with your image path

const Home = () => {
  const [animateImage, setAnimateImage] = useState(false);

  // Trigger animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateImage(true);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
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
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 px-8">
              <h2 className="text-white text-3xl font-bold mb-2">
                Support Innovative Projects
              </h2>
              <p className="text-white text-lg">
                Join campaigns to fund creative ideas and impactful causes.
              </p>
            </div>
          </div>
        </Slider>
      </section>

      {/* Extra Section 1: Marathon Management System */}
      <section className="marathon-section bg-gray-100 py-12">
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
            <ul className="list-disc pl-5 text-gray-600">
              <li>Streamlined registration process</li>
              <li>Real-time participant tracking</li>
              <li>Automated results and rankings</li>
              <li>Customizable event setup</li>
            </ul>
            <Link
              to="/marathon"
              className="inline-block mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Running Campaign Section */}
      {/* Placeholder for future sections */}
    </div>
  );
};

export default Home;

