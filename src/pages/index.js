import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import { StaticImage } from 'gatsby-plugin-image';
import NewsletterSignup from '../components/NewsletterSignup';

const IndexPage = ({ data }) => {
  // Static hero content
  const heroGreeting = 'Hello, I\'m';
  const heroName = 'Linda Mutesi!';
  const heroSubtitle = "I work with artists, entrepreneurs, and civic leaders to grow opportunity across Uganda and beyond — nurturing creativity, championing women‑ and youth‑led enterprises, and advancing African philanthropy. This blog is where I bring these journeys together — reflections, behind‑the‑scenes insights, and conversations with fellow creatives. I invite you to join me on this journey.";
  const ctaText = 'Discover My Work';
  const ctaLink = '/about';

  // Featured blog post from Prismic (latest)
  const allNodes = data?.allPrismicBlogPost?.nodes || [];
  const featuredNode = allNodes[0];
  const featured = featuredNode?.raw;
  const featuredTitle = featured?.data?.title || 'Featured Article';
  const featuredSubtitle = featured?.data?.subtitle || '';
  const featuredUid = featured?.uid || null;
  const featuredImage = featured?.data?.featured_image?.url || null;
  const featuredDateISO = featuredNode?.first_publication_date || featured?.data?.date || null;
  const featuredDate = featuredDateISO ? new Date(featuredDateISO).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : null;
  // Estimated reading time from content blocks (approx 200 wpm)
  const contentBlocks = Array.isArray(featured?.data?.content) ? featured.data.content : [];
  const totalWords = contentBlocks.reduce((sum, block) => sum + (block?.text ? block.text.trim().split(/\s+/).length : 0), 0);
  const readingTime = totalWords ? Math.max(1, Math.round(totalWords / 200)) : null;
  const featuredTags = featuredNode?.tags || [];
  const moreStories = allNodes.slice(1, 4).map((n) => n?.raw).filter(Boolean);

  // Books data from Prismic (custom type: book_gallery)
  const booksNodes = data?.allPrismicBookGallery?.nodes || [];
  const bookFeaturedNode = booksNodes.find(n => n?.raw?.data?.monthly_featured === true) || booksNodes[0] || null;
  const featuredBook = bookFeaturedNode?.raw || null;
  const recentBooks = booksNodes.slice(0, 4);
  const bookCategories = [
    { name: 'Leadership & Philanthropy', icon: '💼', color: 'blue', count: booksNodes.filter(b => b.raw?.tags?.includes('leadership')).length || 0 },
    { name: 'Creativity & Arts', icon: '🎨', color: 'purple', count: booksNodes.filter(b => b.raw?.tags?.includes('creativity')).length || 0 },
    { name: 'African Literature', icon: '🌍', color: 'green', count: booksNodes.filter(b => b.raw?.tags?.includes('african-literature')).length || 0 },
    { name: 'Law & Justice', icon: '⚖️', color: 'orange', count: booksNodes.filter(b => b.raw?.tags?.includes('law')).length || 0 }
  ];

  return (
    <Layout seo={{ title: 'Home' }}>
      {/* Minimal hero */}
      <section className="relative flex items-center justify-center overflow-hidden bg-white pt-10 lg:pt-8 pb-0">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center pt-2 lg:pt-3 pb-0">
            {/* Left Column - Text Content */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-8 text-black">
              {/* Kicker */}
              <p className="text-xs md:text-[18px] tracking-widest uppercase text-gray-600">Community Builder & Philanthropy</p>

              {/* Hero Title with contrasting sizes */}
              <h1 className="font-serif font-semibold -tracking-[0.01em] leading-tight">
                <span className="block text-5xl md:text-6xl lg:text-7xl">{heroGreeting}</span>
                <span className="block text-6xl md:text-7xl lg:text-8xl xl:text-[88px]">{heroName}</span>
              </h1>

              {/* Hero Subtitle */}
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto lg:mx-0">
                {heroSubtitle}
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
                <Link to={ctaLink} className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-black bg-black text-white hover:bg-transparent hover:text-black transition-all duration-200 font-medium">
                  {ctaText}
                  <span aria-hidden>→</span>
                </Link>
                <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-transparent text-black hover:underline">
                  Visit the Blog
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>

            {/* Right column with small image (mobile only) */}
            <div className="lg:hidden flex justify-center">
              <div className="w-[70vw] max-w-[300px]">
                <StaticImage
                  src="../images/linda-hero.png"
                  alt="Linda Mutesi portrait"
                  placeholder="blurred"
                  width={300}
                  className="w-[85vw] max-w-[520px] h-auto object-contain"
                />
              </div>
            </div>

            {/* Right column with large image (desktop) */}
            <div className="hidden lg:flex lg:col-span-6 justify-end">
              <StaticImage
                src="../images/linda-hero.png"
                alt="Linda Mutesi portrait"
                placeholder="blurred"
                width={980}
                className="w-full max-w-[720px] xl:max-w-[820px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed quick-links */}
      <section className="w-full bg-[#F6F1EE]">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 items-stretch text-center text-gray-900">
            {/* Column 1 */}
            <div className="md:border-r md:border-gray-200 px-6 py-8 transition-colors duration-200 bg-[#F3EEE9] hover:bg-[#EAE4DE] h-full flex flex-col items-center justify-center">
              <Link to="/blog" className="block h-full">
                <span className="block text-[11px] md:text-xs tracking-[0.28em] uppercase text-gray-600">Blog</span>
                <span className="mt-3 block font-serif text-[18px] md:text-[19px] font-semibold tracking-wide text-gray-900">Read the Latest Story</span>
              </Link>
            </div>

            {/* Column 2 */}
            <div className="md:border-r md:border-gray-200 px-6 py-8 transition-colors duration-200 bg-[#EDE8F0] hover:bg-[#E7E1EC] h-full flex flex-col items-center justify-center">
              <Link to="/books" className="block h-full">
                <span className="block text-[11px] md:text-xs tracking-[0.28em] uppercase text-gray-600">Book Gallery</span>
                <span className="mt-3 block font-serif text-[18px] md:text-[19px] font-semibold tracking-wide text-gray-900">Suggestions of Books and Articles for your reading pleasure</span>
              </Link>
            </div>

            {/* Column 3 */}
            <div className="md:border-r md:border-gray-200 px-6 py-8 transition-colors duration-200 bg-[#E7EFEA] hover:bg-[#DFEAE5] h-full flex flex-col items-center justify-center">
              <Link to="/podcast" className="block h-full">
                <span className="block text-[11px] md:text-xs tracking-[0.28em] uppercase text-gray-600">Podcast</span>
                <span className="mt-3 block font-serif text-[18px] md:text-[19px] font-semibold tracking-wide text-gray-900">Listen to my favorite Podcasts</span>
              </Link>
            </div>

            {/* Column 4 - Stay Connected form */}
            <div className="px-6 py-8 transition-colors duration-200 bg-[#F3EEE9] hover:bg-[#EAE4DE] h-full text-center flex flex-col items-center justify-center">
              <div className="block h-full w-full max-w-md">
                <span className="block text-[11px] md:text-xs tracking-[0.28em] uppercase text-gray-600">Stay Connected</span>
                <span className="mt-3 block font-serif text-[18px] md:text-[19px] font-semibold tracking-wide text-gray-900">Subscribe to receive latest updates</span>

                <form className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center" onSubmit={(e)=>{e.preventDefault();}}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full sm:w-auto sm:flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 bg-white"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-md bg-black text-white font-semibold hover:bg-gray-900 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredUid && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 md:text-left text-center">
              <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Don't Miss</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-black">Featured Article</h2>
              <div className="mt-2 h-px w-16 bg-black/70 md:ml-0 mx-auto" />
            </div>
            <div className="grid md:grid-cols-12 gap-8 items-start">
              {/* Featured card (left) */}
              <div className="md:col-span-7">
                <article className="group bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:shadow-xl">
                  {featuredImage ? (
                    <Link to={`/blog/${featuredUid}`} className="block">
                      <img src={featuredImage} alt={featuredTitle} className="w-full h-64 md:h-80 object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    </Link>
                  ) : (
                    <div className="w-full h-40 md:h-56 bg-gray-100 flex items-center justify-center text-gray-400 text-[18px]">Image coming soon</div>
                  )}
                  <div className="p-6 md:p-8 text-left">
                    {featuredTags.length > 0 && (
                      <div className="mb-6 flex flex-wrap items-center justify-start gap-3">
                        {featuredTags.map((t) => (
                          <span key={t} className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-[18px] uppercase tracking-[0.25em] text-gray-500 mb-5 flex items-center justify-start gap-3">
                      <span className="inline-flex items-center gap-2">
                        <img src="/linda-hero.png" alt="Linda Mutesi" className="w-7 h-7 rounded-full object-cover" />
                        <span className="tracking-normal uppercase text-gray-700">By Linda Mutesi</span>
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>{featuredDate ? featuredDate : 'New'}</span>
                      {readingTime && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span>{readingTime} min read</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-black">
                      <Link to={`/blog/${featuredUid}`} className="inline-block hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20">
                        {featuredTitle}
                      </Link>
                    </h3>
                    {featuredSubtitle && (
                      <p className="mt-4 text-gray-700 leading-relaxed">
                        {featuredSubtitle}
                      </p>
                    )}
                    <div className="mt-6">
                      <Link to={`/blog/${featuredUid}`} className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20">
                        Continue reading
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>

              {/* More stories (right) */}
              {moreStories.length > 0 && (
                <aside className="md:col-span-5">
                  <div className="mb-4 md:text-left text-center">
                    <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Latest</div>
                    <h3 className="mt-1 text-xl md:text-2xl font-extrabold text-black">More stories</h3>
                    <div className="mt-2 h-px w-12 bg-black/60 md:ml-0 mx-auto" />
                  </div>
                  <ul className="divide-y divide-gray-200 bg-white border border-gray-200 rounded-lg">
                    {moreStories.map((post, idx) => {
                      const title = post?.data?.title || 'Untitled';
                      const uid = post?.uid || `post-${idx}`;
                      const subtitle = post?.data?.subtitle || '';
                      return (
                        <li key={uid} className="group">
                          <Link to={`/blog/${uid}`} className="flex items-start gap-4 p-5 md:p-6 transition-all duration-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10">
                            <div className="flex-1">
                              <h4 className="text-base md:text-lg font-medium text-black group-hover:underline">{title}</h4>
                              {subtitle && (
                                <p className="mt-1 text-[18px] text-gray-600 line-clamp-2">{subtitle}</p>
                              )}
                            </div>
                            <span className="text-gray-400 group-hover:text-black transition-all duration-200 transform group-hover:translate-x-1" aria-hidden>→</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-4 text-right">
                    <Link to="/blog" className="inline-flex items-center gap-1 text-[18px] font-medium text-black hover:underline">
                      View more
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Books Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:text-left text-center">
            <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Reading Corner</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-black">Books</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">Suggestions of Books and Articles for your reading pleasure</p>
            <div className="mt-2 h-px w-16 bg-black/70 md:ml-0 mx-auto" />
          </div>
          
          {/* Books Grid */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Featured Book (left) */}
            <div className="md:col-span-7">
              {featuredBook ? (
                <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {featuredBook.data?.cover_image?.url ? (
                    <Link to={`/books/${(bookFeaturedNode?.raw?.uid) || bookFeaturedNode?.id || ''}`} className="block">
                      <div className="w-full h-[360px] md:h-[460px] bg-gray-50 flex items-center justify-center p-6">
                        <img src={featuredBook.data.cover_image.url} alt={featuredBook.data.book_title || 'Featured Book'} className="max-h-full max-w-full object-contain drop-shadow" />
                      </div>
                    </Link>
                  ) : (
                    <div className="relative h-[360px] md:h-[460px] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-32 h-44 md:w-40 md:h-56 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 flex items-center justify-center mb-4">
                          <span className="text-6xl md:text-8xl opacity-50">📚</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-6 md:p-8 text-left">
                    <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-5">Monthly Featured Book</div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-black mb-4">
                      <Link to={`/books/${(bookFeaturedNode?.raw?.uid) || bookFeaturedNode?.id || ''}`} className="hover:underline">
                        {featuredBook.data?.book_title || 'Featured Book Recommendation'}
                      </Link>
                    </h3>
                    {featuredBook.data?.author && (
                      <p className="text-lg text-gray-600 mb-4">by {featuredBook.data.author}</p>
                    )}
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {featuredBook.data?.short_review?.[0]?.text || 'A carefully curated book recommendation that has shaped my thinking on philanthropy, creativity, and community building.'}
                    </p>
                    <div className="mt-6">
                      <Link to={`/books/${(bookFeaturedNode?.raw?.uid) || bookFeaturedNode?.id || ''}`} className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors">
                        Read Review
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ) : (
                <article className="group bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-64 md:h-80 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-32 h-44 md:w-40 md:h-56 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 flex items-center justify-center mb-4">
                        <span className="text-6xl md:text-8xl opacity-50">📚</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 text-left">
                    <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-5">Monthly Featured Book</div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-black mb-4">
                      Coming Soon: Monthly Book Recommendations
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Each month, I'll share carefully curated book recommendations that have shaped my thinking on philanthropy, creativity, and community building.
                    </p>
                    <div className="mt-6">
                      <Link to="/books" className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors">
                        Explore Book Gallery
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              )}
            </div>

            {/* Book Categories (right) */}
            <aside className="md:col-span-5">
              <div className="mb-4 text-center md:text-left">
                <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Categories</div>
                <h3 className="mt-1 text-xl md:text-2xl font-extrabold text-black">Book Gallery</h3>
                <div className="mt-2 h-px w-12 bg-black/60 mx-auto md:ml-0" />
              </div>
              
              {/* Recent Books */}
              {recentBooks.length > 0 ? (
                <div className="space-y-4">
                  {recentBooks.map((book, idx) => {
                    const bookData = book?.raw;
                    return (
                      <div key={book.id || idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                        <Link to={`/books/${book?.raw?.uid || book?.id || ''}`} className="flex items-center gap-3">
                          {bookData?.data?.cover_image?.url ? (
                            <img src={bookData.data.cover_image.url} alt={bookData.data.book_title} className="w-12 h-16 object-cover rounded" />
                          ) : (
                            <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-lg">📚</span>
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-black line-clamp-1">{bookData?.data?.book_title || 'Untitled Book'}</h4>
                            <p className="text-sm text-gray-600 line-clamp-1">{bookData?.data?.author || 'Unknown Author'}</p>
                            {bookData?.tags && bookData.tags.length > 0 && (
                              <div className="mt-1 flex gap-1">
                                {bookData.tags.slice(0, 2).map((tag, tagIdx) => (
                                  <span key={tagIdx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Category Cards as fallback */}
                  {bookCategories.map((category, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-${category.color}-100 rounded-full flex items-center justify-center`}>
                          <span className={`text-${category.color}-600 text-lg`}>{category.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-black">{category.name}</h4>
                          <p className="text-sm text-gray-600">{category.count} books available</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 text-center md:text-right">
                <Link to="/books" className="inline-flex items-center gap-1 text-[18px] font-medium text-black hover:underline">
                  View all books
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:text-left text-center">
            <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Audio Content</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-black">Podcast</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">Listen to my favorite podcasts and conversations</p>
            <div className="mt-2 h-px w-16 bg-black/70 md:ml-0 mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Featured Podcast (left) */}
            <div className="md:col-span-7">
              <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-[300px] md:h-[400px] bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center mb-6">
                      <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="text-sm uppercase tracking-wider mb-2">Featured Episode</div>
                    <h3 className="text-xl md:text-2xl font-bold">Coming Soon</h3>
                  </div>
                </div>
                <div className="p-6 md:p-8 text-left">
                  <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-5">Latest Episode</div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-black mb-4">
                    Conversations on African Philanthropy
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Join me for thoughtful conversations with leaders, changemakers, and innovators who are reshaping philanthropy and community building across Africa.
                  </p>
                  <div className="mt-6">
                    <Link to="/podcast" className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors">
                      Listen Now
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            {/* Podcast Categories (right) */}
            <aside className="md:col-span-5">
              <div className="mb-4 text-center md:text-left">
                <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Topics</div>
                <h3 className="mt-1 text-xl md:text-2xl font-extrabold text-black">Episode Categories</h3>
                <div className="mt-2 h-px w-12 bg-black/60 mx-auto md:ml-0" />
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Philanthropy & Giving', count: 'Coming Soon' },
                  { name: 'Women Leadership', count: 'Coming Soon' },
                  { name: 'Community Building', count: 'Coming Soon' },
                  { name: 'African Innovation', count: 'Coming Soon' }
                ].map((category, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-200">
                    <div>
                      <h4 className="font-semibold text-black">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.count}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center md:text-right">
                <Link to="/podcast" className="inline-flex items-center gap-1 text-[18px] font-medium text-black hover:underline">
                  All Episodes
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default IndexPage;

// Simplified query for static build
// export const query = graphql`
//   query HomeFeatured {
//     allPrismicBlogPost(limit: 4) {
//       nodes {
//         first_publication_date
//         tags
//         raw
//       }
//     }
//     allPrismicBookGallery(limit: 8) {
//       nodes {
//         id
//         first_publication_date
//         raw
//       }
//     }
//   }
// `;
