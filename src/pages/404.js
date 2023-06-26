import React, { useRef } from "react"
import { Link } from "gatsby"

import "../styles/category.css"
import Seo from "../components/seo"
// import { div, InputBase } from "@mui/material"

const NotFoundPage = () => {
  let container = useRef(null)

  return (
    <div ref={container} className="container">
      <Seo title={"Search"} />

      <div
        className={`contentContainer`}
      >
        <div className="innerContent">
          <div
            style={{
              flexDirection: "column",
              width: "100%",
              textAlign: "center",
              alignItems: "center",
              padding: "10px",
              display: "flex",
            }}
          >
            <div className="logoContainer2"></div>
            Oops! Kobi can’t find what you’re looking for.
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
                viewdiv="0 0 16 16"
              >
                <g id="arrow-back-icon">
                  <path d="M16,7H3.8l5.6-5.6L8,0L0,8l8,8l1.4-1.4L3.8,9H16V7z" />
                </g>
              </svg>
              <div>Back to Home</div>
            </div>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default NotFoundPage
