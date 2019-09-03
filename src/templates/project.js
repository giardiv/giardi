import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TransitionLink from "gatsby-plugin-transition-link"


const Project = ({ pageContext, data, transitionStatus, entry, exit}) => {
    //console.log(transitionStatus, entry, exit)
    const uid = pageContext.uid;
    const project = data.allPrismicProject.edges[0].node.data;
    return (
        <Layout>
            <div>{project.name.text}</div>
        </Layout>
    )
}
export default Project


export const query = graphql
    `
    query($uid: String) {
        allPrismicProject(filter: {uid: {eq: $uid}}) {
            edges {
                node {
                    data {
                        color
                        for
                        name {
                            text
                        }
                    }
                    slugs
                    uid
                }
            }
        }
    }
    `