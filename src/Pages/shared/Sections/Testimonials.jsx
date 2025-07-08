const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahim Uddin",
      role: "Software Engineer",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      feedback:
        "The mobile repair service was fantastic. My phone works like new!",
    },
    {
      name: "Fatema Begum",
      role: "Entrepreneur",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      feedback:
        "Quick and reliable network setup. Highly recommend their team.",
    },
    {
      name: "Jamal Khan",
      role: "Freelancer",
      photo: "https://randomuser.me/api/portraits/men/56.jpg",
      feedback:
        "Affordable prices and great customer service. Will use again!",
    },
  ];

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
      <div className="space-y-8">
        {testimonials.map(({ name, role, photo, feedback }, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto transition-transform hover:scale-105 hover:shadow-xl"
          >
            <p className="text-gray-700 italic mb-4 relative before:content-['“'] before:absolute before:-left-4 before:text-4xl before:text-gray-300 before:top-0">
              {feedback}
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={photo}
                alt={name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
