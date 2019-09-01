const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const result = await graphql(
      `
        {
          allPrismicProject {
            edges {
              node {
                slugs
                uid
              }
            }
          }
        }
      `
    )
    
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    
    const projectTemplate = path.resolve(`src/templates/project.js`)
    result.data.allPrismicProject.edges.forEach(({ node }) => {
      createPage({
        path: `${node.slugs}`,
        component: projectTemplate,
        context: {
          uid: node.uid
          // Add optional context data to be inserted
          // as props into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
        },
      })
    })
  }