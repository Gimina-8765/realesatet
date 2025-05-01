import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Companies.css";

const Companies = () => {
  const companies = [
    "./prologis.png",
    "./tower.png",
    "./equinix.png",
    "./realty.png",
    "./prologis.png",
    "./tower.png",  
    "./prologis.png",
    "./tower.png",
    "./equinix.png",
    "./realty.png",
  ];

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 4, // Number of logos visible at a time
    slidesToScroll: 1, // Number of logos to scroll at a time
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Time between slides in milliseconds (3 seconds)
  };

  return (
    <section className="c-wrapper">
      <div className="paddings innerWidth">
        <Slider {...settings} className="c-slider">
          {companies.map((company, index) => (
            <div key={index} className="c-slide">
              <img src={company} alt={`Company ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Companies;
