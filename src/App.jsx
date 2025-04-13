import { useEffect, useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import {
  FiMenu,
  FiX,
  FiChevronRight,
  FiInstagram,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi';
import DesignThought from './Components/DesignThought';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs
      .sendForm(
        'service_009nii1',
        'template_pgjih8z',
        e.target,
        '2UEoGXpOiYEJA0Y1f'
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.log(error.text);
          setSubmitStatus('error');
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.fade-in-section').forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;

        if (isVisible) {
          section.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const portfolioItems = [
    {
      title: 'Modern Living Room',
      category: 'Residential',
      description: 'Elegant contemporary design with warm wood accents',
      image: 'ht.jpg',
    },
    {
      title: 'Corporate Office',
      category: 'Commercial',
      description: 'Professional workspace with ergonomic furniture',
      image: 'ht.jpg',
    },
    {
      title: 'Luxury Bedroom',
      category: 'Residential',
      description: 'Serene retreat with custom cabinetry',
      image: 'ht.jpg',
    },
    {
      title: 'Gourmet Kitchen',
      category: 'Residential',
      description: 'High-end appliances with smart storage solutions',
      image: 'ht.jpg',
    },
  ];

  const testimonials = [
    {
      quote: 'Amazing work! Very professional and timely.',
      name: 'Rahul Sharma',
      project: 'Apartment Renovation',
    },
    {
      quote: 'The design exceeded our expectations. Highly recommended!',
      name: 'Priya Patel',
      project: 'Office Interior',
    },
    {
      quote: 'Their attention to detail is fantastic. Great experience!',
      name: 'Vikram Mehta',
      project: 'Villa Design',
    },
  ];

  const roomTypes = [
    'Living Spaces',
    'Kitchen Designs',
    'Bathroom Retreats',
    'Bedroom Oasis',
    'Home Offices',
    'Dining Areas',
  ];

  const [displayText, setDisplayText] = useState(roomTypes[0]);
  const currentIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const currentTextRef = useRef('');
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseBetween = 2000;

  useEffect(() => {
    let timer;

    const typeWriter = () => {
      const currentWord = roomTypes[currentIndexRef.current];

      if (isDeletingRef.current) {
        currentTextRef.current = currentWord.substring(
          0,
          currentTextRef.current.length - 1
        );
      } else {
        currentTextRef.current = currentWord.substring(
          0,
          currentTextRef.current.length + 1
        );
      }

      setDisplayText(currentTextRef.current);

      if (!isDeletingRef.current && currentTextRef.current === currentWord) {
        timer = setTimeout(() => {
          isDeletingRef.current = true;
          typeWriter();
        }, pauseBetween);
      } else if (isDeletingRef.current && currentTextRef.current === '') {
        isDeletingRef.current = false;
        currentIndexRef.current =
          (currentIndexRef.current + 1) % roomTypes.length;
        timer = setTimeout(typeWriter, typingSpeed);
      } else {
        const speed = isDeletingRef.current ? deletingSpeed : typingSpeed;
        timer = setTimeout(typeWriter, speed);
      }
    };

    timer = setTimeout(typeWriter, typingSpeed);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="font-sans text-gray-800 antialiased">
      {/* Navigation */}
      <nav className="fixed w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                SKS Interior Design Studio
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {[
                  'About',
                  'Services',
                  'Portfolio',
                  'Testimonials',
                  'Contact',
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {['About', 'Services', 'Portfolio', 'Testimonials', 'Contact'].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/batman.jpg"
            alt="Luxury interior design"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
        </div>

        <DesignThought />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Crafting Exceptional{' '}
            <span className="text-blue-400 relative inline-block min-w-[200px]">
              {displayText}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 animate-pulse"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            We transform your vision into beautifully functional interiors with
            precision and style.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
            >
              Get a Free Consultation
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition duration-300"
            >
              View Our Work
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <a href="#about" className="animate-bounce">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </a>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-6 mb-10 lg:mb-0">
              <img
                src="/ht.jpg"
                alt="About SKS Interior Design Studio"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                About{' '}
                <span className="text-blue-600">
                  SKS Interior Design Studio
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2010,SKS Interior Design Studio has been at the
                forefront of creating stunning, functional spaces that reflect
                our clients' personalities and lifestyles. Our team of
                passionate designers brings together creativity, technical
                expertise, and attention to detail to deliver exceptional
                results.
              </p>
              <div className="space-y-4">
                {[
                  '15+ years of industry experience',
                  '100+ satisfied clients',
                  'Award-winning designs',
                  'Sustainable material focus',
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FiChevronRight className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="ml-3 text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '150+', label: 'Projects Completed' },
              { number: '95%', label: 'Client Satisfaction' },
              { number: '50+', label: 'Repeat Clients' },
              { number: '12', label: 'Industry Awards' },
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Our <span className="text-blue-600">Services</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Comprehensive interior solutions tailored to your unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Residential Design',
                description:
                  'Beautiful, functional homes that reflect your personality and lifestyle',
                icon: '🏠',
              },
              {
                title: 'Commercial Spaces',
                description:
                  'Productive work environments that impress clients and inspire employees',
                icon: '🏢',
              },
              {
                title: 'Space Planning',
                description:
                  'Optimized layouts that maximize functionality and flow',
                icon: '📐',
              },
              {
                title: '3D Visualization',
                description:
                  'See your space before implementation with realistic renderings',
                icon: '🖥️',
              },
              {
                title: 'Renovation',
                description:
                  'Transform existing spaces with creative redesign solutions',
                icon: '🔨',
              },
              {
                title: 'Custom Furniture',
                description:
                  'Bespoke pieces designed specifically for your space',
                icon: '🛋️',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Our <span className="text-blue-600">Portfolio</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              A showcase of our recent design projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-90 transition duration-500 flex items-end p-6">
                  <div>
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
            >
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Client <span className="text-blue-600">Testimonials</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Hear what our clients say about working with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-6 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <blockquote className="text-lg italic text-gray-700 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/ht.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="max-w-3xl mx-auto text-xl mb-8">
            Schedule a free consultation with our design experts today and take
            the first step toward your dream space.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
            >
              Get Started
            </a>
            <a
              href="tel:+918830637646"
              className="px-8 py-4 bg-transparent border-2 border-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 flex items-center justify-center gap-2"
            >
              <FiPhone /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                Get in <span className="text-blue-600">Touch</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Have a project in mind or questions about our services? Fill out
                the form and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-blue-600">
                    <FiMapPin className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Our Office
                    </h3>
                    <p className="text-gray-600">
                      Wadgaon Budruk, Dhayari, Pune, Maharashtra 411041
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-blue-600">
                    <FiPhone className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 88306 37646</p>
                    {/* <p className="text-gray-600">+91 20 1234 5678</p> */}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-blue-600">
                    <FiInstagram className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Follow Us
                    </h3>
                    <a
                      href="https://www.instagram.com/interiorbysahil?igsh=MXMzeXJlbXRreThy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      @sksinterior
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                    Thank you! Your message has been sent successfully. We'll
                    contact you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                    There was an error sending your message. Please try again
                    later.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                SKS Interior Design Studio
              </h3>
              <p className="text-gray-400">
                Creating beautiful, functional spaces that inspire and delight.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  'About',
                  'Services',
                  'Portfolio',
                  'Testimonials',
                  'Contact',
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {[
                  'Residential Design',
                  'Commercial Spaces',
                  'Space Planning',
                  '3D Visualization',
                  'Renovation',
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <address className="not-italic text-gray-400 space-y-2">
                <p>Wadgaon Budruk, Dhayari,</p>
                <p>Pune, Maharashtra 411041</p>
                <p>Phone: +91 88306 37646</p>
                <p>Email: sahilsanas8980@gmail.comm</p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} SKS Interior Design Studio. All
              rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://www.facebook.com/profile.php?id=100089323626725"
                className="text-gray-400 hover:text-white transition"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/interiorbysahil?igsh=MXMzeXJlbXRreThy"
                className="text-gray-400 hover:text-white transition"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
