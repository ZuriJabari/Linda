// For now, we'll use static navigation data since we know the structure
// In the future, we can re-enable this when Prismic schema is properly configured

export const useNavigation = () => {
  return {
    mainMenu: [
      { label: 'Home', link: { url: '/' } },
      { label: 'Blog', link: { url: '/blog' } },
      { label: 'About', link: { url: '/about' } },
      { label: 'Initiatives', link: { url: '/initiatives' } },
      { label: 'Speaking', link: { url: '/speaking' } },
      { label: 'Books', link: { url: '/books' } },
      { label: 'Podcast', link: { url: '/podcast' } },
    ],
    footerMenu: [
      { label: 'Privacy Policy', link: { url: '/privacy' } },
      { label: 'Terms of Service', link: { url: '/terms' } },
      { label: 'Contact', link: { url: '/contact' } },
      { label: 'Newsletter', link: { url: '/newsletter' } },
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: { url: 'https://linkedin.com/in/lindamutesi' } },
      { platform: 'Twitter', url: { url: 'https://twitter.com/lindamutesi' } },
      { platform: 'Medium', url: { url: 'https://medium.com/@lindamutesi' } },
      { platform: 'Instagram', url: { url: 'https://instagram.com/lindamutesi' } },
      { platform: 'YouTube', url: { url: 'https://youtube.com/@lindamutesi' } },
    ],
  };
};
