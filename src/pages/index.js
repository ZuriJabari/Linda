import React from 'react';
import Layout from '../components/Layout';

const IndexPage = () => {
  return (
    <Layout seo={{ title: 'Home' }}>
      {/* Hero Section */}
      <section className="bg-brand-light py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-brand-dark leading-tight">
            Inspiring Leadership, Transforming Lives
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-brand-gray">
            Join Linda Mutesi on a journey of authentic leadership, meaningful philanthropy, and social impact across Africa and beyond.
          </p>
        </div>
      </section>

      {/* Blog Placeholder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-serif">Latest Stories</h2>
            <p className="mt-4 text-lg text-brand-gray">Discover the latest insights on leadership, philanthropy, and social impact.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* This is where blog posts from Prismic will be rendered. */}
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h3 className="font-bold text-xl">Blog Post Placeholder</h3>
              <p className="mt-2">Content coming soon from Prismic.</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h3 className="font-bold text-xl">Blog Post Placeholder</h3>
              <p className="mt-2">Content coming soon from Prismic.</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h3 className="font-bold text-xl">Blog Post Placeholder</h3>
              <p className="mt-2">Content coming soon from Prismic.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
