import React, { useState, useEffect, useRef } from 'react';
import Home from './Home';
import About from './About';
import Services from './Services';
import Contact from './Contact';

// Reusable Button Component (DRY)
export const Button = ({ children, onClick, type = "button", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-medical hover:bg-medicalDark text-white font-heading font-semibold py-3 px-6 rounded transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

// Scroll-triggered Fade In Wrapper
export const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Layout = ({ children, setPage, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['Home', 'About', 'Services', 'Contact'];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0 cursor-pointer" onClick={() => setPage('Home')}>
                <h1 className="font-heading font-bold text-2xl text-medical flex items-center gap-2">
                  <img src="/logo.png" alt="CityCare Logo" className="h-12 w-auto" />
                </h1>
              </div>

              {/* Contact Info Header */}
              <div className="hidden lg:flex items-center gap-6 border-l border-gray-100 pl-8 h-10">
                <div className="flex items-center gap-2 text-gray-600 hover:text-medical transition-colors cursor-pointer">
                  <div className="p-2 bg-medical/5 rounded-full">
                    <svg className="w-4 h-4 text-medical" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold">(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 hover:text-medical transition-colors cursor-pointer">
                  <div className="p-2 bg-medical/5 rounded-full">
                    <svg className="w-4 h-4 text-medical" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold">citycare@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2">
              {navLinks.map(link => (
                <button
                  key={link}
                  onClick={() => setPage(link)}
                  className={`px-4 py-2 rounded-lg font-heading font-semibold transition-all duration-300 relative group ${currentPage === link
                    ? 'text-medical'
                    : 'text-gray-600 hover:text-medical hover:bg-medical/5'
                    }`}
                >
                  {link}
                  {/* Active Indicator Line */}
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-300 ${currentPage === link
                    ? 'w-[calc(100%-1rem)] bg-medical shadow-[0_0_10px_rgba(37,99,235,0.4)] opacity-100'
                    : 'w-0 bg-medical opacity-0 group-hover:w-[calc(100%-1.5rem)] group-hover:opacity-50'
                    }`} />
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden bg-white border-t border-gray-100">
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => { setPage(link); setIsOpen(false); }}
                className={`block w-full text-left px-4 py-3 font-heading font-medium transition-colors ${currentPage === link ? 'bg-medical/10 text-medical' : 'text-gray-600 hover:bg-lightGray hover:text-medical'
                  }`}
              >
                {link}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-heading font-bold text-xl text-white mb-4">CityCare</h2>
            <p className="text-sm">Trusted Family Healthcare providing modern, affordable, and compassionate medical care for over a decade.</p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map(link => (
                <li key={link}>
                  <button onClick={() => setPage(link)} className="hover:text-medical">{link}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Contact</h3>
            <p className="text-sm space-y-2">
              <span className="block">📞 (555) 123-4567</span>
              <span className="block">✉️ citycare@gmail.com</span>
              <span className="block">📍 123 Health Ave, Medical District</span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          &copy; {new Date().getFullYear()} CityCare. All rights reserved.
        </div>
      </footer>

      {/* WhatsApp Floating Widget */}
      <a
        href="https://api.whatsapp.com/send?phone=9553722793&text=Hello%20Im%20Danish%20%F0%9F%98%8A"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-[18vh] right-6 z-[1000] flex items-center gap-3 group"
        aria-label="Chat with us on WhatsApp"
      >
        <div className="bg-white text-gray-800 text-sm font-bold py-2 px-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] relative border border-gray-100 transition-all duration-300 transform group-hover:-translate-y-1">
          WhatsApp Us! 😊
          {/* Small chat tail pointing right toward the icon */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white"></div>
        </div>
        <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-[#25D366] shadow-[0_4px_12px_rgba(0,0,0,0.25)] text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_18px_rgba(0,0,0,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-[60%] h-[60%]">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
        </div>
      </a>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'About': return <About setPage={setCurrentPage} />;
      case 'Services': return <Services setPage={setCurrentPage} />;
      case 'Contact': return <Contact />;
      default: return <Home setPage={setCurrentPage} />;
    }
  };

  return <Layout setPage={setCurrentPage} currentPage={currentPage}>{renderPage()}</Layout>;
}