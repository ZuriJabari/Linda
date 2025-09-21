import React from 'react';
import { Link } from 'gatsby';

const Header = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Initiatives', path: '/initiatives' },
    { name: 'Speaking', path: '/speaking' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-brand-light shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-serif font-bold text-brand-dark">
              Linda Daily
            </Link>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-600 hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  activeClassName="text-brand-primary font-semibold"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
