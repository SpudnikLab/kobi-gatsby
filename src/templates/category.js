import React, { useRef } from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Typography from "@mui/material/Typography"

import "../styles/category.css"
import Seo from "../components/seo"

const Category = ({ data }) => {
  let posts = data.wpgraphql.posts.nodes
  let path = window.location.pathname
  let category = path.split("/").pop()
  let capitalized = category.charAt(0).toUpperCase() + category.slice(1)

  let container = useRef(null)
  const executeScroll = () => container.current.scrollIntoView()
  return (
    <div ref={container} className="container">
      <Seo title={capitalized} />
      <header>
        <div className="pageTitle">
          <div className="innerContent">
            <Typography component="h1">{capitalized}</Typography>
          </div>
        </div>
      </header>
      <div className="contentContainer">
        <div className="innerContent">
          {posts.map(post => {
            return (
              <Link key={post.slug} to={`/${post.slug}`}>
                <div className="appContainer">
                  <img
                    src={post.featuredImage.node.mediaItemUrl}
                    alt={post.title}
                    className="appIcon"
                  />
                  <div>
                    <Typography
                      sx={{ fontSize: 18, lineHeight: "20px", fontWeight: 600 }}
                    >
                      {post.title}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      {post.excerpt.replace(/<\/?[^>]+(>|$)/g, "")}
                    </Typography>
                    <div
                      className={`rating rate-${post.appFields.overallRating}`}
                    />
                  </div>
                </div>
              </Link>
            )
          })}
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

export const query = graphql`
  query GetPostsByCategory($slug: String!) {
    wpgraphql {
      posts(
        where: { categoryName: $slug, orderby: { field: DATE, order: DESC } }
        first: 100
      ) {
        nodes {
          slug
          title
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          appFields {
            overallRating
          }
          excerpt
        }
      }
    }
  }
`

export default Category
