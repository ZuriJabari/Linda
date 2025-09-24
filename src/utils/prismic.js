import fetch from 'node-fetch';

const PRISMIC_API_ENDPOINT = 'https://mutesilinda.cdn.prismic.io/api/v2';

export const fetchPrismicData = async () => {
  try {
    // Get API information
    const apiResponse = await fetch(PRISMIC_API_ENDPOINT);
    const apiData = await apiResponse.json();
    
    // Get documents endpoint
    const documentsEndpoint = apiData.refs.find(ref => ref.id === 'master').ref;
    const documentsUrl = `${PRISMIC_API_ENDPOINT}/documents/search?ref=${documentsEndpoint}`;
    
    // Fetch all documents
    const docsResponse = await fetch(documentsUrl);
    const docsData = await docsResponse.json();
    
    // Process and clean the data
    const cleanData = {
      blogPosts: [],
      books: []
    };
    
    docsData.results.forEach(doc => {
      // Clean up the data object by removing numeric keys
      const cleanedData = {};
      if (doc.data) {
        Object.keys(doc.data).forEach(key => {
          if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
            cleanedData[key] = doc.data[key];
          }
        });
      }
      
      const cleanDoc = {
        id: doc.id,
        uid: doc.uid,
        type: doc.type,
        first_publication_date: doc.first_publication_date,
        last_publication_date: doc.last_publication_date,
        tags: doc.tags,
        lang: doc.lang,
        data: cleanedData,
        raw: doc
      };
      
      if (doc.type === 'blog_post') {
        cleanData.blogPosts.push(cleanDoc);
      } else if (doc.type === 'book_gallery') {
        cleanData.books.push(cleanDoc);
      }
    });
    
    return cleanData;
    
  } catch (error) {
    console.error('Error fetching Prismic data:', error);
    return { blogPosts: [], books: [] };
  }
};

export default fetchPrismicData;
