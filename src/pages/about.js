import React, { useRef } from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Typography from "@mui/material/Typography"

import "../styles/category.css"
import Seo from "../components/seo"

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
      <div className="contentContainer">
        <div className="postContent">
          <div>
            <img
              src={
                "https://kobi.spudniklab.com/wp-content/uploads/2021/05/kobi.svg"
              }
              alt={"Kobi Logo"}
              style={{ height: "auto", maxHeight: "150px", width: "100%" }}
            />
          </div>
          <Typography
            sx={{ fontSize: 18, fontWeight: 700, color: "teal" }}
            component="h1"
          >
            Hi! I'm Kobi
          </Typography>
          <p>Kobi reviews apps, especially for users of KaiOS phones.</p>
          <Typography
            sx={{ fontSize: "1rem", fontWeight: 500, color: "teal" }}
            component="h1"
          >
            What are apps?
          </Typography>
          <p>
            ”App” is short for “mobile application”. Apps can help you do a
            variety of things, like message your friends (Whatsapp or Facebook),
            get information (Google Assistant), or just have fun playing games.
          </p>
          <Typography
            sx={{ fontSize: "1rem", fontWeight: 500, color: "teal" }}
            component="h1"
          >
            Why use Kobi?
          </Typography>
          <p>
            There are a lot of apps available, but not all of them are good! We
            test the apps, and find the best ones so you don’t have to waste
            time downloading and trying different apps.
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
                viewBox="0 0 16 16"
              >
                <g id="arrow-back-icon">
                  <path d="M16,7H3.8l5.6-5.6L8,0L0,8l8,8l1.4-1.4L3.8,9H16V7z" />
                </g>
              </svg>
              <div>Back to Home</div>
            </div>
          </Link>
          <div className="footerButton" onClick={executeScroll}>
            <svg className="footerIcon" x="0px" y="0px" viewBox="0 0 16 16">
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
