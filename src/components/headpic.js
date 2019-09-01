import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"


const HeadPic = () => {
    const pic = useStaticQuery(graphql`
    query {
        file(relativePath: { eq: "gatsby-icon.png" }) {
            childImageSharp {
                fixed(width: 75, height: 75) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }`)

    return(
        <Img fixed={pic.file.childImageSharp.fixed} />
    )
    
}

export default HeadPic