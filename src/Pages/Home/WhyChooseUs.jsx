// WhyChooseUs.jsx
import React from "react";

const WhyChooseUs = () => {
  const points = [
    {
      icon: "🚀",
      title: "Fast & Reliable",
      desc: "We provide quick solutions without compromising quality.",
    },
    {
      icon: "🔧",
      title: "Expert Technicians",
      desc: "Certified professionals ready to fix any issue.",
    },
    {
      icon: "💰",
      title: "Affordable Pricing",
      desc: "Competitive prices with transparent billing.",
    },
    {
      icon: "📞",
      title: "24/7 Support",
      desc: "We are available anytime to assist you.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6 text-center max-w-7xl mx-auto rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-[#54595F] mb-8">Why Choose Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {points.map(({ icon, title, desc }, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-[#54595F] mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
