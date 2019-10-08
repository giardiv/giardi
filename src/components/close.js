import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"


const CloserImg = () => {
    const pic = useStaticQuery(graphql`
    query {
        file(relativePath: { eq: "close.png" }) {
            childImageSharp {
                fixed(width: 30, height: 30) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }`)

    return(
        <Img fixed={pic.file.childImageSharp.fixed} />
    )
}

export default CloserImg