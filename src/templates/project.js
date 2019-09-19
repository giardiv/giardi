import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TransitionLink from "gatsby-plugin-transition-link"

import Img from "gatsby-image"


const Project = ({ pageContext, data, transitionStatus, entry, exit}) => {
    const uid = pageContext.uid;
    const project = data.allPrismicProject.edges[0].node.data;
    
    const [deployed, setDeployed] = useState(false);
    const [framer, setFramer] = useState(false);
    useEffect(() => {
        setTimeout(function() { setDeployed(true) }.bind(this), 10)
        window.addEventListener('scroll', handleScroll, true);

        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    const handleScroll = () => {
        console.log("a", framer.scrollTop);

        console.log(framer.getBoundingClientRect().height);
    }
    return (
        <Layout>
            <div className="framer" ref={ref => setFramer(ref)}>
                <div className="pre-container">
                    <div className="container">
                        <header>
                            <div className="closer">Close</div>
                            <div className={"cover " + (deployed? "deployed" : "")} style={{ borderColor: project.color}}>
                                <Img  fluid={project.cover.localFile.childImageSharp.fluid} />
                            </div>
                            <h1 style={{color: project.color}}>{project.name.text}</h1>
                            <h1>{project.name.text}</h1>
                            <aside>
                                <div className="year" style={{backgroundColor: project.color}}>{project.year}</div>
                                <div className="abstract"> {project.abstract.text} {project.abstract.text} {project.abstract.text} {project.abstract.text} {project.abstract.text}</div>
                            </aside>
                        </header>
                        <div className="infos">
                            <div className="row">
                                <span style={{backgroundColor: project.color}}></span>
                                <div className="label">I did</div>
                                <div className="value" style={{borderBottomColor: project.color}}>{project.tags}</div>
                            </div>
                            { project.with.length > 0 &&
                            <div className="row">
                                <span style={{backgroundColor: project.color}}></span>
                                <div className="label">With</div>
                                <div className="value">{project.with}</div>
                            </div> }
                            { project.for.length > 0 &&
                            <div className="row">
                                <span style={{backgroundColor: project.color}}></span>
                                <div className="label">For</div>
                                <div className="value">{project.for}</div>
                            </div> }
                        </div>
                        <div className="presentation">
                            {project.presentation.map((pic, key) => 
                                <>
                                    <Img style={{width: "60%"}} fluid={pic.picture.localFile.childImageSharp.fluid}/>
                                    {
                                        !key &&
                                        <div>
                                            { project.abstract.text }
                                        </div>
                                    }
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="frame" style={{ borderColor: project.color}}></div>
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
                        abstract {
                            text
                        }
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
                        content {
                            html
                            text
                        }
                        for
                        with
                        tags
                        year
                        presentation {
                            picture {
                                localFile {
                                    childImageSharp {
                                        fluid(maxWidth: 1200, maxHeight: 1200) {
                                            ...GatsbyImageSharpFluid
                                        }
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