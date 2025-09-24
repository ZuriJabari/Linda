import React from 'react';
import Layout from '../components/Layout';

const InitiativesPage = () => {
  return (
    <Layout seo={{ title: 'Initiatives' }}>
      <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-black mb-6">
            Initiatives & Impact
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Linda's work spans across multiple areas of impact, supporting communities and creating lasting change across Africa.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
            <h3 className="text-2xl font-bold font-serif text-black mb-4">The Bold Woman Fund</h3>
            <p className="text-gray-700 mb-4">
              Supporting Ugandan women entrepreneurs in fashion and design through training programs and retail opportunities.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Skills development workshops</li>
              <li>• Retail platform at Bold in Africa Store</li>
              <li>• Mentorship programs</li>
              <li>• Market access support</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
            <h3 className="text-2xl font-bold font-serif text-black mb-4">Visual Arts Promotion</h3>
            <p className="text-gray-700 mb-4">
              Championing African visual arts and creating spaces for artists to showcase their work and connect with audiences.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Artist development programs</li>
              <li>• Exhibition opportunities</li>
              <li>• Community art initiatives</li>
              <li>• Cultural preservation projects</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
            <h3 className="text-2xl font-bold font-serif text-black mb-4">Youth Enterprise</h3>
            <p className="text-gray-700 mb-4">
              Empowering young entrepreneurs with resources, mentorship, and funding to build sustainable businesses.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Startup incubation</li>
              <li>• Business development training</li>
              <li>• Access to capital</li>
              <li>• Network building</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
            <h3 className="text-2xl font-bold font-serif text-black mb-4">African Literature</h3>
            <p className="text-gray-700 mb-4">
              Promoting African authors and literature to preserve cultural narratives and foster literary excellence.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Author support programs</li>
              <li>• Literary festivals</li>
              <li>• Publishing assistance</li>
              <li>• Reading communities</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
            <h3 className="text-2xl font-bold font-serif text-black mb-4">Women in Business</h3>
            <p className="text-gray-700 mb-4">
              Advocating for women's economic empowerment and leadership in African business communities.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Leadership training</li>
              <li>• Business networking</li>
              <li>• Policy advocacy</li>
              <li>• Success story sharing</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
            <h3 className="text-2xl font-bold font-serif text-black mb-4">African Philanthropy</h3>
            <p className="text-gray-700 mb-4">
              Building a culture of giving and sharing based on African values and community-centered approaches.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Community giving initiatives</li>
              <li>• Philanthropic education</li>
              <li>• Resource mobilization</li>
              <li>• Impact measurement</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InitiativesPage;
