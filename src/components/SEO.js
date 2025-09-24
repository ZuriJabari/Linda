import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, pathname, children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `);

  const seo = {
    title: title ? `${title} | ${site.siteMetadata.title}` : site.siteMetadata.title,
    description: description || site.siteMetadata.description,
    url: `${site.siteMetadata.siteUrl}${pathname || ''}`,
    author: site.siteMetadata.author,
    image: `${site.siteMetadata.siteUrl}/linda-hero.png`,
    siteName: site.siteMetadata.title,
  };

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="author" content={seo.author} />
        <link rel="canonical" href={seo.url} />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.url} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />
        <meta property="og:site_name" content={seo.siteName} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.image} />

        {/* Typography: Source Sans Pro (body) and Playfair Display (headings) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Source+Sans+Pro:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome for share icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": seo.author,
            "description": seo.description,
            "url": site.siteMetadata.siteUrl,
            "image": seo.image,
            "sameAs": [
              "https://linkedin.com/in/lindamutesi",
              "https://twitter.com/lindamutesi",
              "https://medium.com/@lindamutesi",
              "https://instagram.com/lindamutesi",
              "https://youtube.com/@lindamutesi"
            ],
            "jobTitle": "Philanthropist & Community Builder",
            "worksFor": {
              "@type": "Organization",
              "name": "Adalci Advocates"
            },
            "knowsAbout": [
              "Philanthropy",
              "Community Building",
              "Arts & Culture",
              "Women Entrepreneurship",
              "African Leadership"
            ]
          })}
        </script>
      </Helmet>
      {children}
    </>
  );
};

export default SEO;
