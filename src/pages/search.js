import React, { useState, useRef } from "react";
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Typography from "@mui/material/Typography"
import Seo from "../components/seo"
import { Box, InputBase } from "@mui/material"

const Search = ({ data }) => {
  let posts = data.posts1.posts.nodes.concat(data.posts2.posts.nodes).concat(data.posts3.posts.nodes);
  let container = useRef(null);
  const executeScroll = () => container.current.scrollIntoView();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  let length = posts.length;
  let pages = Math.ceil(length / 10);

  const filterByValue = (array, string) => {
    return array.filter(item =>
      item.title.toLowerCase().includes(string.toLowerCase())
    );
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value); // Update the search variable
    console.log("Search value:", event.target.value);
    executeScroll();
    setCurrentPage(0); // Reset currentPage
    render(); // Re-render the component
  };

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      executeScroll();
      render(); // Re-render the component
    }
  };

  const handleNextClick = () => {
    if (currentPage + 1 < pages) {
      setCurrentPage(currentPage + 1);
      executeScroll();
      render(); // Re-render the component
    }
  };

  const filterAndSlicePosts = () => {
    const filteredPosts = filterByValue(posts, search);
    const startIndex = currentPage * 10;
    const endIndex = startIndex + 10;
    return filteredPosts.slice(startIndex, endIndex);
  };

  const render = () => {
    const filteredPosts = filterAndSlicePosts();

    return (
      <div ref={container} className="container">
        <Seo title={"Search"} />
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
                <InputBase
                  sx={{ flex: 1, fontSize: 14 }}
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchChange}
                  autoFocus
                />
                <svg
                  className="footerIcon"
                  version="1.1"
                  id="arrow-back"
                  x="0px"
                  y="0px"
                  viewBox="0 0 488 488"
                >
                  {/* ... */}
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
                onClick={handlePrevClick}
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
                onClick={handleNextClick}
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
            {filteredPosts.map(post => {
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
              );
            })}
          </div>
          <div className="innerContent ph">
            <div className={`${pages > 1 ? "navigationContainer" : "hide"}`}>
              <div
                className={`footerButton flex pr ${
                  currentPage === 0 ? "disabled" : "null"
                }`}
                onClick={handlePrevClick}
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
                onClick={handleNextClick}
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
                  {/* ... */}
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
    );
  };

  return render();
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

export default Search;
