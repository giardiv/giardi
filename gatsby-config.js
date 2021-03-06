require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Vincent Giardina`,
    // TODO 
    description: `Hybrid designer-developer`,
    author: `@giardiv`,
  },
  pathPrefix: "/giardi",
  plugins: [
    `gatsby-plugin-react-helmet`,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/favicon.png`, // This path is relative to the root of the site.

        nodeType: 'PrismicProject',
        imagePath: 'edges.nodes[].data.cover.url',
        name: 'coverImage'
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `giardi-portfolio`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => project => `/${project.uid}`,
      }, 
    },
    `gatsby-plugin-transition-link`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: ['poppins', 'ibm-plex-sans', 'ibm-plex-mono', 'titling-gothic-fb'],
          urls: ['https://use.typekit.net/dwi5qcf.css', 'https://use.typekit.net/mhh0agh.css']
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-48552852-4",
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: 1678298,
        sv: 6
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
