import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TransitionLink from "gatsby-plugin-transition-link"

import Img from "gatsby-image"


const Project = ({ pageContext, data, transitionStatus, entry, exit}) => {
    const uid = pageContext.uid;
    const project = data.allPrismicProject.edges[0].node.data;
    
    const [deployed, setDeployed] = useState(false);
    useEffect(() => setTimeout(function() { setDeployed(true) }.bind(this), 10), []);
    return (
        <Layout>
            <div>
                <div className="container">
                    <header>
                        <div className={"cover " + (deployed? "deployed" : "")} style={{ borderColor: project.color}}>
                            <Img  fluid={project.cover.localFile.childImageSharp.fluid} />
                        </div>
                        <h1 style={{color: project.color}}>{project.name.text}</h1>
                        <h1>{project.name.text}</h1>
                    </header>
                </div>
            </div>
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
                        cover {
                            localFile {
                                childImageSharp {
                                    fluid(maxWidth: 400, maxHeight: 250) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                    }
                    slugs
                    uid
                }
            }
        }
    }
    `