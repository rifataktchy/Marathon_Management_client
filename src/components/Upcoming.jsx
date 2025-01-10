import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const shuffleAndSelect = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Upcoming = () => {
  const [marathons, setMarathons] = useState([]);

  useEffect(() => {
    // Fetch the marathon data from the JSON file
    const fetchMarathons = async () => {
      try {
        const response = await fetch("/marathons.json"); // Adjust the path if necessary
        const data = await response.json();
        setMarathons(shuffleAndSelect(data, 6)); // Shuffle and select 6 marathons
      } catch (error) {
        console.error("Error fetching marathon data:", error);
      }
    };

    fetchMarathons();
  }, []);

  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="upcoming-marathons py-12 text-white">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Upcoming Marathons
        </h2>

        {/* Slider Component */}
        <Slider {...settings}>
          {marathons.map((marathon) => (
            <div key={marathon.id} className="p-2">
              <div className="card shadow-md rounded-lg overflow-hidden border border-gray-300 hover:shadow-lg">
                {/* Image */}
                <img
                  src={marathon.image}
                  alt={marathon.title}
                  className="w-full h-48 object-cover"
                />

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-xl font-bold ">
                    {marathon.title}
                  </h3>
                  <p className=" mt-2">
                    <strong>Location:</strong> {marathon.location}
                  </p>
                  <p className=" mt-2">
                    <strong>Date:</strong>{" "}
                    {new Date(marathon.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Upcoming;


