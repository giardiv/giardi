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
                <div className="links">
                    <a href={profile.prismicProfile.data.resume.url} className="file" target="_blank">Résumé</a>
                    <a href={profile.prismicProfile.data.linkedin.url} target="_blank">LinkedIn</a>
                    <a href="https://www.behance.net/giardi" target="_blank">Behance</a>
                    <a href="https://www.instagram.com/giardiii/" className="right" target="_blank">Instagram</a>
                </div>
                <h1>Credits</h1>
                <div className="credits">
                    © {new Date().getFullYear()} Vincent Giardina, design and development<br></br>
                    Built with Gatsby
                </div>
            </div>
            <div className="step-gradient"></div>
            <div className="footer-closer" onClick={event => setDeployed(false)}></div>
        </footer>
    )
}

export default Footer