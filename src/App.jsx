import React, { useState } from 'react';
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

const Layout = ({ children, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['Home', 'About', 'Services', 'Contact'];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => setPage('Home')}>
              <h1 className="font-heading font-bold text-2xl text-medical flex items-center gap-2">
                <img src="/logo.png" alt="CityCare Logo" className="h-12 w-auto" />
              </h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-4">
              {navLinks.map(link => (
                <button
                  key={link}
                  onClick={() => setPage(link)}
                  className="px-3 py-2 rounded-lg font-heading font-medium text-gray-600 hover:text-medical hover:bg-medical/10 transition-all duration-300 hover:scale-105"
                >
                  {link}
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
                className="block w-full text-left px-4 py-3 font-heading text-gray-600 hover:bg-lightGray hover:text-medical"
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
              <span className="block">✉️ contact@citycare.com</span>
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

  return <Layout setPage={setCurrentPage}>{renderPage()}</Layout>;
}