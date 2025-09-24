import React from 'react';
import Layout from '../components/Layout';

const NotFoundPage = () => {
  return (
    <Layout seo={{ title: '404 - Page Not Found' }}>
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-brand-primary mb-4">404</h1>
          <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">Page Not Found</h2>
          <p className="text-brand-gray mb-8">The page you're looking for doesn't exist.</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
