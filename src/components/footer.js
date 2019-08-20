import PropTypes from "prop-types"
import React from "react"

const Footer = ({selfDescription}) => {
    <footer>
        Hybrid designer/developper
        Vincent Giardina
        <h1>Picture</h1>
        <p>{{ selfDescription }}</p>
        <h1>Credits</h1>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
}


Footer.propTypes = {
    selfDescription: PropTypes.string,
}

Footer.defaultProps = {
    selfDescription: ``,
}


export default Footer