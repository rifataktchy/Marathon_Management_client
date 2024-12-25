import React, { useState } from "react";

const Faq = () => {
    const [openQuestions, setOpenQuestions] = useState({});

    const toggleQuestion = (index) => {
      setOpenQuestions((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };
  
    const faqs = [
      {
        question: "What is the Marathon Management System?",
        answer:
          "The Marathon Management System is a platform designed to streamline the organization of marathons, including participant registrations, real-time tracking, results management, and event customization.",
      },
      {
        question: "How can I register for a marathon?",
        answer:
          "You can register for a marathon by visiting the 'register' section, selecting your desired event, and completing the registration process online.",
      },
      {
        question: "Are there any fees to use this platform?",
        answer:
          "The platform itself is free.you can join free",
      },
      {
        question: "How can I track my marathon results?",
        answer:
          "Once the marathon is complete, results will be published in the 'My Marathons' section, where you can view rankings and download certificates if applicable.",
      },
    ];
    return (
        <div>
            {/* Extra Section 2: Frequently Asked Questions */}
            <section className="faq-section py-12 text-white">
      <div className="max-w-screen-xl mx-auto px-6 text-white">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-white">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer"
            >
              {/* Question Header */}
              <div
                className="flex justify-between items-center"
                onClick={() => toggleQuestion(index)}
              >
                <h3 className="text-xl font-bold text-white">
                  {faq.question}
                </h3>
                <span className="text-xl text-white">
                  {openQuestions[index] ? "-" : "+"}
                </span>
              </div>
              {/* Answer Section */}
              {openQuestions[index] && (
                <p className="text-white mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

        </div>
    );
};

export default Faq;