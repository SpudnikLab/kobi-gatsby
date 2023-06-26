import React, { useRef } from "react"
import { Link } from "gatsby"
// import div from "@mui/material/div"

import "../styles/category.css"
import Seo from "../components/seo"
// import { StaticImage } from "gatsby-plugin-image"

const About = ({}) => {
  let container = useRef(null)
  const executeScroll = () => container.current.scrollIntoView()
  return (
    <div ref={container} className="container">
      <Seo title={"About"} />
      <header>
        <div className="pageTitle">
          <div className="innerContent">
            ABOUT US
          </div>
        </div>
      </header>
      <div className="contentContainer pt">
        <div className="postContent">

          <div className="logoContainer2"></div>
          <div
            style={{ fontSize: 18, fontWeight: 700, color: "teal" }}
            component="h1"
          >
            Hi! I'm Kobi
          </div>
          <p>Kobi reviews apps, especially for users of KaiOS phones.</p>
          <div
            style={{ fontSize: "1rem", fontWeight: 500, color: "teal" }}
            component="h1"
          >
            What are apps?
          </div>
          <p>
            ”App” is short for “mobile application”. Apps can help you do a
            variety of things, like message your friends (Whatsapp or Facebook),
            get information (Google Assistant), or just have fun playing games.
          </p>
          <div
            style={{ fontSize: "1rem", fontWeight: 500, color: "teal" }}
            component="h1"
          >
            Why use Kobi?
          </div>
          <p>
            There are a lot of apps available, but not all of them are good! We
            test the apps, and find the best ones so you don’t have to waste
            time downloading and trying different apps.
          </p>
          <p>
            
          <div
            style={{ fontSize: "1rem", fontWeight: 500, color: "teal" }}
            component="h1"
          >
            Current Version:
          </div>
            Kobi v.1.1
            (Updated 2022-04-26T02:56:43+00:00)
          </p>
        </div>
      </div>
      <footer>
        <div className="innerContent">
          <Link to="/">
            <div className="footerButton">
              <svg
                className="footerIcon"
                version="1.1"
                id="arrow-back"
                x="0px"
                y="0px"
                viewdiv="0 0 16 16"
              >
                <g id="arrow-back-icon">
                  <path d="M16,7H3.8l5.6-5.6L8,0L0,8l8,8l1.4-1.4L3.8,9H16V7z" />
                </g>
              </svg>
              <div>Back to Home</div>
            </div>
          </Link>
          <div className="footerButton" onClick={executeScroll}>
            <svg className="footerIcon" x="0px" y="0px" viewdiv="0 0 16 16">
              <g>
                <path d="M0.5,8l1.41,1.41L7.5,3.83V16h2V3.83l5.58,5.59L16.5,8l-8-8L0.5,8z"></path>
              </g>
            </svg>
            <div>Top of Page</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default About
