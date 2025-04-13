import { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('YOUR_SERVICE_ID', 'template_pgjih8z', e.target, 'YOUR_USER_ID')
      .then(
        (result) => {
          console.log(result.text);
          alert('Message sent successfully!');
        },
        (error) => {
          console.log(error.text);
          alert('Error sending message!');
        }
      );
  };

  useEffect(() => {
    const aboutSection = document.querySelector('.about');
    const servicesSection = document.querySelector('.services');

    const handleScroll = () => {
      if (aboutSection && servicesSection) {
        const aboutOffset = aboutSection.getBoundingClientRect().top;
        const servicesOffset = servicesSection.getBoundingClientRect().top;

        if (aboutOffset < window.innerHeight * 0.75) {
          aboutSection.style.opacity = 1;
        }

        if (servicesOffset < window.innerHeight * 0.75) {
          servicesSection.style.opacity = 1;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}

      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold">SKS Interior</div>

        {/* Hamburger Icon */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          ☰
        </div>

        {/* Nav Links */}
        <ul
          className={`flex flex-col md:flex-row md:items-center gap-6 
      absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent px-6 py-4 
      transition-all duration-300 ease-in-out
      ${menuOpen ? 'block' : 'hidden'} md:flex`}
        >
          {['About', 'Services', 'Portfolio', 'Testimonials', 'Contact'].map(
            (item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
      {/* Hero */}
      <header className="h-[60vh] bg-cover bg-center bg-[url('/batman.jpg')] flex items-center justify-center text-center text-white">
        <div className="bg-black bg-opacity-50 p-6 rounded">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SKS Interior Design Studio</h1>
          <p className="text-lg md:text-xl">
            Transforming spaces with style, precision, and purpose.
          </p>
        </div>
      </header>

      {/* About */}
      <section
        id="about"
        className="max-w-4xl mx-auto py-16 px-6 about opacity-0 transition-opacity duration-700"
      >
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p>
          At SKS Interior, we craft elegant and functional spaces tailored to
          your lifestyle. With a keen eye for detail and a passion for design,
          our team ensures every project is flawlessly executed.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <ul className="space-y-4 text-lg">
          <li>🌟 10+ Years of Combined Design Experience</li>
          <li>✅ Fully Customized Interior Solutions</li>
          <li>🚀 Timely Project Delivery</li>
          <li>🎯 3D Visualization & Professional Team</li>
        </ul>
      </section>

      {/* Services */}
      <section
        id="services"
        className="max-w-4xl mx-auto py-16 px-6 services opacity-0 transition-opacity duration-700"
      >
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <ul className="space-y-4 text-lg">
          <li>✅ Residential & Commercial Interior Design</li>
          <li>✅ Turnkey Projects</li>
          <li>✅ Modular Furniture & 3D Visualization</li>
          <li>✅ Renovation & Space Optimization</li>
        </ul>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {['Living Room', 'Office Space', 'Bedroom', 'Kitchen'].map(
            (title, index) => (
              <div
                className="bg-white shadow rounded overflow-hidden text-center"
                key={index}
              >
                <img
                  src="ht.jpg"
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-gray-600">
                    Sample description of {title.toLowerCase()} design.
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            'Amazing work! Very professional and timely.',
            'The design exceeded our expectations. Highly recommended!',
            'Their attention to detail is fantastic. Great experience!',
          ].map((quote, i) => (
            <div key={i} className="bg-white shadow rounded p-6">
              <p className="italic">"{quote}"</p>
              <h4 className="mt-4 font-semibold">- Client Name</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 text-center px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="mb-6">
            Contact us today for a free consultation and let’s bring your vision
            to life!
          </p>
          <a
            href="#contact"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <div className="text-center mb-6 space-y-2">
          <p>📍 Pune, Maharashtra</p>
          <p>📞 +91-9876543210</p>
          <p>
            📷{' '}
            <a
              href="https://instagram.com/yourfirmpage"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              View Our Work on Instagram
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 h-32"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center mt-10">
        <p>© {new Date().getFullYear()} SKS Interior. All rights reserved.</p>
      </footer>
    </div>
  );
}
