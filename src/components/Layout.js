import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';

const Layout = ({ children, seo }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO {...seo} />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
