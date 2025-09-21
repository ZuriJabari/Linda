import React from 'react';
import Layout from '../components/Layout';

const InitiativesPage = () => {
  return (
    <Layout seo={{ title: 'Initiatives' }}>
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-serif text-center">Our Initiatives</h1>
        <p className="mt-6 text-xl text-brand-gray text-center">
          Details about Linda's impactful work and community projects will be featured here soon.
        </p>
      </div>
    </Layout>
  );
};

export default InitiativesPage;
