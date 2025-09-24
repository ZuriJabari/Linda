import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

const Header = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isInitiativesOpen, setIsInitiativesOpen] = useState(false);
  const overlayFirstLinkRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const initiatives = [
    {
      name: "The Bold Woman Fund",
      website: "https://boldwomanfund.org",
      description: "Supporting Ugandan women entrepreneurs"
    },
    {
      name: "Bold in Africa",
      website: "https://boldinafrica.com",
      description: "Made-in-Africa brands showcase"
    },
    {
      name: "FG Foundation",
      website: "https://fgfoundation.org",
      description: "African philanthropy platform"
    },
    {
      name: "The Citizen Report–Uganda",
      website: "https://citizenreport.ug",
      description: "Civic participation & governance"
    },
    {
      name: "32 Degrees East",
      website: "https://32degreeseast.org",
      description: "Contemporary art practice"
    },
    {
      name: "Taala Foundation",
      website: "https://taala.org",
      description: "Mental health & creative therapy"
    }
  ];

  const data = useStaticQuery(graphql`
    query NavigationQuery {
      prismicNavigation {
        raw
      }
    }
  `);

  const navigationData = data?.prismicNavigation?.raw?.data;

  // Fallback navigation
  const fallbackNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Initiatives', path: '#initiatives' },
    { name: 'Books', path: '/books' },
    { name: 'Podcast', path: '/podcast' },
    { name: 'Get in Touch', path: '/contact' },
  ];

  // Always use fallback navigation to ensure correct paths
  const navLinks = fallbackNavLinks;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleOverlay = () => setIsOverlayOpen((prev) => !prev);
  const closeOverlay = () => setIsOverlayOpen(false);
  const toggleInitiatives = () => setIsInitiativesOpen((prev) => !prev);

  // Close overlay on ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeOverlay();
    };
    if (isOverlayOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOverlayOpen]);

  // Body scroll lock when overlay is open
  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden';
      // focus first link after paint
      setTimeout(() => {
        overlayFirstLinkRef.current?.focus();
      }, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOverlayOpen]);

  // Simple focus trap within overlay
  const handleOverlayKeyDown = (e) => {
    if (!isOverlayOpen) return;
    if (e.key !== 'Tab') return;
    const container = document.getElementById('overlay-menu');
    if (!container) return;
    const focusable = container.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };


  return (
    <header className={`relative z-[100] transition-colors duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 select-none" aria-label="Mutesilinda.com Home">
            <span className="inline-flex items-baseline gap-1 text-black">
              <span className="font-serif text-xl md:text-2xl leading-none">Mutesilinda</span>
              <span className="text-gray-500 text-base md:text-lg leading-none">.com</span>
            </span>
          </Link>

          {/* Desktop Navigation - intentionally hidden for minimalist header */}
          {
            <button
              onClick={toggleOverlay}
              className={`fixed top-6 right-6 z-[400] inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full text-sm md:text-base tracking-widest uppercase transition-colors w-32 ${
                isOverlayOpen ? 'text-white' : 'text-black'
              }`}
              aria-label={isOverlayOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOverlayOpen}
              aria-pressed={isOverlayOpen}
              aria-controls="overlay-menu"
            >
              {/* Label with animated X when open */}
              <span className="relative inline-block w-20 h-7 text-center">
                {/* MENU text */}
                <span className={`block transform transition-all duration-200 ease-out ${isOverlayOpen ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>Menu</span>
                {/* Animated X icon */}
                <span className={`absolute inset-0 flex items-center justify-center transform transition-all duration-200 ease-out ${isOverlayOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} aria-hidden="true">
                  <span className="relative block w-6 h-6">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 block h-[2px] w-full bg-current rotate-45 rounded"></span>
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 block h-[2px] w-full bg-current -rotate-45 rounded"></span>
                  </span>
                </span>
                {/* Decorative underlines (only when closed) */}
                {!isOverlayOpen && (
                  <>
                    <span className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-8 ${isOverlayOpen ? 'bg-transparent' : 'bg-black/50'}`}></span>
                    <span className={`pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 h-px w-6 ${isOverlayOpen ? 'bg-transparent' : 'bg-black/30'}`}></span>
                  </>
                )}
              </span>
            </button>
          }

          {/* Mobile Menu Button removed to use single top-right control across breakpoints */}
        </div>
      </div>


      {/* Desktop Overlay Menu (Sussex-style) with animation */}
      {
        <div className={`fixed inset-0 z-[300] ${isOverlayOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} onKeyDown={handleOverlayKeyDown}>
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isOverlayOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeOverlay}
          />
          <aside
            id="overlay-menu"
            className={`absolute right-0 top-0 h-full w-full sm:w-4/5 md:w-1/2 lg:w-1/3 bg-[#0b1020] text-white p-8 flex flex-col transform transition-transform duration-500 ease-out ${isOverlayOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex items-center justify-between" />
            {/* Center menu vertically and horizontally */}
            <div className="flex-1 flex items-center justify-center">
              <nav className="space-y-8 text-center">
                {navLinks.filter(link => link.name !== 'Speaking').map((link, idx) => {
                  if (link.name === 'Initiatives') {
                    return (
                      <div key={`${link.name}-${idx}`} className="space-y-4">
                        <button
                          onClick={toggleInitiatives}
                          className="group block text-2xl md:text-3xl lg:text-4xl font-sans uppercase tracking-[0.2em] text-white/90 hover:text-white transition-all duration-200 focus:outline-none outline-none mx-auto"
                          ref={idx === 0 ? overlayFirstLinkRef : undefined}
                        >
                          <span className="relative inline-block">
                            Initiatives
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-white/50 transition-all duration-300 group-hover:w-3/4"></span>
                          </span>
                        </button>

                        {isInitiativesOpen && (
                          <div className="space-y-3 mt-4 text-center">
                            {initiatives.map((initiative, index) => (
                              <a
                                key={index}
                                href={initiative.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-lg md:text-xl text-white/70 hover:text-white transition-colors"
                                onClick={closeOverlay}
                              >
                                {initiative.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  return (
                    <Link
                      key={`${link.name}-${link.path}-${idx}`}
                      to={link.path}
                      className="group block text-2xl md:text-3xl lg:text-4xl font-sans uppercase tracking-[0.2em] text-white/90 hover:text-white transition-all duration-200 focus:outline-none outline-none"
                      onClick={closeOverlay}
                      ref={idx === 0 ? overlayFirstLinkRef : undefined}
                    >
                      <span className="relative inline-block">
                        {link.name}
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-white/50 transition-all duration-300 group-hover:w-3/4"></span>
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="mt-auto pt-12 text-[10px] md:text-xs tracking-widest uppercase text-white/60 text-center">
              <span>© {new Date().getFullYear()} Linda Mutesi</span>
              <span className="mx-3">•</span>
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <span className="mx-3">•</span>
              <a
                href="https://index.ug"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Made by Index Digital
              </a>
            </div>
          </aside>
        </div>
      }
    </header>
  );
};

export default Header;
