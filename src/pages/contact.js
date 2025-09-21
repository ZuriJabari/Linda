import React from 'react';
import Layout from '../components/Layout';

const ContactPage = () => {
  return (
    <Layout seo={{ title: 'Contact' }}>
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-serif text-center">Contact Us</h1>
        <p className="mt-6 text-xl text-brand-gray text-center">
          For inquiries, please reach out to: <a href="mailto:mutesisekaziga@gmail.com" className="text-brand-primary hover:underline">mutesisekaziga@gmail.com</a>
        </p>
      </div>
    </Layout>
  );
};

export default ContactPage;
