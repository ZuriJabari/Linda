const fetch = require('node-fetch');
const crypto = require('crypto');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  try {
    // Fetch data directly from Prismic API
    const PRISMIC_API_ENDPOINT = 'https://mutesilinda.cdn.prismic.io/api/v2';
    
    // Get API information
    const apiResponse = await fetch(PRISMIC_API_ENDPOINT);
    const apiData = await apiResponse.json();
    
    // Get documents endpoint
    const documentsEndpoint = apiData.refs.find(ref => ref.id === 'master').ref;
    const documentsUrl = `${PRISMIC_API_ENDPOINT}/documents/search?ref=${documentsEndpoint}&pageSize=100`;
    
    // Fetch all documents
    const docsResponse = await fetch(documentsUrl);
    const docsData = await docsResponse.json();
    
    // Process blog posts
    const blogPosts = docsData.results.filter(doc => doc.type === 'blog_post');
    blogPosts.forEach((doc, index) => {
      // Create clean data structure
      const cleanData = {
        title: doc.data.title || null,
        subtitle: doc.data.subtitle || null,
        date: doc.data.date || null,
        featured_image: doc.data.featured_image || null,
        content: doc.data.content || null,
      };

      const nodeData = {
        id: createNodeId(`blog-post-${doc.id}`),
        prismicId: doc.id,
        uid: doc.uid,
        type: doc.type,
        first_publication_date: doc.first_publication_date,
        last_publication_date: doc.last_publication_date,
        tags: doc.tags || [],
        lang: doc.lang,
        data: cleanData,
        raw: doc,
        internal: {
          type: 'PrismicBlogPost',
          contentDigest: createContentDigest(doc),
        },
      };

      createNode(nodeData);
    });

    // Process book gallery
    const books = docsData.results.filter(doc => doc.type === 'book_gallery');
    books.forEach((doc, index) => {
      // Create clean data structure
      const cleanData = {
        title: doc.data.title || null,
        author: doc.data.author || null,
        description: doc.data.description || null,
        cover_image: doc.data.cover_image || null,
        amazon_link: doc.data.amazon_link || null,
        rating: doc.data.rating || null,
      };

      const nodeData = {
        id: createNodeId(`book-gallery-${doc.id}`),
        prismicId: doc.id,
        uid: doc.uid,
        type: doc.type,
        first_publication_date: doc.first_publication_date,
        last_publication_date: doc.last_publication_date,
        tags: doc.tags || [],
        lang: doc.lang,
        data: cleanData,
        raw: doc,
        internal: {
          type: 'PrismicBookGallery',
          contentDigest: createContentDigest(doc),
        },
      };

      createNode(nodeData);
    });

    console.log(`Created ${blogPosts.length} blog posts and ${books.length} books from Prismic`);
    
  } catch (error) {
    console.error('Error fetching Prismic data:', error);
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  
  const typeDefs = `
    type PrismicBlogPost implements Node {
      prismicId: String!
      uid: String
      type: String!
      first_publication_date: Date @dateformat
      last_publication_date: Date @dateformat
      tags: [String]
      lang: String
      data: PrismicBlogPostData
      raw: JSON
    }
    
    type PrismicBlogPostData {
      title: JSON
      subtitle: JSON
      date: Date @dateformat
      featured_image: JSON
      content: JSON
    }
    
    type PrismicBookGallery implements Node {
      prismicId: String!
      uid: String
      type: String!
      first_publication_date: Date @dateformat
      last_publication_date: Date @dateformat
      tags: [String]
      lang: String
      data: PrismicBookGalleryData
      raw: JSON
    }
    
    type PrismicBookGalleryData {
      title: JSON
      author: JSON
      description: JSON
      cover_image: JSON
      amazon_link: JSON
      rating: Int
    }
  `;
  
  createTypes(typeDefs);
};
