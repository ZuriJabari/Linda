import React from 'react';
import Layout from '../components/Layout';

const BlogPage = () => {
  return (
    <Layout seo={{ title: 'Blog' }}>
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-serif text-center">From the Blog</h1>
        <p className="mt-6 text-xl text-brand-gray text-center">
          A collection of stories, insights, and reflections. Content will be dynamically loaded from Prismic here.
        </p>
      </div>
    </Layout>
  );
};

export default BlogPage;
