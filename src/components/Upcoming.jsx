import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const staticMarathons = [
  {
    id: 1,
    title: "City Run 2024",
    location: "New York City",
    date: "2024-01-15",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 2,
    title: "Beach Marathon",
    location: "Santa Monica",
    date: "2024-02-10",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 3,
    title: "Spring Marathon",
    location: "Chicago",
    date: "2024-03-25",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 4,
    title: "Night Run",
    location: "Las Vegas",
    date: "2024-04-05",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 5,
    title: "Mountain Challenge",
    location: "Denver",
    date: "2024-05-15",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 6,
    title: "Desert Dash",
    location: "Phoenix",
    date: "2024-06-20",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 7,
    title: "Golden Gate Run",
    location: "San Francisco",
    date: "2024-07-10",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 8,
    title: "Capital Marathon",
    location: "Washington D.C.",
    date: "2024-08-15",
    image: "https://via.placeholder.com/400",
  },
];

const shuffleAndSelect = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Upcoming = () => {
  const selectedMarathons = shuffleAndSelect(staticMarathons, 6);

  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of cards visible at once
    slidesToScroll: 1,
    autoplay: true, // Enables auto sliding
    autoplaySpeed: 1000, // Time (in ms) between each slide
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
    <section className="upcoming-marathons  py-12">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Upcoming Marathons
        </h2>

        {/* Slider Component */}
        <Slider {...settings}>
          {selectedMarathons.map((marathon) => (
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
                  <h3 className="text-xl font-bold text-gray-800">
                    {marathon.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <strong>Location:</strong> {marathon.location}
                  </p>
                  <p className="text-gray-600 mt-2">
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

