exports.createPages = async ({ graphql, actions }) => {
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

  const QUERY = `
  query GetPosts ($after:String) {
    wpgraphql {
      posts(where: { orderby: { field: DATE, order: DESC } },first: 80,after: $after) {
        pageInfo {
            endCursor
            hasNextPage
          }
        nodes {
          slug
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`

  let endCursor = "YXJyYXljb25uZWN0aW9uOjExNTg="

  const posts = graphql(QUERY).then(result => {
    result.data.wpgraphql.posts.nodes.forEach(item => {
      createPage({
        path: "/" + item.slug,
        component: require.resolve("./src/templates/post.js"),
        context: { slug: item.slug, category: item.categories.nodes[0].name },
      })
    })
  })

  const posts2 = graphql(QUERY,{after: endCursor}).then(result => {
    endCursor = result.data.wpgraphql.posts.pageInfo.endCursor
    result.data.wpgraphql.posts.nodes.forEach(item => {
      createPage({
        path: "/" + item.slug,
        component: require.resolve("./src/templates/post.js"),
        context: { slug: item.slug, category: item.categories.nodes[0].name },
      })
    })
  })

  return Promise.all([categories, posts,posts2])
}
