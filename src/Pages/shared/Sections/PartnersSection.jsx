import React from "react";
import Marquee from "react-fast-marquee";

import logo1 from "../../../assets/img/logoipsum-372.png";
import logo2 from "../../../assets/img/logoipsum-373.png";
import logo4 from "../../../assets/img/logoipsum-375.png";
import logo5 from "../../../assets/img/logoipsum-378.png";
import logo6 from "../../../assets/img/logoipsum-380.png";
import logo8 from "../../../assets/img/logoipsum-382.png";

const PartnersSection = () => {
  const logos = [logo1, logo2, logo4, logo5, logo6, logo8];

  return (
    <div className="bg-orange-50 py-10">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-3xl text-gray-950 font-bold mb-2">Our Partners</h2>
        <p className="text-gray-600 mb-10">
          From software to security, our partners support you with top solutions.
        </p>

        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
          className="flex items-center"
        >
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Logo ${idx + 1}`}
              className="h-10 mx-8 object-contain"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default PartnersSection;
