import React, { useRef, useState } from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Typography from "@mui/material/Typography"

import "../styles/category.css"
import Seo from "../components/seo"

const Category = ({ data }) => {
  let posts = data.wpgraphql.posts.nodes
  let path
  let category
  let capitalized
  if (typeof window !== "undefined") {
    path = window.location.pathname
    category = path.split("/").pop()
    capitalized = category.charAt(0).toUpperCase() + category.slice(1)
  }

  let length = posts.length
  let [currentPage, setCurrentPage] = useState(0)
  let pages = Math.ceil(length / 10)

  let container = useRef(null)
  const executeScroll = () => container.current.scrollIntoView()
  return (
    <div ref={container} className="container">
      <Seo title={capitalized} />
      <header className="header">
        <div className="pageTitle">
          <div className="innerContent">
            <Typography component="h1">{capitalized}</Typography>
          </div>
        </div>
        <div className={`${pages > 1 ? "paginationHeader" : "hide"}`}>
          <div className="innerContent">
            Page {currentPage + 1} / {pages}
          </div>
        </div>
      </header>
      <div
        className={`contentContainer ${pages > 1 ? "withPagination" : null}`}
      >
        <div className="innerContent ph">
          <div className={`${pages > 1 ? "navigationContainer" : "hide"}`}>
            <div
              className={`footerButton flex pr ${
                currentPage === 0 ? "disabled" : "null"
              }`}
              onClick={() =>
                currentPage > 0 ? setCurrentPage(currentPage - 1) : null
              }
            >
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
              <div>Previous</div>
            </div>
            <div
              className={`footerButton flex ${
                currentPage+1 === pages ? "disabled" : "null"
              }`}
              onClick={() =>
                currentPage + 1 < pages ? setCurrentPage(currentPage + 1) : null
              }
            >
              <div>Next</div>
              <svg
                className="footerIcon right"
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
            </div>
          </div>
        </div>
        <div className="innerContent">
          {posts.slice(currentPage * 10, currentPage * 10 + 10).map(post => {
            return (
              <Link key={post.slug} to={`/${post.slug}`}  state={{prevPath:"/search"}}>
                <div className="appContainer">
                  <img
                    src={post.featuredImage.node.mediaItemUrl}
                    alt={post.title}
                    className="appIcon"
                  />
                  <div>
                    <Typography
                      sx={{ fontSize: 16, lineHeight: "20px", fontWeight: 600 }}
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
        <div className="innerContent ph">
          <div className={`${pages > 1 ? "navigationContainer" : "hide"}`}>
            <div
              className={`footerButton flex pr ${
                currentPage === 0 ? "disabled" : "null"
              }`}
              onClick={() =>
                currentPage > 0 ? setCurrentPage(currentPage - 1) : null
              }
            >
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
              <div>Previous</div>
            </div>
            <div
              className={`footerButton flex ${
                currentPage+1 === pages ? "disabled" : "null"
              }`}
              onClick={() =>
                currentPage + 1 < pages ? setCurrentPage(currentPage + 1) : null
              }
            >
              <div>Next</div>
              <svg
                className="footerIcon right"
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
            </div>
          </div>
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
