const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve('src/templates/blog-post.js');

  const result = await graphql(`
    {
      allPrismicBlogPost {
        nodes {
          uid
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query for blog posts.');
    return;
  }

  if (result.data.allPrismicBlogPost) {
    result.data.allPrismicBlogPost.nodes.forEach((post) => {
      createPage({
        path: `/blog/${post.uid}`,
        component: blogPostTemplate,
        context: {
          uid: post.uid,
        },
      });
    });
  }
};
