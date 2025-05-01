import React, { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick"; // Import React-Slick
import "./AboutUs.css"; // Add styles for the page
import Map from "../../components/Map/Map";
import SearchBar from "../../components/SearchBar/SreachBar";

const AboutUs = () => {
  const [filter, setFilter] = useState("");

  const handleSearch = (query) => {
    console.log("Search query:", query);
    setFilter(query); // Update the filter state
  };

  return (
    <div className="about-us-page">
      {/* Section 1: Title */}
      <section className="about-us-title">
        <motion.h1
          initial={{ y: "2rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 2,
            type: "ease-in",
          }}
        >
          About Us
        </motion.h1>
        <p className="about-us-subtitle">
          Learn more about our real estate services and values.
        </p>
        {/* Search Bar Section */}
        <div className="search-bar-container">
          <SearchBar filter={filter} setFilter={setFilter} />
        </div>
      </section>

      {/* Section 2: About Us Details */}
      <section className="about-us-details">
        <div className="details-container">
          {/* Left Side: Image */}
          <motion.div
            className="about-us-image"
            initial={{ x: "-2rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              type: "ease-in-out",
            }}
          >
            <img
              src="./Aboutus.webp"
              alt="About Us"
              className="rounded-top-image"
            />
          </motion.div>

          {/* Right Side: Information */}
          <motion.div
            className="about-us-info"
            initial={{ x: "2rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              type: "ease-in-out",
            }}
          >
            <h2>Who We Are</h2>
            <p>
              We are a leading real estate company dedicated to helping you find
              your dream home. With years of experience, we provide top-notch
              services to ensure your satisfaction.
            </p>
            <ul>
              <li>Prime locations across the country</li>
              <li>Affordable pricing tailored to your budget</li>
              <li>Trusted by thousands of satisfied customers</li>
              <li>24/7 customer support for all your needs</li>
              <li>Expert real estate agents with years of experience</li>
            </ul>
            <p>
              Our mission is to make your property search seamless and enjoyable. We
              believe in transparency, trust, and delivering exceptional value to our
              clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Customer Reviews */}
      <section className="customer-reviews">
        <h2>What Our Customers Say</h2>
        <Slider
          className="reviews-slider"
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={3}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
        >
          {[
            {
              id: 1,
              name: "John Doe",
              review: "Amazing service! Found my dream home with ease. Highly recommend!",
              rating: 5,
              image: "p1.jpeg",
            },
            {
              id: 2,
              name: "Jane Smith",
              review: "Great experience! The team was very professional and helpful.",
              rating: 4,
              image: "p2.jpeg",
            },
            {
              id: 3,
              name: "Michael Brown",
              review: "The process was smooth and stress-free. Highly satisfied!",
              rating: 5,
              image: "p3.jpeg",
            },
            {
              id: 4,
              name: "Emily Davis",
              review: "Affordable pricing and excellent customer service. Thank you!",
              rating: 4,
              image: "p4.jpeg",
            },
            {
              id: 5,
              name: "Chris Wilson",
              review: "Prime locations and great options. Highly recommend this company!",
              rating: 5,
              image: "p5.jpeg",
            },
            {
              id: 6,
              name: "Sophia Johnson",
              review: "The team was very responsive and helpful throughout the process.",
              rating: 4,
              image: "p6.jpeg",
            },
          ].map((customer) => (
            <div className="review-card" key={customer.id}>
              <img
                src={customer.image}
                alt={`Customer ${customer.name}`}
                className="customer-image"
              />
              <h4>{customer.name}</h4>
              <p>{customer.review}</p>
              <div className="rating">
                {[...Array(5)].map((_, starIndex) => (
                  <span
                    key={starIndex}
                    className={starIndex < customer.rating ? "filled-star" : "empty-star"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Section 4: Live Map */}
      <section className="live-map">
        <h2>Our Locations</h2>
        <Map address="Street 12" city="Delhi" country="India" />
      </section>
    </div>
  );
};

export default AboutUs;