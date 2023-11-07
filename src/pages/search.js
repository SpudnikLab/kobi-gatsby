import React, { useRef, useState } from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Typography from "@mui/material/Typography"

// import "../styles/category.css"
import Seo from "../components/seo"
import { Box, InputBase } from "@mui/material"

const Search = ({ data }) => {
  let posts = data.posts1.posts.nodes.concat(data.posts2.posts.nodes).concat(data.posts3.posts.nodes);
  let container = useRef(null)
  const executeScroll = () => container.current.scrollIntoView()

  let [search, setSearch] = useState("")

  function filterByValue(array, string) {
    return array.filter(item =>
      item.title.toLowerCase().includes(string.toLowerCase())
    )
  }

  let filteredPosts = filterByValue(posts, search)

  let length = filteredPosts.length
  let [currentPage, setCurrentPage] = useState(0)
  let pages = Math.ceil(length / 10)

  const handleSearch = (newSearch) => {
    setSearch(newSearch);
  }

  return (
    <div ref={container} className="container">
      <Seo title={"Search"} />
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
      <header className="header">
        <Box className={`searchHeader ${pages > 1 ? "pb0" : null}`}>
          <div className="innerContent">
            <Box
              sx={{
                border: "2px solid teal",
                borderRadius: "8px",
                paddingLeft: 1,
                display: "flex",
                alignItems: "center",
                height: 35,
              }}
            >
              <Link to={`/search?searchInput=${search}`} onClick={executeScroll}>
                <InputBase
                  sx={{ flex: 1, fontSize: 14 }}
                  placeholder="Search"
                  value={search}
                  autoFocus
                  onChange={event => handleSearch(event.target.value)}
                />
              </Link>
              <svg
                className="footerIcon"
                version="1.1"
                id="arrow-back"
                x="0px"
                y="0px"
                viewBox="0 0 488 488"
              >
                <g>
                  <g>
                    <path
                      d="M488,445c-45.3-45.7-90.6-91.3-136-137c8.9-14.9,20.9-38.4,28-69.2c0,0,6-24.7,6-47.5C386,85.9,299.5,0.2,193.1,0.2
                        S0,86,0,191.4s86.5,191.1,192.9,191.1c26.6,0,52.6-7.2,52.6-7.2c24.7-6.9,43.3-17.5,55.3-25.5c47.7,46.1,95.5,92.1,143.2,138.2
                        c10.4,1.9,18.5,0.8,23.5-0.2c5.7-1.2,10.4-2.2,14.3-6.1c4-4,5-8.7,6.1-14.3C488.9,462.6,489.9,454.8,488,445z M64.5,191.2
                        c0-71.1,58.6-129,130.5-129s130.5,57.8,130.5,129s-58.6,129-130.5,129S64.5,262.2,64.5,191.2z"
                    />
                  </g>
                </g>
              </svg>
            </Box>
          </div>
        </Box>
        <div className={`${pages > 1 ? "paginationHeader" : "hide"}`}>
          <div className="innerContent">
            Page {currentPage + 1} / {pages}
          </div>
        </div>
      </header>
      <div
        className={`contentContainer search ${
          pages > 1 ? "withPagination" : null
        }`}
      >
        <div className="innerContent ph">
          <div className={`${pages > 1 ? "navigationContainer" : "hide"}`}>
            <div
              className={`footerButton flex pr ${
                currentPage === 0 ? "disabled" : "null"
              }`}
              onClick={() => [
                currentPage > 0 ? setCurrentPage(currentPage - 1) : null,
                executeScroll(),
              ]}
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
                currentPage + 1 === pages ? "disabled" : "null"
              }`}
              onClick={() => [
                currentPage + 1 < pages
                  ? setCurrentPage(currentPage + 1)
                  : null,
                executeScroll(),
              ]}
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
          <Box
            sx={{
              flexDirection: "column",
              width: "100%",
              textAlign: "center",
              alignItems: "center",
              padding: "10px",
              display: length > 0 ? "none" : "flex",
            }}
          >
            <div className="logoContainer2"></div>
            Oops! Kobi can’t find what you’re looking for.
          </Box>
          {filteredPosts
            .slice(currentPage * 10, currentPage * 10 + 10)
            .map(post => {
              return (
                <Link
                  key={post.slug}
                  to={`/${post.slug}`}
                  state={{ prevPath: "search" }}
                >
                  <div className="appContainer">
                    <img
                      src={post.featuredImage?.node?.mediaItemUrl}
                      alt={post.title}
                      className="appIcon"
                    />
                    <div>
                      <Typography
                        sx={{
                          fontSize: 16,
                          lineHeight: "20px",
                          fontWeight: 600,
                        }}
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
              onClick={() => [
                currentPage > 0 ? setCurrentPage(currentPage - 1) : null,
                executeScroll(),
              ]}
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
                currentPage + 1 === pages ? "disabled" : "null"
              }`}
              onClick={() => [
                currentPage + 1 < pages
                  ? setCurrentPage(currentPage + 1)
                  : null,
                executeScroll(),
              ]}
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
  query GetAllPosts {
    posts1: wpgraphql {
      posts(first: 100) {
        nodes {
          appFields {
            overallRating
          }
          slug
          title
          excerpt
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    posts2:wpgraphql {
      posts(first: 100, after:"YXJyYXljb25uZWN0aW9uOjIwOTc=") {
        nodes {
          appFields {
            overallRating
          }
          slug
          title
          excerpt
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    posts3:wpgraphql {
      posts(first: 100, after: "YXJyYXljb25uZWN0aW9uOjg4Nw==") {
        nodes {
          appFields {
            overallRating
          }
          slug
          title
          excerpt
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`

export default Search
