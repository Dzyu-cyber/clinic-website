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
        href="https://wa.me/9553722793?text=Hello%20Im%20Danish%20%F0%9F%98%8A"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-[60px] h-[60px] z-[1000] flex justify-center items-center rounded-full bg-[#25D366] shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_18px_rgba(0,0,0,0.3)]"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-[60%] h-[60%]">
          <path d="M20.52 3.48A11.86 11.86 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.09 1.51 5.82L0 24l6.49-1.51A11.86 11.86 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-2.05 0-3.96-.6-5.55-1.64l-.39-.24-3.86.9.92-3.77-.25-.39A9.978 9.978 0 012 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.09-7.91l-1.09-1.09c-.15-.15-.34-.22-.53-.22s-.38.08-.53.22l-.36.36c-.08.08-.2.12-.32.1-.23-.03-.51-.12-.78-.25-.26-.13-.49-.31-.7-.53-.21-.21-.39-.44-.53-.7-.13-.27-.22-.55-.25-.78-.02-.12.02-.24.1-.32l.36-.36c.14-.14.22-.34.22-.53s-.08-.38-.22-.53l-1.09-1.09c-.15-.15-.34-.22-.53-.22-.14 0-.27.05-.38.14l-.54.54c-.7.7-1.13 1.64-1.13 2.65 0 1.01.43 1.95 1.13 2.65l.54.54c.09.11.14.24.14.38 0 .19-.08.38-.22.53l-1.09 1.09c-.15.15-.22.34-.22.53 0 .19.08.38.22.53l1.09 1.09c.15.15.34.22.53.22.14 0 .27-.05.38-.14l.54-.54c.7-.7 1.13-1.64 1.13-2.65 0-1.01-.43-1.95-1.13-2.65l-.54-.54c-.09-.11-.14-.24-.14-.38 0-.19.08-.38.22-.53l1.09-1.09c.15-.15.34-.22.53-.22.19 0 .38.08.53.22l1.09 1.09c.15.15.22.34.22.53s-.08.38-.22.53l-.36.36c-.08.08-.12.2-.1.32.03.23.12.51.25.78.13.26.31.49.53.7.21.21.44.39.7.53.27.13.55.22.78.25.12.02.24-.02.32-.1l.36-.36c.14-.14.34-.22.53-.22s.38.08.53.22l1.09 1.09c.15.15.34.22.53.22.19 0 .38-.08.53-.22l1.09-1.09c.15-.15.22-.34.22-.53s-.08-.38-.22-.53z"/>
        </svg>
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