import React from 'react';
import Layout from '../components/Layout';

const SpeakingPage = () => {
  return (
    <Layout seo={{ title: 'Speaking' }}>
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-black mb-6">
            Speaking Engagements
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Linda shares her insights and experiences on leadership, philanthropy, and social impact across Africa.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold font-serif text-black mb-4">Speaking Topics</h2>
          <ul className="text-gray-700 space-y-4">
            <li>
              <h3 className="font-semibold text-lg mb-2">Authentic Leadership in Africa</h3>
              <p>Exploring leadership principles drawn from African cultural values and their application in modern contexts.</p>
            </li>
            <li>
              <h3 className="font-semibold text-lg mb-2">The Future of African Philanthropy</h3>
              <p>Building sustainable giving models that honor African traditions while addressing contemporary challenges.</p>
            </li>
            <li>
              <h3 className="font-semibold text-lg mb-2">Empowering Women Entrepreneurs</h3>
              <p>Stories and strategies for supporting women-led businesses across the African continent.</p>
            </li>
            <li>
              <h3 className="font-semibold text-lg mb-2">Social Impact Through Arts & Culture</h3>
              <p>The role of creative expression in community development and social change.</p>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold font-serif text-black mb-4">Book Linda for Speaking</h2>
          <p className="text-gray-700 mb-4">
            Linda is available for keynote speeches, panel discussions, workshops, and consultations on topics related to African leadership, philanthropy, and social impact.
          </p>
          <p className="text-gray-700">
            For speaking inquiries, please contact us through the contact form or reach out directly.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SpeakingPage;
