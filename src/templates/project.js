import React, { useState, useLayoutEffect } from 'react';
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TransitionLink from "gatsby-plugin-transition-link"
import anime from "animejs"
import CloserImg from "../components/close"
import Img from "gatsby-image"
import { pctDecChars } from 'uri-js';


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

        if(framer.scrollTop / (postFramer.clientHeight - framer.clientHeight * 0.5) > 1){
            closer.click();
        }
    }
    const animOut = (node, e, exit, entry) => {
        anime({
            targets: '.framer',
            scrollTop: postFramer.clientHeight,
            duration: 200,
            easing: 'linear'
        })
    }

    const getEmbed = (id) => {
        switch (id) {
            case "family_photo_video":
                return(
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/XSaz2tk92Pw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                )
                break;
            case "nostalgia_video":
                return(
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/RakJu0ELd3M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                )
                break; 
            case "family_photo_stl":
                return(
                    <div></div>//<script src="https://embed.github.com/view/3d/giardiv/files/blob/master/photobooth-toulouse.stl"></script>
                )
                break;
            case "-":
                return(
                    ""
                )
                break;
            default:
                return(<div>Unrecognised embed id</div>)
                break;
        }
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
                                <div className="closer" ref={ref => setCloser(ref)}><CloserImg/></div>
                            </TransitionLink>
                            <div className={"cover " + (deployed? "deployed" : "")} style={{ borderColor: project.color}}>
                                <Img  fluid={project.cover.localFile.childImageSharp.fluid} />
                            </div>
                            <h1 classname={(deployed? "deployed" : "")} style={{color: project.color}}>{project.name.text}</h1>
                            <h1 classname={(deployed? "deployed" : "")}>{project.name.text}</h1>
                            <aside>
                                <div className="year" style={{backgroundColor: project.color}}>{project.year}</div>
                                <div className="abstract">{project.abstract.text} { (project.presentation.filter((pic) => pic.type == "link")[0]) && 
                                <a target="_blank" className="button" href={project.presentation.filter((pic) => pic.type == "link")[0].embed_id}>{project.presentation.filter((pic) => pic.type == "link")[0].text.raw[0].text}</a>} </div>
                            </aside>
                        </header>
                        <div className="infos">
                            <div className="row">
                                <span style={{backgroundColor: project.color}}></span>
                                <div className="label">I did</div>
                                <div className="value" style={{borderBottomColor: project.color}}>{project.tags}</div>
                            </div>
                            { project.with &&
                            <div className="row">
                                <span style={{backgroundColor: project.color}}></span>
                                <div className="label">With</div>
                                <div className="value">{project.with}</div>
                            </div> }
                            { project.for &&
                            <div className="row">
                                <span style={{backgroundColor: project.color}}></span>
                                <div className="label">For</div>
                                <div className="value">{project.for}</div>
                            </div> }
                        </div>
                        <div className="presentation">
                            {project.presentation.map((pic, key) => 
                                <div>
                                    {
                                        (pic.type == "image") && 
                                        <Img className={pic.picture.localFile.childImageSharp.fluid.aspectRatio < 1 ? "portrait" : "landscape"} fluid={pic.picture.localFile.childImageSharp.fluid}/>
                                    }
                                    {
                                        (pic.type == "gif") && 
                                        <img src={pic.picture.localFile.publicURL} />
                                    }
                                    {
                                        (pic.type == "embed") && 
                                        getEmbed(pic.embed_id)
                                    }
                                    {
                                        (pic.text.raw && pic.type != "link") &&
                                        pic.text.raw.map((raw) => { return(
                                            <div className={ "legend " + pic.text_length}>{raw.text}</div>)
                                        })
                                    }
                                    {
                                        pic.type == "link" &&
                                        <a className="button" href={pic.embed_id} target="_blank">{pic.text.raw[0].text}</a>
                                    }
                                </div>
                            )}
                        </div>
                        <div className="step-gradient"></div>
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
                                    publicURL
                                    childImageSharp {
                                        fluid(maxWidth: 800) {
                                            aspectRatio
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
                            embed_id
                            text_length
                            type
                        }
                    }
                    slugs
                    uid
                }
            }
        }
    }
    `
