import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { asText } from '@prismicio/helpers';

const BlogPostTemplate = ({ data }) => {
  const post = data.prismicBlogPost;
  if (!post) return null;

  return (
    <Layout seo={{ title: asText(post.data.title.richText) }}>
      <div className="max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-serif">{asText(post.data.title.richText)}</h1>
        <div className="mt-8 prose lg:prose-xl text-brand-gray max-w-none">
          {/* Prismic's Rich Text field will be rendered here */}
          <p>Blog post content will be rendered here from Prismic's Slice Zone.</p>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($uid: String!) {
    prismicBlogPost(uid: { eq: $uid }) {
      data {
        title {
          richText
        }
        # Add other fields you need from your blog post type, like slices for the body
      }
    }
  }
`;

export default BlogPostTemplate;
