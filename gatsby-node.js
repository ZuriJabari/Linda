const path = require('path');

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  
  // Prevent Gatsby from auto-inferring problematic Prismic field types
  // Use @dontInfer to completely control the schema
  const typeDefs = `
    type PrismicBlogPost implements Node @dontInfer {
      id: ID!
      internal: Internal!
      raw: JSON
      first_publication_date: Date @dateformat
      last_publication_date: Date @dateformat
      uid: String
      lang: String
      type: String
      tags: [String]
      url: String
      alternate_languages: [JSON]
      data: PrismicBlogPostData
    }
    
    type PrismicBlogPostData @dontInfer {
      title: PrismicStructuredTextType
      subtitle: PrismicStructuredTextType
      date: Date @dateformat
      featured_image: PrismicImageType
      content: PrismicStructuredTextType
    }
    
    type PrismicBookGallery implements Node @dontInfer {
      id: ID!
      internal: Internal!
      raw: JSON
      first_publication_date: Date @dateformat
      last_publication_date: Date @dateformat
      uid: String
      lang: String
      type: String
      tags: [String]
      url: String
      alternate_languages: [JSON]
      data: PrismicBookGalleryData
    }
    
    type PrismicBookGalleryData @dontInfer {
      title: PrismicTextType
      author: PrismicTextType
      description: PrismicStructuredTextType
      cover_image: PrismicImageType
      amazon_link: PrismicLinkType
      rating: Int
    }
    
    type PrismicNavigation implements Node @dontInfer {
      id: ID!
      internal: Internal!
      raw: JSON
      first_publication_date: Date @dateformat
      last_publication_date: Date @dateformat
      uid: String
      lang: String
      type: String
      tags: [String]
      url: String
      alternate_languages: [JSON]
      data: JSON
    }
    
    type PrismicHomepage implements Node @dontInfer {
      id: ID!
      internal: Internal!
      raw: JSON
      first_publication_date: Date @dateformat
      last_publication_date: Date @dateformat
      uid: String
      lang: String
      type: String
      tags: [String]
      url: String
      alternate_languages: [JSON]
      data: JSON
    }
    
    type PrismicBook implements Node @dontInfer {
      id: ID!
      internal: Internal!
      raw: JSON
      first_publication_date: Date @dateformat
      last_publication_date: Date @dateformat
      uid: String
      lang: String
      type: String
      tags: [String]
      url: String
      alternate_languages: [JSON]
      data: JSON
    }
    
    # Prismic helper types
    type PrismicTextType {
      text: String
    }
    
    type PrismicStructuredTextType {
      text: String
      html: String
      raw: [JSON]
    }
    
    type PrismicImageType {
      url: String
      alt: String
      copyright: String
      dimensions: PrismicImageDimensionsType
    }
    
    type PrismicImageDimensionsType {
      width: Int
      height: Int
    }
    
    type PrismicLinkType {
      url: String
      target: String
      link_type: String
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
