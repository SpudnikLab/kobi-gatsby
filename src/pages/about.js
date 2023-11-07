import React, { useRef } from "react"
import { Link } from "gatsby"
import Typography from "@mui/material/Typography"

import "../styles/category.css"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"

const About = ({}) => {
  let container = useRef(null)
  const executeScroll = () => container.current.scrollIntoView()
  return (
    <div ref={container} className="container">
      <Seo title={"About"} />
      <style>
        {`
          body {
            margin: 0;
            font-family: "Open Sans", sans-serif;
            font-weight: 100;
          }
          
          a {
            color: black;
            text-decoration: none;
          }
          
          footer {
            margin: 0 0 20px 0;
          }
          
          .header {
            position: fixed;
            width: 100%;z-index: 100;
          }
          
          .pageTitle {
            background-color: #2d5750;
            color: white;
            text-align: center;
            font-size: 14px;
            padding: 5px 0px;
            font-weight: 600;
          }
          
          .paginationHeader {
            background-color: #d9d9d9;
            color: #2d5750;
            text-align: center;
            height: 20px;
            /* text-transform: uppercase; */
            font-size: 14px;
            font-weight: 600;
            padding: 5px 0px;
          }
          
          .searchHeader {
            background-color: #d9d9d9;
            color: #2d5750;
            text-align: center;
            /* text-transform: uppercase; */
            font-size: 14px;
            font-weight: 600;
            padding: 10px;
          }
          
          .pb0{
            padding-bottom: 0;
          }
          
          .contentContainer {
            padding: 45px 0 10px 0;
          }
          
          
          .contentContainer.withPagination {
            padding: 65px 0 10px 0;
          }
          
          .contentContainer.withPagination.search {
            padding: 80px 0 10px 0;
          }
          
          
          .contentContainer.search {
            padding: 60px 0 10px 0;
          }
          
          .innerContent {
            margin-left: auto;
            margin-right: auto;
            max-width: 480px;
          }
          
          
          .appContainer {
            display: flex;
            padding: 15px;
            cursor: pointer;
          }
          
          .appContainer:hover {
            background-color: #d9ffff;
          }
          
          .appIcon {
            height: 35px;
            width: 35px;
            object-fit: contain;
            margin-right: 10px;
          }
          
          .ph{
            padding: 0 10px;
          }
          
          .hide{
            display:none;
          }
          
          .navigationContainer{
            margin: 10px 0;
            display:flex;
            justify-content: space-evenly;
          }
          
          .pr {
            margin-right: 8px;
          }
          
          .footerButton {
            margin-bottom: 5px;
            padding: 8px;
            border: 2px solid teal;
            border-radius: 5px;
            color: teal;
            fill: teal;
            display: flex;
            flex:1;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          
          
          .footerButton.disabled {
            border: 2px solid grey;
            color: grey;
            fill: grey;
            cursor: pointer;
          }
          
          .footerButton:hover {
            border: 2px solid #2d5750;
            color: #2d5750;
            fill: #2d5750;
            background-color: #f0f0f0;
          }
          
          
          .footerButton:hover.disabled {
            border: 2px solid grey;
            color: grey;
            fill: grey;
            background-color: #ffffff;
            cursor:context-menu;
          }
          
          .footerIcon {
            height: 15px;
            width: 15px;
            margin-right: 10px;
            fill: #2d5750;
          }
          .footerIcon.right {
            height: 15px;
            width: 15px;
            margin-left: 10px;
            transform: rotateY(180deg);
          }                   
        `}
      </style>
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
          <p>
            
          <Typography
            sx={{ fontSize: "1rem", fontWeight: 500, color: "teal" }}
            component="h1"
          >
            Current Version:
          </Typography>
            Kobi v.1.2
            (Updated 2023-10-31T02:56:43+00:00)
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
