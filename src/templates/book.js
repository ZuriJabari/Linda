import React, { useMemo, useState } from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

const getText = (rt) => Array.isArray(rt) && rt.length ? rt.map(slice => slice.text).join('\n') : '';

const BookTemplate = ({ pageContext }) => {
  const book = pageContext?.book || {};
  const data = book?.data || {};
  const title = data?.book_title || 'Book';
  const author = data?.author || '';
  const cover = data?.cover_image?.url || '';
  const review = getText(data?.short_review) || '';
  const tags = Array.isArray(book?.tags) ? book.tags : [];

  const share = useMemo(() => {
    if (typeof window === 'undefined') return {};
    const url = window.location.href;
    const text = encodeURIComponent(`${title}${author ? ` – by ${author}` : ''}`);
    return {
      url,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
  }, [title, author]);

  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    if (typeof window === 'undefined' || !navigator?.clipboard) return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Layout seo={{ title: `${title}${author ? ` by ${author}` : ''}` }}>
      {/* Hero */}
      <section className="bg-white pt-24 md:pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/books" className="hover:text-black">Books</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Cover */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm bg-gray-50 rounded-lg p-6 border border-gray-200">
                {cover ? (
                  <img src={cover} alt={title} className="w-full h-auto object-contain" />
                ) : (
                  <div className="w-full h-96 bg-gray-200 rounded flex items-center justify-center text-4xl text-gray-400">📚</div>
                )}
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Book Review</div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{title}</h1>
              {author && <p className="text-xl text-gray-600 mb-6">by {author}</p>}

              {tags?.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <span key={i} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full border">{t}</span>
                  ))}
                </div>
              )}

              {/* Share buttons */}
              <div className="mb-8 flex items-center gap-3">
                <span className="text-sm text-gray-600 mr-2">Share</span>
                <a href={share.twitter || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{backgroundColor: '#000000', color: '#ffffff'}}>
                  <span className="text-sm font-bold">𝕏</span>
                </a>
                <a href={share.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{backgroundColor: '#0077B5', color: '#ffffff'}}>
                  <span className="text-sm font-bold">in</span>
                </a>
                <a href={share.facebook || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{backgroundColor: '#1877F2', color: '#ffffff'}}>
                  <span className="text-sm font-bold">f</span>
                </a>
                <button onClick={copyLink} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border-2" style={{backgroundColor: '#ffffff', color: '#374151', borderColor: '#D1D5DB'}}>
                  <span className="text-sm">🔗</span>
                </button>
                {copied && <span className="text-sm text-green-600 ml-2">Copied!</span>}
              </div>

              {/* Review */}
              <div className="prose max-w-none">
                {review ? (
                  <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">{review}</p>
                ) : (
                  <p className="text-gray-600 italic">Review coming soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/books" className="inline-flex items-center text-gray-600 hover:text-black">
            ← Back to Books
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default BookTemplate;
