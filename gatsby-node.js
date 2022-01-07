exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const categories = graphql(`
    query GetCategories {
      wpgraphql {
        categories {
          nodes {
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.wpgraphql.categories.nodes.forEach(node => {
      createPage({
        path: "/categories/" + node.slug,
        component: require.resolve("./src/templates/category.js"),
        context: { slug: node.slug },
      })
    })
  })

  const posts = graphql(`
    query GetPosts {
      wpgraphql {
        posts(where: { orderby: { field: DATE, order: DESC } }, first: 200) {
          edges {
            node {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.wpgraphql.posts.edges.forEach( item => {
      createPage({
        path: "/" + item.node.slug,
        component: require.resolve("./src/templates/post.js"),
        context: { slug: item.node.slug },
      })
    })
  })

  return Promise.all([categories, posts])
}
