import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import injectStyle from '../utils/injectStyle';
import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import anime from "animejs"

import Footer from "./footer"
import Img from "gatsby-image"
import "./layout.css"

const Layout = ({ children }) => {
  const [wheelLevel, setWheelLevel] = useState(
    0
  );

  const STATUS_MENU = "menu";
  const STATUS_TRANSITION = "transition"
  const STATUS_PROJECT = "project"
  const [status, setStatus] = useState(
    STATUS_MENU
  );

  const projects = useStaticQuery(graphql`
  query {
    allPrismicProject {
      edges {
        node {
          data {
            color
            for
            name {
              text
            }
            with
            year
            tags {
              tag {
                raw {
                  slug
                }
              }
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
        }
      }
    }
  }
  `)


  // TODO: keep the header?
  // TODO: appropriate way to import the image
  // TODO: add a graphical signature indicating the current project in the wheel  

  const projectsElements = projects.allPrismicProject.edges.map((item, key) =>{
          const animOut = (node, e, exit, entry) => {
            setStatus(STATUS_TRANSITION);
          }
          const animIn = (node, e, exit, entry) => {
            setStatus(STATUS_PROJECT);
          }
          return(
            <TransitionLink to={ "/" + item.node.slugs[0] }
            exit={{
              trigger: ({ node, e, exit, entry }) => animOut(node, e, exit, entry),
              length: 0.5,
              state: {
                mode: "in"
              }
            }}
            entry={{
              trigger: ({ node, e, exit, entry }) => animIn(node, e, exit, entry),
              length: 0.5,
              delay: 0.5
            }}
            >
              <div className="project" id={key} onMouseEnter={event => setWheelLevel(key)}>
                  <h1 style={{color: item.node.data.color}}>{item.node.data.name.text}</h1>
                  <h1>{item.node.data.name.text}</h1>
                  {
                    item.node.data.tags.map((tag) => <div className="tag" key={tag.tag.raw.slug+key} style={{ borderColor: item.node.data.color}}>{tag.tag.raw.slug}</div>)
                  }
                  <div className="year" style={{ backgroundColor: item.node.data.color}}>{item.node.data.year}</div>
              </div>
            </TransitionLink>
          )
        }
    );
  
  const projectPictures = projects.allPrismicProject.edges.map((item, key) =>
        <div className="postcard">
            <Img className={ key == wheelLevel ? "selected" : "" } style={{ borderColor: item.node.data.color}} fluid={item.node.data.cover.localFile.childImageSharp.fluid} />
        </div>
  );

  const gradientSteps = projects.allPrismicProject.edges.map((item, key) => {
    const n = projects.allPrismicProject.edges.length
    const p = Math.round(key * (100 / n));
    return(p + "% {background-color: " + item.node.data.color +";}")
  })
  const gradient = `
    @keyframes gradient {
      `+ gradientSteps.join(" ") +`
    }
  `;
  const blockColor = `
    footer.open .block{
      background-color: ` + projects.allPrismicProject.edges[0].node. data.color + `;
    }
  `
  
  //useEffect(() => function() { }, []);
  //injectStyle(gradient); injectStyle(blockColor) 

  return (
    <>
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <div className="container">
        <div className={"wheel level-" + wheelLevel + "" + (status == STATUS_TRANSITION?" deployed":"")}>
          {projectPictures}
        </div>
        <div className={"store level-" + wheelLevel + "" + (status == STATUS_TRANSITION?" deployed":"")}>
          {projectsElements}
        </div>
        {/* TODO: write the good adress */}
        <div className="hey">bonjour@giardi.fr</div>
        <main className={(status == STATUS_PROJECT?"open":"")}>{children}</main>
        <Footer gradient={gradient} blockColor={blockColor}/>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

