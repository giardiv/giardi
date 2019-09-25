import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"


const Hey = () => {
    const pic = useStaticQuery(graphql`
    query {
        file(relativePath: { eq: "hand.png" }) {
            childImageSharp {
                fixed(width: 30, height: 30) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }`)

    return(
        <div className="hey"><Img fixed={pic.file.childImageSharp.fixed} /> hey@giardiv.com</div>
    )
    
}

export default Hey