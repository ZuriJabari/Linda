require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Linda Daily`,
    description: `Inspiring conversations about leadership, philanthropy, and social impact across Africa and beyond.`,
    author: `Linda Mutesi`,
    siteUrl: `https://lindadaily.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-prismic-field-filter`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // Temporarily disable problematic Prismic plugin
    // Will be replaced with custom data source
    // {
    //   resolve: `gatsby-source-prismic`,
    //   options: {
    //     repositoryName: process.env.PRISMIC_REPOSITORY_NAME || 'mutesilinda',
    //     accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    //     schemas: {
    //       blog_post: require('./prismic-config/custom-types/blog_post.json'),
    //       book_gallery: require('./prismic-config/custom-types/book_gallery.json'),
    //     },
    //     shouldDownloadFiles: false,
    //     linkResolver: (doc) => `/${doc.type}/${doc.uid}`,
    //   },
    // },
  ],
};
