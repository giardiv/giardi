/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
//import Footer from "./footer"
import Image from "./image"
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
              item.node.data.tags.map((item) => <div className="tag">{item.tag.raw.slug}</div>)
            }
            <div className="year">{item.node.data.year}</div>
        </div>
    );
  
  const projectPictures = projects.allPrismicProject.edges.map((item, key) =>
        <div className="postcard">
            <Img fluid={item.node.data.cover.localFile.childImageSharp.fluid} />
        </div>
  );
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
      </div>
    </>
  )
}

// TODO: add the footer
// <Footer selfDescription="--- self description ---"/>

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

