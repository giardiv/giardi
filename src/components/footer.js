import React, { useState } from "react"

const Footer = () => {
    const [deployed, setDeployed] = useState(
        false
    );

    return(
        <footer className={ deployed && "open"}>
            <div className="block" onClick={event => setDeployed(!deployed)}>
                <div className="position">Hybrid designer-developper</div>
                <div className="location">! Stockholm</div>
            </div>
            <div className="name" onClick={event => setDeployed(!deployed)}>Vincent Giardina</div>
            <div className="content">
                <h1>Picture</h1>
                <p>---</p>
                <h1>Credits</h1>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
            </div>
        </footer>
    )
}


export default Footer