import * as React from "react"
import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"

import Box from "@mui/material/Box"
// import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

// import "../styles/index.css"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  let items = data.wpgraphql.categories.nodes
  return (
    <div>
      <Seo title="Kobi" />
      <style>
        {`
          body {
            margin: 0;
            font-family:'Open Sans', sans-serif;
            font-weight: 100;
            font-size: 15px;
          }
          
          a{
            color: black;
            text-decoration: none;
          }
          
          footer{
            margin-top: 10px;
            text-align: center;
            padding:0 10px;
            display:"flex";
            flex-direction: column;
          }
          
          .appHeader {
            background-color: #2d5750;
          }
          
          .titleContainer{
            padding: 10px;
            height:60px;
            display: flex;
            align-items: center;
            color: white;
          }
          
          .logoContainer{
            min-height:58px;
            max-height: 58px;
            min-width:58px;
            max-width: 58px;
            border-radius: 5px;
            overflow: hidden;
            margin-right: 10px;
            background: url(https://demo-kobi-gokart.netlify.app/static/Kobi_Logo-75c3f61b32a9490ac733a26ee2376d69.svg);
          }
          .logoContainer2 {
            min-height: 150px;
            max-height: 150px;
            min-width: 150px;
            max-width: 150px;
            margin-left: auto;
            margin-right: auto;
            border-radius: 5px;
            background: url(https://demo-kobi-gokart.netlify.app/static/Kobi_Logo-75c3f61b32a9490ac733a26ee2376d69.svg);
            background-size: contain;
            background-repeat: no-repeat;
          }
          
          
          
          .textContainer{
            flex:1;
          }
          
          .categoriesHeader {
            background-color: #d9d9d9;
            color: #2d5750;
            text-align: center;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 600;
            padding: 5px 0px;
          }
          
          .innerContent {
            margin-left: auto;
            margin-right: auto;
            max-width: 480px;
          }
          
          .categoryContainer{
              padding: 10px 0
          }
          
          .categoriesButton {
              padding:5px;
              display: flex;
              flex-direction: column;
              align-items: center;
              font-size: 15px;
              line-height: 24px;
              cursor: pointer;
          }
          
          .categoriesButton:hover{
          background-color: #d9ffff;
          }
          
          .categoriesIcon{
              height: 30px;
              width: 30px;
              object-fit: contain;
          }
          
          .aboutButton{
            display: inline-block;
            background-color: teal;
            padding:10px;
            color:white;
            border-radius: 5px;
          }
          .aboutButton:hover{
            background-color: #2d5750;
          }
          
          .arrowContainer{
            min-height:24px;
            max-height: 24px;
            min-width:24px;
            max-width: 24px;
            margin-left: auto;
            margin-right: 40px;
            margin-top: 5px;
            background: url(../images/Arrow.svg);
            background-repeat: no-repeat;
          }
          .footerIcon {
            height: 15px;
            width: 15px;
            margin-right: 10px;
            fill: #2d5750;
          }
          
          .searchButton {
            margin: 0 10px 15px;
            padding: 8px;
            border: 2px solid teal;
            border-radius: 5px;
            color: teal;
            fill: teal;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .searchButton:hover {
            border: 2px solid #2d5750;
            color: #2d5750;
            fill: #2d5750;
            background-color: #f0f0f0;
          }
        `}
      </style>
      <header>
        <div className="appHeader">
          <div className="innerContent">
            <div className="titleContainer">
              <div className="logoContainer" />
              <div className="textContainer">
                <Typography
                  sx={{ fontSize: 24, lineHeight: "24px" }}
                  component="h1"
                >
                  Kobi
                </Typography>
                <Typography
                  sx={{ fontSize: 15, lineHeight: "15px" }}
                  component="small"
                >
                  Here to help you find useful apps
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="categoriesHeader">
          <div className="innerContent">Categories</div>
        </div>
      </header>
      <div className="categoryContainer">
        <div className="innerContent">
          <section>
            <Grid container sx={{ marginBottom: "10px" }}>
              {items.map(category => {
                if (category.customCategories.icon) {
                  return (
                    <Grid item xs={6} key={category.slug}>
                      <Link
                        to={`/categories/${category.slug}`}
                        className="link"
                      >
                        <div className="categoriesButton">
                          <img
                            src={category.customCategories.icon?.mediaItemUrl}
                            alt={category.name}
                            className="categoriesIcon"
                          />
                          {category.name}
                        </div>
                      </Link>
                    </Grid>
                  )
                }
              })}
            </Grid>
            <Link to="/search/">
              <div className="searchButton">
                <svg
                  className="footerIcon"
                  version="1.1"
                  id="arrow-back"
                  x="0px"
                  y="0px" viewBox="0 0 488 488">
                  <g>
                    <g>
                      <path d="M488,445c-45.3-45.7-90.6-91.3-136-137c8.9-14.9,20.9-38.4,28-69.2c0,0,6-24.7,6-47.5C386,85.9,299.5,0.2,193.1,0.2
                        S0,86,0,191.4s86.5,191.1,192.9,191.1c26.6,0,52.6-7.2,52.6-7.2c24.7-6.9,43.3-17.5,55.3-25.5c47.7,46.1,95.5,92.1,143.2,138.2
                        c10.4,1.9,18.5,0.8,23.5-0.2c5.7-1.2,10.4-2.2,14.3-6.1c4-4,5-8.7,6.1-14.3C488.9,462.6,489.9,454.8,488,445z M64.5,191.2
                        c0-71.1,58.6-129,130.5-129s130.5,57.8,130.5,129s-58.6,129-130.5,129S64.5,262.2,64.5,191.2z"/>
                    </g>
                  </g>
                  </svg>
                <div>Search</div>
              </div>
            </Link>
          </section>
          <footer>
            <p>Kobi finds apps that help you live a better life.</p>
            <Link to="/about">
              <div className="aboutButton">Learn about Kobi</div>
            </Link>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
                width: "180px",
                marginRight: "auto",
                marginLeft: "auto",
                fontSize: 14,
                mt: 2,
              }}
            >
              <span>Enjoying Kobi? Press Options & Pin to Top Sites!</span>
              <div className="arrowContainer" />
            </Box>
          </footer>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query GetCategories {
    wpgraphql {
      categories {
        nodes {
          customCategories {
            icon {
              mediaItemUrl
            }
          }
          slug
          name
        }
      }
    }
  }
`

export default IndexPage
