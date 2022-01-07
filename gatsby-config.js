module.exports = {
  siteMetadata: {
    title: `Kobi`,
    description: `Kobi App Review.`,
    author: `@spudniklab`,
    siteUrl: `https://kobi.spudniklab.com/`,
  },
  plugins: [
    {
      resolve:`gatsby-source-graphql`,
      options:{
        typeName:`WPGraphQL`,
        fieldName:`wpgraphql`,
        url: `https://beta.spudniklab.com/kobi/graphql`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `kobi-gatsby`,
        short_name: `kobi`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/Kobi_Favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
