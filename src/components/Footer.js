import React from 'react';
import { Link } from 'gatsby';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Linda Mutesi. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
