import React, { useEffect, useMemo, useState } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';

const BlogPostTemplate = ({ data, pageContext }) => {
  const { uid, blogPost: ctxBlogPost } = pageContext;
  const nodes = data?.allPrismicBlogPost?.nodes || [];
  const current = ctxBlogPost || nodes.find(n => n.raw?.uid === uid)?.raw;
  const more = nodes
    .map(n => n.raw)
    .filter(p => p && p.uid !== uid)
    .slice(0, 3);

  const notFound = !current;

  // All hooks must be called at the top level, unconditionally
  // reading progress
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const p = total > 0 ? (el.scrollTop / total) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, p)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // share links
  const [currentUrl, setCurrentUrl] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') setCurrentUrl(window.location.href);
  }, []);

  const d = current?.data || {};
  const title = d.title || 'Untitled';
  const subtitle = d.subtitle || '';
  const heroUrl = d.featured_image?.url || null;
  const dateISO = current?.first_publication_date || d.date || null;
  const dateStr = dateISO ? new Date(dateISO).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : null;
  const blocks = Array.isArray(d.content) ? d.content : [];

  // reading time
  const totalWords = blocks.reduce((s, b) => s + (b?.text ? b.text.trim().split(/\s+/).length : 0), 0);
  const readMins = totalWords ? Math.max(1, Math.round(totalWords / 200)) : null;

  // Generate table of contents from headings
  const tocItems = blocks
    .filter(b => b.type === 'heading1' || b.type === 'heading2' || b.type === 'heading3')
    .map((b, idx) => ({
      id: `heading-${idx}`,
      text: b.text,
      level: b.type === 'heading1' ? 1 : b.type === 'heading2' ? 2 : 3,
    }));
  const hasToc = tocItems.length > 2 && totalWords > 800;

  const share = useMemo(() => {
    const u = encodeURIComponent(currentUrl);
    const t = encodeURIComponent(typeof title === 'string' ? title : '');
    return {
      twitter: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    };
  }, [currentUrl, title]);

  // helper: render content blocks with grouped lists
  const renderBlocks = (items) => {
    const out = [];
    let i = 0;
    let isFirstParagraph = true;
    let headingCount = 0;
    while (i < items.length) {
      const b = items[i];
      if (b.type === 'list-item') {
        const list = [];
        while (i < items.length && items[i].type === 'list-item') {
          list.push(items[i]);
          i++;
        }
        out.push(
          <ul key={`ul-${i}`} className="my-9 md:my-11 space-y-4 text-xl md:text-2xl leading-relaxed md:leading-loose text-gray-700 font-light">
            {list.map((li, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mt-3 flex-shrink-0" />
                <span>{li.text}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }
      if (b.type === 'o-list-item') {
        const list = [];
        while (i < items.length && items[i].type === 'o-list-item') {
          list.push(items[i]);
          i++;
        }
        out.push(
          <ol key={`ol-${i}`} className="my-9 md:my-11 space-y-4 text-xl md:text-2xl leading-relaxed md:leading-loose text-gray-700 font-light">
            {list.map((li, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-black text-white text-xs font-semibold rounded-full mt-1 flex-shrink-0">
                  {idx + 1}
                </span>
                <span>{li.text}</span>
              </li>
            ))}
          </ol>
        );
        continue;
      }
      // non-list block
      switch (b.type) {
        case 'heading1':
          out.push(<h2 key={i} id={`heading-${headingCount++}`} className="mt-18 md:mt-24 mb-7 md:mb-10 text-3xl md:text-4xl font-extrabold text-black leading-tight tracking-tight">{b.text}</h2>);
          break;
        case 'heading2':
          out.push(<h3 key={i} id={`heading-${headingCount++}`} className="mt-14 md:mt-18 mb-6 md:mb-8 text-3xl md:text-4xl font-extrabold text-black leading-snug tracking-tight">{b.text}</h3>);
          break;
        case 'heading3':
          out.push(<h4 key={i} id={`heading-${headingCount++}`} className="mt-12 md:mt-16 mb-4 md:mb-6 text-xl md:text-2xl font-bold text-black leading-snug tracking-tight">{b.text}</h4>);
          break;
        case 'preformatted':
          out.push(
            <pre key={i} className="my-8 md:my-10 bg-gray-50 border border-gray-200 rounded-lg p-6 md:p-8 overflow-x-auto text-sm md:text-base leading-relaxed font-mono">
              <code className="text-gray-800">{b.text}</code>
            </pre>
          );
          break;
        case 'image':
          out.push(
            <figure key={i} className="my-12 md:my-20">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img src={b.url} alt={b.alt || ''} className="w-full h-auto" />
              </div>
              {b.alt && (
                <div className="mt-1 md:mt-2 pb-12 md:pb-20">
                  <div className="h-px bg-gray-200 mb-3" />
                  <figcaption className="text-[18px] md:text-[19px] text-gray-600 leading-relaxed max-w-2xl pb-4 mb-5 border-b border-gray-100">
                    {b.alt}
                  </figcaption>
                </div>
              )}
            </figure>
          );
          break;
        case 'embed':
        case 'video':
        case 'youtube':
          // Handle YouTube embeds and other video content
          const videoUrl = b.url || b.embed_url || b.video_url;
          let embedUrl = videoUrl;
          
          // Convert YouTube watch URLs to embed URLs
          if (videoUrl && videoUrl.includes('youtube.com/watch')) {
            const videoId = videoUrl.split('v=')[1]?.split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          } else if (videoUrl && videoUrl.includes('youtu.be/')) {
            const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          }
          
          out.push(
            <figure key={i} className="my-12 md:my-20">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                <iframe
                  src={embedUrl}
                  title={b.title || b.alt || 'Video'}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {(b.title || b.alt) && (
                <div className="mt-1 md:mt-2 pb-12 md:pb-20">
                  <div className="h-px bg-gray-200 mb-3" />
                  <figcaption className="text-[18px] md:text-[19px] text-gray-600 leading-relaxed max-w-2xl pb-4 mb-5 border-b border-gray-100">
                    {b.title || b.alt}
                  </figcaption>
                </div>
              )}
            </figure>
          );
          break;
        case 'paragraph':
        default:
          const isDropCap = isFirstParagraph && b.text && b.text.length > 100;
          if (isDropCap) isFirstParagraph = false;
          out.push(
            <p key={i} className={`mb-7 md:mb-9 text-xl md:text-2xl leading-relaxed md:leading-loose text-gray-700 font-light`}>{b.text}</p>
          );
      }
      i++;
    }
    return out;
  };

  return (
    <Layout seo={{ title: notFound ? 'Post not found' : (typeof title === 'string' ? title : 'Article') }}>
      {notFound ? (
        <div className="max-w-3xl mx-auto py-20 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">Post not found</h1>
          <Link to="/blog" className="inline-block px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors">Back to Blog</Link>
        </div>
      ) : (
        <>
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-[10000] h-[6px] bg-red-200 shadow-md border-b border-gray-200">
        <div className="h-full bg-red-600 transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
      {/* Hero */}
      <header className="bg-white pt-24 md:pt-32">
        <div className="max-w-4xl mx-auto px-4">
          {dateStr && (
            <div className="text-[18px] uppercase tracking-[0.25em] text-gray-500 mb-4 md:mb-6">{dateStr}{readMins ? ` • ${readMins} min read` : ''}</div>
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight tracking-tight">{title}</h1>
          {subtitle && <p className="mt-6 md:mt-8 text-xl md:text-2xl text-gray-700 leading-relaxed font-light">{subtitle}</p>}
          
          {/* Author section with social share */}
          <div className="mt-6 md:mt-8 mb-4 md:mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/linda-hero.png" alt="Linda Mutesi" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="text-lg font-semibold text-black">Linda Mutesi</div>
                <div className="text-sm text-gray-600">Community Builder & Philanthropist</div>
              </div>
            </div>
            
            {/* Social share buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 mr-2 hidden sm:inline">Share</span>
              <a href={share.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-200">
                <i className="fa-brands fa-x-twitter text-base" aria-hidden />
                <span className="sr-only">Share on X</span>
              </a>
              <a href={share.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-[#0077B5] hover:text-white transition-all duration-200">
                <i className="fa-brands fa-linkedin-in text-base" aria-hidden />
                <span className="sr-only">Share on LinkedIn</span>
              </a>
              <a href={share.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white transition-all duration-200">
                <i className="fa-brands fa-facebook-f text-base" aria-hidden />
                <span className="sr-only">Share on Facebook</span>
              </a>
              {currentUrl && (
                <button onClick={() => navigator.clipboard?.writeText(currentUrl)} className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-800 hover:text-white transition-all duration-200">
                  <i className="fa-solid fa-link text-base" aria-hidden />
                  <span className="sr-only">Copy link</span>
                </button>
              )}
            </div>
          </div>
        </div>
        {heroUrl && (
          <div className="mt-10 md:mt-16">
            <div className="relative overflow-hidden rounded-2xl shadow-lg max-w-4xl mx-auto">
              <img src={heroUrl} alt={typeof title === 'string' ? title : 'Article image'} className="w-full h-[240px] md:h-[360px] object-cover" />
            </div>
          </div>
        )}
      </header>

      {/* Table of Contents */}
      {hasToc && (
        <aside className="hidden lg:block fixed left-8 top-32 w-64 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-lg z-10 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <h4 className="text-[18px] font-semibold text-gray-900 uppercase tracking-wide mb-4">Table of Contents</h4>
          <nav>
            <ul className="space-y-2 text-[18px]">
              {tocItems.map((item, idx) => (
                <li key={item.id} className={`${item.level === 1 ? 'ml-0' : item.level === 2 ? 'ml-4' : 'ml-8'}`}>
                  <a
                    href={`#${item.id}`}
                    className="block py-1 text-gray-700 hover:text-black transition-colors leading-tight"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}

      {/* Body */}
      <main className="max-w-3xl reading-width mx-auto px-4 py-12 md:py-20">
        {blocks.length ? renderBlocks(blocks) : <p className="text-gray-600">Content coming soon.</p>}
      </main>

      {/* Author Bio */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl reading-width mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-200">
              <img src="/linda-hero.png" alt="Linda Mutesi" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-black mb-2">Linda Mutesi</h3>
              <p className="text-[18px] md:text-[19px] text-gray-600 leading-relaxed mb-4">
                Linda Mutesi is a community builder and philanthropist working at the intersection of creativity, entrepreneurship, and social impact. She founded Bold Woman Fund to empower women and youth across Uganda through sustainable business solutions and creative partnerships.
              </p>
              <div className="flex gap-4 text-[18px] text-gray-500">
                <a href="/about" className="hover:text-black transition-colors">Learn more about Linda</a>
                <span>•</span>
                <a href="/contact" className="hover:text-black transition-colors">Get in touch</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share at bottom */}
      <div className="max-w-3xl reading-width mx-auto px-4 pt-8 md:pt-12 pb-16 md:pb-20 mb-8 md:mb-12">
        <div className="border-t border-gray-200 pt-8 md:pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <span className="text-[18px] font-medium text-gray-900 uppercase tracking-[0.15em]">Share this article</span>
            <div className="flex items-center gap-3">
              <a href={share.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-200 group">
                <i className="fa-brands fa-x-twitter text-base" aria-hidden />
                <span className="sr-only">Share on X</span>
              </a>
              <a href={share.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-[#0077B5] hover:text-white transition-all duration-200 group">
                <i className="fa-brands fa-linkedin-in text-base" aria-hidden />
                <span className="sr-only">Share on LinkedIn</span>
              </a>
              <a href={share.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white transition-all duration-200 group">
                <i className="fa-brands fa-facebook-f text-base" aria-hidden />
                <span className="sr-only">Share on Facebook</span>
              </a>
              {currentUrl && (
                <button onClick={() => navigator.clipboard?.writeText(currentUrl)} className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-800 hover:text-white transition-all duration-200 group">
                  <i className="fa-solid fa-link text-base" aria-hidden />
                  <span className="sr-only">Copy link</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* More stories */}
      {more.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-3xl reading-width mx-auto px-4">
            <div className="mb-6">
              <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Latest</div>
              <h3 className="mt-1 text-2xl md:text-3xl font-extrabold text-black">More stories</h3>
              <div className="mt-2 h-px w-12 bg-black/60" />
            </div>
            <ul className="divide-y divide-gray-200 bg-white border border-gray-200 rounded-lg">
              {more.map((p, idx) => (
                <li key={p.uid || idx} className="group">
                  <Link to={`/blog/${p.uid}`} className="flex items-start gap-4 p-5 md:p-6 transition-all duration-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10">
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-medium text-black group-hover:underline">{p.data?.title || 'Untitled'}</h4>
                      {p.data?.subtitle && <p className="mt-1 text-[18px] text-gray-600 line-clamp-2">{p.data.subtitle}</p>}
                    </div>
                    <span className="text-gray-400 group-hover:text-black transition-transform duration-200 group-hover:translate-x-1" aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
        </>
      )}
    </Layout>
  );
};

export const query = graphql`
  query BlogTemplateMore {
    allPrismicBlogPost(limit: 4, sort: {first_publication_date: DESC}) {
      nodes { first_publication_date raw }
    }
  }
`;

export default BlogPostTemplate;
