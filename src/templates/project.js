import React, { useState, useLayoutEffect } from 'react';
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TransitionLink from "gatsby-plugin-transition-link"
import anime from "animejs"

import Img from "gatsby-image"


const Project = (props) => {
    const { pageContext, data} = props
    const uid = pageContext.uid;
    const project = data.allPrismicProject.edges[0].node.data;
    
    const [deployed, setDeployed] = useState(false);
    const [framer, setFramer] = useState(false);
    const [postFramer, setPostFramer] = useState(false);
    const [loadPercent, setLoadPercent] = useState(1);
    const [closer, setCloser] = useState(false);

    useLayoutEffect(() => {
        setTimeout(function() { setDeployed(true) }.bind(this), 10)
        window.addEventListener('scroll', handleScroll, true);

        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout();
        }
    });

    const handleScroll = () => {
        var percent = 1 - framer.scrollTop / (postFramer.clientHeight - framer.clientHeight);
        setLoadPercent(percent);

        //console.log( framer.scrollTop / postFramer.clientHeight)
        if(framer.scrollTop / (postFramer.clientHeight - framer.clientHeight * 0.5) > 1){
            closer.click();
        }
    }
    const animOut = (node, e, exit, entry) => {
        console.log("ouuut");
        anime({
            targets: '.framer',
            scrollTop: postFramer.clientHeight,
            duration: 200,
            easing: 'linear'
        })
    }
    return (
        <Layout>
            <div className="framer" ref={ref => setFramer(ref)}>
                <div className="pre-container" ref={ref => setPostFramer(ref)} style={{ borderColor: project.color }}>
                    <div className="container">
                        <header>
                            <TransitionLink to={ "/" }
                                exit={{
                                    trigger: ({ node, e, exit, entry }) => animOut(node, e, exit, entry),
                                    length: .2
                                }}
                                entry={{
                                    delay: .2
                                }}
                            >
                                <div className="closer" ref={ref => setCloser(ref)}>Close</div>
                            </TransitionLink>
                            <div className={"cover " + (deployed? "deployed" : "")} style={{ borderColor: project.color}}>
                                <Img  fluid={project.cover.localFile.childImageSharp.fluid} />
                            </div>
                            <h1 classname={(deployed? "deployed" : "")} style={{color: project.color}}>{project.name.text}</h1>
                            <h1 classname={(deployed? "deployed" : "")}>{project.name.text}</h1>
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
                                    <Img fluid={pic.picture.localFile.childImageSharp.fluid}/>
                                    {
                                        pic.text &&
                                        <div className="legend">{pic.text.raw[0].text}</div>
                                    }
                                    {
                                        !key &&
                                        <div className="middle">
                                            { project.abstract.text }
                                        </div>
                                    }
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="frame" style={{ borderColor: project.color, opacity: loadPercent}}></div>
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
                                        fluid(maxWidth: 800) {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                            }
                            text {
                                raw {
                                    text
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