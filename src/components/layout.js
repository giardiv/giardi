/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
//import Footer from "./footer"
import Image from "./image"
import "./layout.css"

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)
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
          }
        }
      }
    }
  }
  `)
  console.log(projects)

  // TODO: keep the header?
  // TODO: appropriate way to import the image
  const projectsElements = projects.allPrismicProject.edges.map((item, key) =>
        <div className="project">
            <h1 style={{color: item.node.data.color}}>{item.node.data.name.text}</h1>
            <h1>{item.node.data.name.text}</h1>
            <div className="tag">development</div>
            <div className="tag">concept</div>
            <div className="year">2013</div>
        </div>
    );
  return (
    <>
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <div className="container">
        <div className="wheel">
          <div className="postcard">
            <Image />
          </div>
          <div className="postcard">
            <Image />
          </div>
          <div className="postcard">
            <Image />
          </div>
          <div className="postcard">
            <Image />
          </div>
          <div className="postcard">
            <Image />
          </div>
          <div className="postcard">
            <Image />
          </div>
          <div className="postcard">
            <Image />
          </div>
          <div className="postcard">
            <Image />
          </div>
          <div className="postcard">
            <Image />
          </div>
          <div className="postcard">
            <Image />
          </div>
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

