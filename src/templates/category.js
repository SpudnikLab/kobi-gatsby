import React, { useRef, useState } from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Typography from "@mui/material/Typography"

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
            pointer-events: none;
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
            pointer-events: none;
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
          .rating {
            display: inline-block;
            width: 70px;
            height: 14px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABUCAYAAAA/MEEUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkYWUzNzA4YS04MDJkLTQyMDctODYxMC1lYzdmOTc2M2FmMTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0MwMTJBOTlENUFDMTFFQkEwQUU5RTFDMEJCQjIxNDkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0MwMTJBOThENUFDMTFFQkEwQUU5RTFDMEJCQjIxNDkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjMzMzRiZjktNWY1OS1mYzQ1LTg4OTEtMzExNmU4ZDYwZjExIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZmI5ZjhjY2ItYmIyMS0xMWViLWI2NWEtOTY4MDRmYzM5OWQ4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+BFuvUQAABehJREFUeNrs101oHGUcx/HfM8/M7Mtks9nsNm0qrdU2tLVvVloVrKCeelBaKJRCKfUgFkFQevTg0ZsXQazFQ/EmgpZSLIgeiqgtFWkiaFta0mSbNE22+5J9nZ2Xx/8mq41oU5NsdmeeycIy7O58d+Bh5v/wYaXhb2HYIzB79qLevQvcKsCNxKFd/SjJoglmbzmWYQAEvbmZQyj9FSq8H4JpUncKGi+mgJdvAU4Rth6BOz0G3bq+QS9cftwtZZnbCB0HSjlNtY6/XxJ3/L13j0FnNTC7AiEY6oJDG/06oW99NYG+7XDGrphm786qnhuEZk5S4sIWGl2MS90pULSZVXL1BDTUoU5dhqrkU4gOAMYAuJJLqVOD0M1RuKE1dG4IM43knao4NY7KiAbLVqB3M6M+orJ1+2JAz8wtpa/a3KWNn+0VQq0jlBesnnV5eKDuMgcydyxz7uDu5KbdCpJbIWo5sO611OylJNx8QGtAcZAOxdnVnL6F7C9nIUI9rsydWopvSzsWW59MbWFc2UgnlpvvUjNUgRj9UawHDm7j3vAllIxtd0JGjyNzx9LXvoGZu67x6pWB1dv2RSJ9z9KIZjNDiCZXYz7TQUV16mekfzhTM91NN6MbD5qhaFjqjp986wB9b7i2GZ7Sxr/oihhjIRrjgJ2n7S1Dx2G6zb5H6dp3xenptde0+EaHheJQVUfuLjpymrayEoTNEObZusj8CMZGaTLrs6vqVOjOu48Iolb/ahpkGIJbuwk2NSl1pyrlcYjGSa5CH2o9bLoKt1rG/axNmUCql4NzG6oVoYewS6H93VVEHqI8KXWnuuo6euRCjb09xou31WLGxJQbQVGJTYhoVBTvF/tXuwUYhkXbXS5Ws3lBob/kknfqdGaCQhXczifypkA5nKqKWHxE19Uy747CQjKfnoiuD92ZNJhRSLihVQXm0gVrcnfst4+fmB3QihvnvdEwj4TvwRJwXLKDEQY3yBb0e3XsXp+dteqKFss3Aq2x3UncsXl0fZz0GSJ9nl7R9T/1eYb0+Snpk6/o+oE+D5E+Dzf1eYv0Obii61l9npijzzeDqutu0udjpM8w6TNE+kyRPl+eo88XSJ9HSJ/jpM8q6bNK+kyTWkuy67pC+owsQq3PyK7rt0mfp0if2gL0eZLUmg6CrvtJnxdIn7seoc8bpM/9pM/hoOi6RPo8Rfp8nvS56SH6vEj63EP6zAdR16Pz6PNuUHWtkD4PzaPPA6TPKO3vlaDp+kXSZ3KOPj8gfdqkz/eb+oyQPl8hfZ4Pmq6PNPU5RPo8Qfq81NTnWdLnJ6TP50ifh0mf54Om69dIn5tJnx+SPsV/6PMd0ucw6fPciq4Xp2spVL4cupZC5bMLQ1O7sZJa4Q845Slw0jXb8Tqw/Sj42IWjdSp5bmj2eeWRBxdsXZeY0/V6oWu1rqVR+VJ0LWRW+VJ0XZVZ5UvRdUFmlS9V19KqfKm6llflLdK1dCpvha6lVHkrdC2lyluhaylV3gpdS6lyL+naUyr3kq49pXKv6NpzKveKrj2n8k7o2hcq74SufaHyTujaFyrvlK49r/JO6dr7Ku+wrj2r8k7q2tMq76SuPa3yTura2yp/Yz/9aFVhwlGcVOJXtSd2nIPdEa4NxhnUsDbBYsZnlbrIV/L2T5bFrpumBYfc0aEO1FWou02dNaezqMtQ51BXpq62lE4GXS+LymXQ9bKo3O+6XjaV+13Xy6ZyP+m6rSr3k67bqnI/6bqtKvebrtumchX0CKrGmrtWfefT1aHPL0R2DO5HYg91zVtN0OraN1C7efWi7a5/SY9voK2tSluf7afOou536gao635IV6Tuxl+dX3W97Cr3o67bonI/6rotKvejrtujch/qui0qD7Ku5+2CrOt5u6Dq+pFdUHX9yC4Iul5UFwRdL6oLgq4X1QVF1wvugqLrBXdB0/X/73JfPjWjT0Fq7dIyk3qfSLqa+i992sVIteg8mWqolaYYRHZS6i5Iul5QFyRdL6wLkK4X1P0pwACiAmwgmkpgmgAAAABJRU5ErkJggg==) top left;
            vertical-align: middle;
            margin-bottom: 4px;
          }
          
          .ratingSmall {
            display: inline-block;
            width: 60px;
            height: 13px;
            background: url(../images/rating-small.png) top left;
            vertical-align: middle;
            margin-bottom: 4px;
          }
          
          .rate-5 {
            background-position: 0 -70px;
          }
          .rate-4 {
            background-position: 0 -56px;
          }
          .rate-3 {
            background-position: 0 -42px;
          }
          .rate-2 {
            background-position: 0 -28px;
          }
          .rate-1 {
            background-position: 0 -14px;
          }
          
          .smallRate-5 {
            background-position: 0 -65px;
          }
          .smallRate-4 {
            background-position: 0 -52px;
          }
          .smallRate-3 {
            background-position: 0 -39px;
          }
          .smallRate-2 {
            background-position: 0 -26px;
          }
          .smallRate-1 {
            background-position: 0 -13px;
          }       
        `}
      </style>
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
                    src={post.featuredImage?.node?.mediaItemUrl}
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
