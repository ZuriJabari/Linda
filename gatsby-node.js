const path = require('path');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  
  const typeDefs = `
    type PrismicBlogPost implements Node {
      raw: JSON
      first_publication_date: Date
      tags: [String]
      uid: String
    }
    
    type PrismicBookGallery implements Node {
      raw: JSON
      first_publication_date: Date
      uid: String
    }
    
    type PrismicNavigation implements Node {
      raw: JSON
    }
    
    type PrismicBlogPostData {
      title: JSON
      subtitle: JSON
      content: JSON
      featured_image: JSON
      author: JSON
      category: JSON
    }
    
    type PrismicBookGalleryData {
      book_title: JSON
      author: JSON
      cover_image: JSON
      short_review: JSON
      rating: JSON
      category: JSON
    }
  `;
  
  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve('src/templates/blog-post.js');
  const bookTemplate = path.resolve('src/templates/book.js');

  const result = await graphql(`
    {
      allPrismicBlogPost {
        nodes {
          raw
        }
      }
      allPrismicBookGallery {
        nodes {
          id
          raw
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query for blog posts.');
    return;
  }

  if (result.data.allPrismicBlogPost) {
    result.data.allPrismicBlogPost.nodes.forEach((post) => {
      const uid = post?.raw?.uid;
      if (!uid) return;
      createPage({
        path: `/blog/${uid}`,
        component: blogPostTemplate,
        context: {
          uid,
          blogPost: post.raw,
        },
      });
    });
  }

  if (result.data.allPrismicBookGallery) {
    result.data.allPrismicBookGallery.nodes.forEach((book) => {
      const slug = book?.raw?.uid || book?.id;
      if (!slug) return;
      createPage({
        path: `/books/${slug}`,
        component: bookTemplate,
        context: {
          slug,
          book: book.raw,
        },
      });
    });
  }
};
