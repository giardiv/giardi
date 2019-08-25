import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import injectStyle from '../utils/injectStyle';

import Footer from "./footer"
import Img from "gatsby-image"
import "./layout.css"

const Layout = ({ children }) => {
  const [wheelLevel, setWheelLevel] = useState(
    0
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
        }
      }
    }
  }
  `)


  // TODO: keep the header?
  // TODO: appropriate way to import the image
  // TODO: add a graphical signature indicating the current project in the wheel
  const projectsElements = projects.allPrismicProject.edges.map((item, key) =>
        <div className="project" id={key} onMouseEnter={event => setWheelLevel(key)}>
            <h1 style={{color: item.node.data.color}}>{item.node.data.name.text}</h1>
            <h1>{item.node.data.name.text}</h1>
            {
              item.node.data.tags.map((tag) => <div className="tag" style={{ borderColor: item.node.data.color}}>{tag.tag.raw.slug}</div>)
            }
            <div className="year" style={{ backgroundColor: item.node.data.color}}>{item.node.data.year}</div>
        </div>
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
  injectStyle(gradient);
  injectStyle(blockColor);

  console.log(gradient)
  return (
    <>
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <div className="container">
        <div className={"wheel level-" + wheelLevel}>
          {projectPictures}
        </div>
        <div className="store">
          {projectsElements}
        </div>
        <main>{children}</main>
        <Footer/>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

