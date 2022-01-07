import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import "../styles/index.css"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  let items = data.wpgraphql.categories.nodes
  return (
    <div>
      <Seo title="Kobi" />
      <header>
        <div className="appHeader">
          <div className="innerContent">
            <div className="titleContainer">
              <div className="logoContainer" />
              <div className="textContainer">
                <Typography sx={{fontSize:24, lineHeight:"24px"}} component="h1">
                  Kobi
                </Typography>
                <Typography sx={{fontSize:15, lineHeight:"15px"}}  component="small">
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
            <Grid container sx={{marginBottom:"10px"}}>
              {items.map(category => {
                if (category.customCategories.icon) {
                  return (
                    <Grid item xs={6} key={category.slug}>
                      <Link to={`/categories/${category.slug}`} className="link">
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
          </section>
          <footer>
            <p>Kobi finds apps that help you live a better life.</p>
            <Link to="/pages/about">
              <div className="aboutButton">Learn about Kobi</div>
            </Link>
            <Box sx={{ display: { xs: "block", sm: "none" }, width:"180px", marginRight:"auto", marginLeft:"auto", fontSize:14, mt:2}}>
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
