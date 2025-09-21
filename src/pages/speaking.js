import React from 'react';
import Layout from '../components/Layout';

const SpeakingPage = () => {
  return (
    <Layout seo={{ title: 'Speaking' }}>
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-serif text-center">Speaking Engagements</h1>
        <p className="mt-6 text-xl text-brand-gray text-center">
          Information about Linda's speaking topics and how to book her for your next event will be available here.
        </p>
      </div>
    </Layout>
  );
};

export default SpeakingPage;
