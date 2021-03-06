import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"


const HeadPic = () => {
    const pic = useStaticQuery(graphql`
    query {
        file(relativePath: { eq: "face.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
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