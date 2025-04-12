import { useEffect, useState } from 'react';
import './styles.css';

export default function App() {
  useEffect(() => {
    const aboutSection = document.querySelector('.about');
    const servicesSection = document.querySelector('.services');

    const handleScroll = () => {
      if (aboutSection && servicesSection) {
        const aboutOffset = aboutSection.getBoundingClientRect().top;
        const servicesOffset = servicesSection.getBoundingClientRect().top;

        // When the section is in the viewport
        if (aboutOffset < window.innerHeight * 0.75) {
          aboutSection.style.opacity = 1;
        }

        if (servicesOffset < window.innerHeight * 0.75) {
          servicesSection.style.opacity = 1;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">Interior Firm</div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#portfolio">Portfolio</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>SKS Interior</h1>
          <p>Transforming spaces with style, precision, and purpose.</p>
        </div>
      </header>

      {/* About Section */}
      <section className="section about" id="about">
        <h2>About Us</h2>
        <p>
          At SKS Interior, we specialize in crafting elegant and functional
          spaces tailored to your lifestyle. With a keen eye for detail and a
          passion for design, our team ensures every project is executed
          flawlessly — from planning to completion.
        </p>
      </section>

      {/* Services Section */}
      <section className="section services" id="services">
        <h2>Our Services</h2>
        <ul>
          <li>✅ Residential & Commercial Interior Design</li>
          <li>✅ Turnkey Projects</li>
          <li>✅ Modular Furniture & 3D Visualization</li>
          <li>✅ Renovation & Space Optimization</li>
        </ul>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio" id="portfolio">
        <h2>Our Portfolio</h2>
        <div className="portfolio-grid">
          <div className="portfolio-item">
            <img src="gojo.jpg" alt="Project 1" />
            <h3>Living Room Design</h3>
            <p>Modern design with a touch of elegance and functionality.</p>
          </div>
          <div className="portfolio-item">
            <img src="gojo.jpg" alt="Project 2" />
            <h3>Office Space</h3>
            <p>Maximized productivity with ergonomic designs and aesthetics.</p>
          </div>
          <div className="portfolio-item">
            <img src="gojo.jpg" alt="Project 3" />
            <h3>Bedroom Makeover</h3>
            <p>A cozy and sophisticated bedroom design for relaxation.</p>
          </div>
          <div className="portfolio-item">
            <img src="gojo.jpg" alt="Project 4" />
            <h3>Modular Kitchen</h3>
            <p>Functional and stylish kitchen design that suits any space.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Transform Your Space?</h2>
          <p>
            Contact us today for a free consultation and let’s bring your vision
            to life!
          </p>
          <a href="#contact" className="cta-button">
            Get in Touch
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact" id="contact">
        <h2>Let’s Connect</h2>
        <p>📍 Pune, Maharashtra</p>
        <p>📞 +91-9876543210</p>
        <p>
          📷{' '}
          <a
            href="https://instagram.com/yourfirmpage"
            target="_blank"
            rel="noreferrer"
          >
            View Our Work on Instagram
          </a>
        </p>
      </section>

      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"Amazing work! Very professional and timely."</p>
            <h4>- Client Name</h4>
          </div>
          <div className="testimonial-card">
            <p>"The design exceeded our expectations. Highly recommended!"</p>
            <h4>- Client Name</h4>
          </div>
          <div className="testimonial-card">
            <p>"Their attention to detail is fantastic. Great experience!"</p>
            <h4>- Client Name</h4>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Your message"
              required
            ></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} SKS Interior. All rights reserved.</p>
      </footer>
    </div>
  );
}
