import React, { useRef, useState } from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import ReactHtmlParser from "react-html-parser"
import VideoJS from "../components/videoJS"
import Typography from "@mui/material/Typography"

import "../styles/post.css"
import Seo from "../components/seo"

const Category = ({ data }) => {
  let post = data.wpgraphql.postBy
  let [showAudioPlayer, setShowAudioPlayer] = useState(false)

  let container = useRef(null)
  const executeScroll = () => container.current.scrollIntoView()

  const playerRef = React.useRef(null)

  // let x = {
  //   fluid: true,
  //   progressControl: {
  //     children: [],
  //     SeekBar: { children: ["MouseTimeDisplay", "PlayProgressBar"] },
  //   },
  //   CurrentTimeDisplay: true,
  //   DurationDisplay: true,
  //   controlBar: { children: ["PlayToggle"] },
  // }

  const videoJsOptions = {
    fluid: true,
    progressControl: {
      children: [],
      SeekBar: { children: ["MouseTimeDisplay", "PlayProgressBar"] },
    },
    CurrentTimeDisplay: true,
    DurationDisplay: true,
    controlBar: { children: ["PlayToggle"] },
    sources: [
      {
        src: post.appFields.audioReview.mediaItemUrl,
        type: "audio/mpeg",
      },
    ],
  }

  const handlePlayerReady = player => {
    playerRef.current = player

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting")
    })

    player.on("dispose", () => {
      console.log("player will dispose")
    })
  }

  function getDate(str) {
    var monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    var date = new Date(str),
      month = monthList[date.getMonth()],
      day = ("0" + date.getDate()).slice(-2)
    return [day, month, date.getFullYear()].join(" ")
  }
  console.log(data)
  return (
    <div ref={container} className="container">
      <Seo title={post.title} />
      <div className="contentContainer">
        <div className="postContent">
          <div>
            <img
              src={post.featuredImage.node.mediaItemUrl}
              alt={post.title}
              className="icon"
            />
          </div>
          <Typography
            sx={{ fontSize: 18, fontWeight: 600, color: "teal" }}
            component="h1"
          >
            {post.title}
          </Typography>
          <div className="excerpt">{ReactHtmlParser(post.excerpt)}</div>
          {showAudioPlayer ? null : (
            <button
              className="footerButton audio"
              onClick={() => setShowAudioPlayer(true)}
              onKeyDown={() => setShowAudioPlayer(true)}
            >
              <svg className="audioIcon" viewBox="0 0 22 18">
                <path d="M5.8,3.6H2c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h3.8l7.2,3.6V0L5.8,3.6z M5,11.6H2v-6h3V11.6z M11,14l-4-2V5.2l4-2V14z" />
                <path d="M18.7,0.1c2,2,3.3,5.1,3.3,8.5s-1.3,6.5-3.3,8.5l-1.6-1.3c1.8-1.6,2.9-4.3,2.9-7.3S18.9,3,17.1,1.3L18.7,0.1z" />
                <path d="M18,8.6c0-2.4-0.9-4.6-2.4-6.1L14,3.8c1.2,1.1,2,2.8,2,4.8c0,2-0.8,3.7-2,4.8l1.6,1.3C17.1,13.2,18,11,18,8.6z" />{" "}
              </svg>

              <div>Play audio review</div>
            </button>
          )}
          {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
          {/* post.appFields.audioReview.mediaItemUrl */}
          <div className="goodFor">
            <Typography
              sx={{ fontSize: 15, fontWeight: 600 }}
              component="strong"
            >
              Good for:
            </Typography>
            {ReactHtmlParser(post.appFields.goodFor)}
          </div>
          <div className="howItWorks">
            <Typography
              sx={{ fontSize: 15, fontWeight: 600 }}
              component="strong"
            >
              How it works:
            </Typography>
            {ReactHtmlParser(post.appFields.howItWorks)}
          </div>
          <div className="theGood">
            <Typography
              sx={{ fontSize: 15, fontWeight: 600 }}
              component="strong"
            >
              The good:
            </Typography>
            {ReactHtmlParser(post.appFields.theGood)}
          </div>
          <div className="theBad">
            <Typography
              sx={{ fontSize: 15, fontWeight: 600 }}
              component="strong"
            >
              The bad:
            </Typography>
            {ReactHtmlParser(post.appFields.theBad)}
          </div>
          <div className="ratings">
            <div>
              <Typography
                sx={{ fontSize: 15, fontWeight: 500, marginRight: "10px" }}
                component="strong"
              >
                Overall ratings
              </Typography>
              <div className={`rating rate-${post.appFields.overallRating}`} />
            </div>
            <div className="ratingSmallContainer">
              <Typography
                sx={{ fontSize: 13, marginRight: "10px" }}
                component="span"
              >
                Works Well
              </Typography>
              <div
                className={`ratingSmall smallRate-${post.appFields.howEngagingItIs}`}
              />
            </div>
            <div className="ratingSmallContainer">
              <Typography
                sx={{ fontSize: 13, marginRight: "10px" }}
                component="span"
              >
                Engaging
              </Typography>
              <div
                className={`ratingSmall smallRate-${post.appFields.howEngagingItIs}`}
              />
            </div>
            <div className="ratingSmallContainer">
              <Typography
                sx={{ fontSize: 13, marginRight: "10px" }}
                component="span"
              >
                Looks Good
              </Typography>
              <div
                className={`ratingSmall smallRate-${post.appFields.looksGood}`}
              />
            </div>
          </div>
          <div className="fileSize">
            <svg
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 17 17"
              className="footerIcon"
            >
              <g id="filesize-icon">
                <path d="M11.9,6.36L9.29,8.96V0.58H7.71v8.38L5.1,6.36L3.98,7.48l4.52,4.52l4.52-4.52L11.9,6.36z M16.42,14.83v-3.17								h-1.58v3.17H2.17v-3.17H0.58v3.17c0,0.87,0.71,1.58,1.58,1.58h12.67C15.71,16.42,16.42,15.71,16.42,14.83z"></path>
              </g>
            </svg>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {`File Size:  ${post.appFields.fileSize}MB`}
            </Typography>
          </div>
          <div className="workOffline">
            <svg
              className="footerIcon"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 17.4 17.4"
            >
              <path d="M8.7,0C3.9,0,0,3.9,0,8.7s3.9,8.7,8.7,8.7s8.7-3.9,8.7-8.7S13.5,0,8.7,0z M8.7,15.8c-3.9,0-7.1-3.2-7.1-7.1c0-3.9,3.2-7.1,7.1-7.1c3.9,0,7.1,3.2,7.1,7.1C15.8,12.6,12.7,15.8,8.7,15.8z"></path>
              <g>
                <rect
                  x="7.9"
                  y="4.8"
                  transform="matrix(0.7071 0.7071 -0.7071 0.7071 8.71 -3.6078)"
                  width="1.5"
                  height="7.9"
                ></rect>
                <rect
                  x="7.9"
                  y="4.8"
                  transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 21.0278 8.7099)"
                  width="1.5"
                  height="7.9"
                ></rect>
              </g>
            </svg>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {post.appFields.worksOffline
                ? "Works offline"
                : "Does Not work offline"}
            </Typography>
          </div>
          <div className="lastUpdated">
            Last Updated: {getDate(post.dateGmt)}
          </div>
        </div>
      </div>
      <footer>
        <div className="innerContent">
          <Link
            to={`/categories/${post.categories.nodes[0].name.toLowerCase()}`}
          >
            <button className="footerButton">
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
              <div>{`Back to ${post.categories.nodes[0].name}`}</div>
            </button>
          </Link>
          <button
            className="footerButton"
            onClick={executeScroll}
            onKeyDown={executeScroll}
          >
            <svg className="footerIcon" x="0px" y="0px" viewBox="0 0 16 16">
              <g>
                <path d="M0.5,8l1.41,1.41L7.5,3.83V16h2V3.83l5.58,5.59L16.5,8l-8-8L0.5,8z"></path>
              </g>
            </svg>
            <div>Top of Page</div>
          </button>
        </div>
      </footer>
    </div>
  )
}

export const query = graphql`
  query getPost($slug: String!) {
    wpgraphql {
      postBy(slug: $slug) {
        appFields {
          audioReview {
            mediaItemUrl
          }
          fileSize
          giveItAMissIf
          goodFor
          howEngagingItIs
          howItWorks
          kaistoreLink
          looksGood
          overallRating
          theBad
          theGood
          worksOffline
          worksWellOnline
        }
        title
        slug
        excerpt
        categories {
          nodes {
            name
          }
        }
        dateGmt
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`

export default Category
