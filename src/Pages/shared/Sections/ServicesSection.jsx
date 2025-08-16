// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import service2 from "../../../assets/luke-hodde-Z-UuXG6iaA8-unsplash.jpg";
import service3 from "../../../assets/nathan-anderson-KHSPGJ3zP0M-unsplash.jpg";

const services = [
  {
    image: service2,
    title: "Mobile Repair Services",
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
    description: "Professional setup & troubleshooting for your network.",
    features: ["Router installation", "WiFi optimization", "Security setup"],
  },
];

const ServicesSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16 bg-gray-50  transition-colors">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-gray-800 mb-6">
        Our Services
      </h2>
      <p className="text-center max-w-2xl mx-auto mb-10 text-gray-700 dark:text-gray-500">
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
          {/* Image */}
          <div className="md:w-1/2 h-64 md:h-auto rounded-lg overflow-hidden shadow-md">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>

          {/* Content */}
          <div
            style={{
              background: `linear-gradient(90deg, ${service.colorStart}, ${service.colorEnd})`,
            }}
            className="md:w-1/2 p-6 sm:p-8 rounded-lg shadow-inner flex flex-col justify-center space-y-4 text-white text-center md:text-left"
          >
            <h2 className="text-2xl sm:text-3xl text-black font-bold">{service.title}</h2>
            <p className="text-black">{service.description}</p>
            <ul className="list-disc list-inside space-y-1 text-black text-left max-w-md mx-auto md:mx-0">
              {service.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServicesSection;
