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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.PRISMIC_REPOSITORY_NAME || 'mutesilinda',
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        schemas: {
          navigation: require('./prismic-config/custom-types/navigation.json'),
          homepage: require('./prismic-config/custom-types/homepage.json'),
          blog_post: require('./prismic-config/custom-types/blog_post.json'),
          book_gallery: require('./prismic-config/custom-types/book_gallery.json'),
          book: require('./prismic-config/custom-types/book.json'),
        },
      },
    },
  ],
};
