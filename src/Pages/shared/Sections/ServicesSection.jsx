import { motion } from "framer-motion";
import service2 from "../../../assets/luke-hodde-Z-UuXG6iaA8-unsplash.jpg";
import service3 from "../../../assets/nathan-anderson-KHSPGJ3zP0M-unsplash.jpg";
import { FiArrowRight } from "react-icons/fi";

const services = [
  {
    image: service2,
    title: "Mobile Repair Services",
    colorStart: "#54595F",
    colorEnd: "#2F343A",
    description: "Get expert help for mobile devices with hardware issues.",
    features: [
      "Screen replacement",
      "Charging port repair",
      "Diagnostic testing",
    ],
    reverse: true,
  },
  {
    image: service3,
    title: "Network Setup Services",
    colorStart: "#6EC1E4",
    colorEnd: "#2A8FD8",
    description: "Professional setup & troubleshooting for your network.",
    features: ["Router installation", "WiFi optimization", "Security setup"],
  },
];

const ServicesSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
      <p className="text-center max-w-2xl mx-auto mb-10 text-gray-600">
        Software development outsourcing is just a tool to achieve business
        goals. But there is no way to get worthwhile results without cooperation
        and trust between a client company.
      </p>

      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`flex flex-col md:flex-row items-stretch gap-6 ${
            service.reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="md:w-1/2 h-full rounded-lg overflow-hidden shadow-md">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>

          <div
            style={{
              background: `linear-gradient(90deg, ${service.colorStart}, ${service.colorEnd})`,
            }}
            className="md:w-1/2 p-8 rounded-lg shadow-inner flex flex-col justify-center space-y-4 text-white text-center md:text-left"
          >
            <h2 className="text-3xl font-bold">{service.title}</h2>
            <p className="text-white/90">{service.description}</p>
            <ul className="list-disc list-inside space-y-1 text-white/80 text-left md:text-left max-w-md mx-auto md:mx-0">
              {service.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="btn btn-primary w-max mx-auto md:mx-0">
             See More <FiArrowRight />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServicesSection;
