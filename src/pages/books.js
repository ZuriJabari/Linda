import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const BooksPage = ({ data }) => {
  // Books data from Prismic (custom type: book_gallery)
  const booksNodes = data?.allPrismicBookGallery?.nodes || [];
  const getSlug = (n) => (n?.raw?.uid || n?.id || null);
  const featuredNode = booksNodes.find(n => n?.raw?.data?.monthly_featured === true) || booksNodes[0] || null;
  const booksRaw = booksNodes.map(n => n?.raw).filter(Boolean);
  const featuredBook = featuredNode?.raw || null;
  
  // Pagination state for "All Recommendations"
  const [visibleBooks, setVisibleBooks] = useState(8); // Show 8 books initially
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreBooks = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleBooks(prev => prev + 8);
      setIsLoading(false);
    }, 600); // Shorter delay for books
  };
  
  // Group books by tags/categories
  const categories = {
    'leadership': { name: 'Leadership & Philanthropy', icon: '💼', color: 'blue' },
    'creativity': { name: 'Creativity & Arts', icon: '🎨', color: 'purple' },
    'african-literature': { name: 'African Literature', icon: '🌍', color: 'green' },
    'law': { name: 'Law & Justice', icon: '⚖️', color: 'orange' }
  };
  
  const booksByCategory = {};
  Object.keys(categories).forEach(cat => {
    booksByCategory[cat] = booksNodes.filter(book => 
      book.raw?.tags?.includes(cat)
    );
  });
  
  const allBooks = booksNodes; // show all (we're not relying on uid)
  
  // Pagination for All Recommendations
  const displayedBooks = allBooks.slice(0, visibleBooks);
  const hasMoreBooks = visibleBooks < allBooks.length;

  return (
    <Layout seo={{ title: 'Books - Reading Recommendations by Linda Mutesi' }}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[11px] uppercase tracking-[0.28em] text-gray-600 mb-4">Reading Corner</div>
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-black mb-6 leading-tight">
            Books & Reading Recommendations
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Carefully curated books that have shaped my thinking on philanthropy, creativity, community building, and social impact. Each recommendation comes with personal insights on why these works matter.
          </p>
        </div>
      </section>

      {/* Featured Book Section */}
      {featuredBook && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Don't Miss</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-black">Featured Book</h2>
              <div className="mt-2 h-px w-16 bg-black/70 mx-auto" />
            </div>
            
            <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto">
              <div className="grid md:grid-cols-5 gap-8">
                <div className="md:col-span-2">
                  {featuredBook.data?.cover_image?.url ? (
                    <Link to={getSlug(featuredNode) ? `/books/${getSlug(featuredNode)}` : `/books`}>
                      <div className="w-full h-[360px] md:h-[460px] bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center p-6">
                        <img src={featuredBook.data.cover_image.url} alt={featuredBook.data.book_title} className="max-h-full max-w-full object-contain drop-shadow" />
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full h-[360px] md:h-[460px] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center rounded-xl">
                      <span className="text-6xl opacity-50">📚</span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-3 p-6 md:p-8">
                  <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">Monthly Featured</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
                    <Link to={getSlug(featuredNode) ? `/books/${getSlug(featuredNode)}` : `/books`} className="hover:underline">
                      {featuredBook.data?.book_title || 'Featured Book'}
                    </Link>
                  </h3>
                  {featuredBook.data?.author && (
                    <p className="text-lg text-gray-600 mb-4">by {featuredBook.data.author}</p>
                  )}
                  <div className="prose prose-gray max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {featuredBook.data?.short_review?.[0]?.text || 'A thought-provoking read that offers valuable insights.'}
                    </p>
                  </div>
                  {featuredBook.tags && featuredBook.tags.length > 0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {featuredBook.tags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <Link 
                      to={getSlug(featuredNode) ? `/books/${getSlug(featuredNode)}` : `/books`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors"
                    >
                      Read Full Review
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Books by Category */}
      {Object.keys(categories).map(categoryKey => {
        const category = categories[categoryKey];
        const categoryBooks = booksByCategory[categoryKey];
        
        if (categoryBooks.length === 0) return null;
        
        return (
          <section key={categoryKey} className="py-12 md:py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-black">{category.name}</h2>
                  <p className="text-gray-600">{categoryBooks.length} books</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryBooks.map((book, idx) => {
                  const bookData = book.raw;
                  return (
                    <article key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <Link to={getSlug(book) ? `/books/${getSlug(book)}` : `/books`}>
                        {bookData?.data?.cover_image?.url ? (
                          <img 
                            src={bookData.data.cover_image.url} 
                            alt={bookData.data.book_title}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <span className="text-4xl text-gray-400">📚</span>
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-black mb-2 line-clamp-2">
                            {bookData?.data?.book_title || 'Untitled Book'}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {bookData?.data?.author || 'Unknown Author'}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {bookData?.data?.short_review?.[0]?.text || 'A valuable addition to any reading list.'}
                          </p>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* All Books Section */}
      {allBooks.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">All Recommendations</h2>
              <p className="text-gray-600 text-lg">Browse my complete collection of book recommendations</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedBooks.map((book, idx) => {
                const bookData = book.raw;
                return (
                  <article key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <Link to={getSlug(book) ? `/books/${getSlug(book)}` : `/books`}>
                      {bookData?.data?.cover_image?.url ? (
                        <img 
                          src={bookData.data.cover_image.url} 
                          alt={bookData.data.book_title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <span className="text-4xl text-gray-400">📚</span>
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-black mb-2 line-clamp-2">
                          {bookData?.data?.book_title || 'Untitled Book'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {bookData?.data?.author || 'Unknown Author'}
                        </p>
                        {bookData?.tags && bookData.tags.length > 0 && (
                          <div className="mb-2">
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                              {bookData.tags[0]}
                            </span>
                          </div>
                        )}
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {bookData?.data?.short_review?.[0]?.text || 'A valuable addition to any reading list.'}
                        </p>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>

            {/* Load More Section */}
            {hasMoreBooks && (
              <div className="mt-12 text-center">
                <div className="mb-8">
                  <p className="text-gray-600 mb-4">
                    Showing {displayedBooks.length} of {allBooks.length} books
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
                    <div 
                      className="bg-amber-500 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(displayedBooks.length / allBooks.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <button 
                  onClick={loadMoreBooks}
                  disabled={isLoading}
                  className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-5 h-5 mr-3 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Discovering More Books...
                    </>
                  ) : (
                    <>
                      Discover More Books
                      <svg className="w-5 h-5 ml-3 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </>
                  )}
                </button>
                
                <p className="mt-4 text-sm text-gray-500">
                  {allBooks.length - displayedBooks.length} more books in my library
                </p>
              </div>
            )}
            
            {/* End of Books Message */}
            {!hasMoreBooks && displayedBooks.length > 8 && (
              <div className="mt-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">You've explored my entire library!</h3>
                  <p className="text-gray-600 mb-6">Thank you for browsing through my reading recommendations.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link 
                      to="/blog" 
                      className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                    >
                      Read My Stories
                    </Link>
                    <Link 
                      to="/" 
                      className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:border-gray-400 transition-colors"
                    >
                      Explore My Work
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Book Recommendations
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Subscribe to receive my monthly book recommendations and reading insights directly in your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </Layout>
  );
};

export default BooksPage;

export const query = graphql`
  query BooksPage {
    allPrismicBookGallery(sort: {first_publication_date: DESC}) {
      nodes {
        id
        first_publication_date
        raw
      }
    }
  }
`;
