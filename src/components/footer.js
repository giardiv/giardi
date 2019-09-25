import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import HeadPic from "./headpic"

const Footer = (props) => {
    const [deployed, setDeployed] = useState(
        false
    );

    const profile = useStaticQuery(graphql`
    query {
        prismicProfile {
            data {
                bio {
                    raw {
                        text
                    }
                }
                github {
                    url
                }
                location
                title
                linkedin {
                    url
                }
                resume {
                    url
                }
            }
        }
    }`)

    return(
        <footer className={ deployed ? "open": ""}>
            <style>{props.gradient} {props.blockColor}</style>
            <div className="block" onClick={event => setDeployed(!deployed)}>
                <div className="position">{profile.prismicProfile.data.title}</div>
                <div className="location"><b>{profile.prismicProfile.data.location}</b> • able to relocate</div>
            </div>
            <div className="name" onClick={event => setDeployed(!deployed)}>Vincent Giardina</div>
            <div className="content">
                <HeadPic/>
                { profile.prismicProfile.data.bio.raw.map((p) => <p className="bio" key={"text-" + p.text}>{p.text}</p> ) }
                <h1>Profiles</h1>
                <a href={profile.prismicProfile.data.resume.url} classname="file" target="_blank">Résumé</a>
                <a href={profile.prismicProfile.data.linkedin.url} target="_blank">LinkedIn</a>
                <a href="https://www.instagram.com/giardiii/" classname="right" target="_blank">Instagram</a>
                {/* <h1>Credits</h1>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a> */}
            </div>
            <div className="step-gradient"></div>
        </footer>
    )
}

export default Footer