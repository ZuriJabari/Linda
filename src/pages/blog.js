import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';

const BlogPage = ({ data }) => {
  const blogPosts = data?.allPrismicBlogPost?.nodes || [];
  const [visiblePosts, setVisiblePosts] = useState(4); // Show 4 posts initially
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisiblePosts(prev => prev + 4);
      setIsLoading(false);
    }, 800); // Simulate loading delay for smooth UX
  };

  const displayedPosts = blogPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < blogPosts.length;

  return (
    <Layout seo={{ title: 'Blog - Personal Reflections & Stories' }}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Blog</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
            Personal Reflections & Stories
          </h1>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-medium">
              This blog is where I bring these journeys together. Here, you'll find personal reflections on my work as a lawyer, philanthropy student, and community collaborator; behind-the-scenes insights into the projects I am part of; and conversations with fellow creatives who are making a difference in their fields. At its core, this space is about storytelling—the kind that uplifts, challenges, and connects us.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayedPosts.length > 0 ? (
            <>
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Latest Stories</h2>
                <p className="text-gray-600 text-lg">Insights on leadership, philanthropy, and social impact</p>
              </div>
              
              {/* Featured Story */}
              {displayedPosts.length > 0 && (
                <div className="mb-16">
                  <div className="text-center mb-8">
                    <span className="inline-block px-4 py-2 bg-black text-white text-sm font-medium rounded-full">Featured Story</span>
                  </div>
                  {(() => {
                    const featuredPost = blogPosts[0];
                    const postData = featuredPost.raw?.data;
                    const title = typeof postData?.title === 'string' ? postData.title : 'Untitled Post';
                    const subtitle = typeof postData?.subtitle === 'string' ? postData.subtitle : '';
                    const excerpt = typeof postData?.excerpt === 'string' ? postData.excerpt : '';
                    const featuredImage = postData?.featured_image?.url || '';
                    const publishDate = postData?.publish_date || featuredPost.raw?.first_publication_date;
                    const readTime = typeof postData?.read_time === 'string' ? postData.read_time : '8 min read';
                    const category = typeof postData?.category === 'string' ? postData.category : 'Featured';
                    const uid = featuredPost.raw?.uid || 'featured-post';

                    // Format date safely
                    const formatDate = (dateString) => {
                      if (!dateString) return 'Recently';
                      try {
                        const date = new Date(dateString);
                        if (isNaN(date.getTime())) return 'Recently';
                        return date.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        });
                      } catch (error) {
                        return 'Recently';
                      }
                    };

                    return (
                      <article className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                        <Link to={`/blog/${uid}`} className="block">
                          <div className="grid lg:grid-cols-2 gap-0">
                            <div className="relative overflow-hidden">
                              {featuredImage ? (
                                <img 
                                  src={featuredImage} 
                                  alt={title}
                                  className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-64 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                  <span className="text-6xl text-gray-400">📝</span>
                                </div>
                              )}
                              
                              {/* Category Badge */}
                              <div className="absolute top-6 left-6">
                                <span className="inline-block px-4 py-2 bg-black/90 text-white text-sm font-medium rounded-full backdrop-blur">
                                  {category}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                              {/* Meta Information */}
                              <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                                <span className="inline-flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {formatDate(publishDate)}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {readTime}
                                </span>
                              </div>
                              
                              <h3 className="text-2xl lg:text-4xl font-bold text-black mb-4 leading-tight group-hover:text-gray-800 transition-colors">
                                {title}
                              </h3>
                              
                              {subtitle && (
                                <p className="text-lg lg:text-xl text-gray-600 mb-6 font-medium leading-relaxed">
                                  {subtitle}
                                </p>
                              )}
                              
                              {excerpt && (
                                <p className="text-gray-600 mb-8 leading-relaxed text-lg line-clamp-4">
                                  {excerpt}
                                </p>
                              )}
                              
                              {/* Author & CTA */}
                              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                  <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border-2 border-gray-200">
                                      <span className="text-white font-bold text-lg">LM</span>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="font-semibold text-black text-base mb-0.5">Linda Mutesi</p>
                                    <p className="text-sm text-gray-600">Author & Philanthropist • Lawyer, Community Builder</p>
                                  </div>
                                </div>
                                
                                <div className="flex-shrink-0 ml-6">
                                  <span className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors group cursor-pointer">
                                    Continue Reading
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </article>
                    );
                  })()}
                </div>
              )}
              
              {/* Other Stories */}
              {displayedPosts.length > 1 && (
                <>
                  <div className="mb-16 text-center">
                    <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">Other Stories</h3>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">More reflections and insights from my journey in law, philanthropy, and community building</p>
                  </div>
                  
                  <div className="space-y-8">
                    {displayedPosts.slice(1).map((post, index) => {
                      const postData = post.raw?.data;
                      const title = typeof postData?.title === 'string' ? postData.title : 'Untitled Post';
                      const subtitle = typeof postData?.subtitle === 'string' ? postData.subtitle : '';
                      const excerpt = typeof postData?.excerpt === 'string' ? postData.excerpt : '';
                      const featuredImage = postData?.featured_image?.url || '';
                      const publishDate = postData?.publish_date || post.raw?.first_publication_date;
                      const readTime = typeof postData?.read_time === 'string' ? postData.read_time : '5 min read';
                      const category = typeof postData?.category === 'string' ? postData.category : 'Reflection';
                      const uid = post.raw?.uid || `blog-post-${index + 1}`;

                      // Format date safely
                      const formatDate = (dateString) => {
                        if (!dateString) return 'Recently';
                        try {
                          const date = new Date(dateString);
                          if (isNaN(date.getTime())) return 'Recently';
                          return date.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          });
                        } catch (error) {
                          return 'Recently';
                        }
                      };

                      return (
                        <article key={uid} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <Link to={`/blog/${uid}`} className="block">
                            <div className="grid md:grid-cols-3 gap-0">
                              <div className="relative overflow-hidden">
                                {featuredImage ? (
                                  <img 
                                    src={featuredImage} 
                                    alt={title}
                                    className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="w-full h-48 md:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-colors duration-300">
                                    <span className="text-4xl text-gray-400">📝</span>
                                  </div>
                                )}
                                
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                  <span className="inline-block px-3 py-1 bg-black/80 text-white text-xs font-medium rounded-full backdrop-blur">
                                    {category}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
                                {/* Meta Information */}
                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                                  <span className="inline-flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(publishDate)}
                                  </span>
                                  <span className="inline-flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {readTime}
                                  </span>
                                </div>
                                
                                <h4 className="text-xl md:text-2xl font-bold text-black mb-3 leading-tight group-hover:text-gray-800 transition-colors">
                                  {title}
                                </h4>
                                
                                {subtitle && (
                                  <p className="text-gray-600 mb-4 line-clamp-2 font-medium text-lg leading-relaxed">
                                    {subtitle}
                                  </p>
                                )}
                                
                                {excerpt && (
                                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                    {excerpt}
                                  </p>
                                )}
                                
                                {/* Author & CTA */}
                                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                                  <div className="flex items-center gap-3">
                                    <div className="relative">
                                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border-2 border-gray-200">
                                        <span className="text-white font-bold text-sm">LM</span>
                                      </div>
                                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-semibold text-black mb-0.5">Linda Mutesi</p>
                                      <p className="text-xs text-gray-500">Author & Philanthropist</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex-shrink-0">
                                    <span className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors group cursor-pointer">
                                      Read Story
                                      <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Load More Section */}
              {hasMorePosts && (
                <div className="mt-16 text-center">
                  <div className="mb-8">
                    <p className="text-gray-600 mb-4">
                      Showing {displayedPosts.length} of {blogPosts.length} stories
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
                      <div 
                        className="bg-black h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(displayedPosts.length / blogPosts.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={loadMorePosts}
                    disabled={isLoading}
                    className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-5 h-5 mr-3 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading More Stories...
                      </>
                    ) : (
                      <>
                        Load More Stories
                        <svg className="w-5 h-5 ml-3 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </>
                    )}
                  </button>
                  
                  <p className="mt-4 text-sm text-gray-500">
                    {blogPosts.length - displayedPosts.length} more stories available
                  </p>
                </div>
              )}
              
              {/* End of Stories Message */}
              {!hasMorePosts && displayedPosts.length > 4 && (
                <div className="mt-16 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">You've read all stories!</h3>
                    <p className="text-gray-600 mb-6">Thank you for exploring my reflections and insights.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link 
                        to="/books" 
                        className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                      >
                        Explore Book Reviews
                      </Link>
                      <Link 
                        to="/" 
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:border-gray-400 transition-colors"
                      >
                        Back to Homepage
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-gray-400">📝</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Stories Coming Soon</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  I'm preparing thoughtful reflections and insights to share with you. 
                  In the meantime, explore my book recommendations and learn about my initiatives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/books" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                  >
                    Browse Book Reviews
                  </Link>
                  <Link 
                    to="/" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:border-gray-400 transition-colors"
                  >
                    Learn About My Work
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query AllBlogPosts {
    allPrismicBlogPost {
      nodes {
        raw
      }
    }
  }
`;

export default BlogPage;
