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