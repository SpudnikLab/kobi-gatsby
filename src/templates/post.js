import React, { useRef, useState, useEffect } from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import Typography from "@mui/material/Typography"
import videojs from "video.js"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AppShortcutIcon from "@mui/icons-material/AppShortcut"


import Seo from "../components/seo"

const Category = ({ data, location }) => {
  let post = data.wpgraphql.postBy
  let posts = data.wpgraphql.posts.nodes
  let [showAudioPlayer, setShowAudioPlayer] = useState(false)
  let [prevPath, setPrevPath] = useState("")

  let container = useRef(null)
  const executeScroll = () => container.current.scrollIntoView()

  let selectedPosts = []

  let max = posts.length > 3 ? 3 : posts.length
  var random = []
  for (var i = 0; i < max; i++) {
    var temp = Math.floor(Math.random() * posts.length)
    if (random.indexOf(temp) === -1) {
      random.push(temp)
      selectedPosts.push(posts[temp])
    } else i--
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

  const useScript = url => {
    useEffect(() => {
      const script = document.createElement("script")

      script.src = url
      script.async = true

      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }, [url])
  }

  useScript("https://vjs.zencdn.net/7.17.0/video.min.js")
  // useScript("../review.js")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrevPath(window?.history.state?.prevPath)
    }
    setTimeout(function addComponent() {
      var player = videojs.getPlayer("audio-review")
      var controlBar = document.querySelector(".vjs-control-bar")
      var backward10 = document.createElement("div")
      backward10.className = "audio-player-btn audio-player-btn--backward"
      var forward10 = document.createElement("div")
      forward10.className = "audio-player-btn audio-player-btn--forward"

      controlBar.insertBefore(backward10, controlBar.childNodes[0])
      backward10.addEventListener("click", function (e) {
        e.preventDefault()
        player.currentTime(player.currentTime() - 10)
      })
      controlBar.appendChild(forward10)
      forward10.addEventListener("click", function (e) {
        e.preventDefault()
        player.currentTime(player.currentTime() + 10)
      })
    }, 1000)
  }, [])

  return (
    <div ref={container} className="container">
      <Seo title={post.title} />
      <style>
        {`
          @import url('https://vjs.zencdn.net/7.17.0/video-js.css');
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');

          body {
            margin: 0;
            font-family: 'Open Sans', sans-serif;
            font-weight: 400;
          }

          a {
            color: black;
            text-decoration: none;
          }

          footer {
            margin: 0 0 20px 0;
          }

          p {
            margin: 0 0 10px;
          }


          .contentContainer {
            padding: 40px 0 10px 0;
          }

          .pt{
            padding-top: 20px;
          }

          .similarAppsContainer {
            padding: 10px 0;
          }

          .postContent {
            margin-left: auto;
            margin-right: auto;
            max-width: 480px;
            padding: 0 15px;
          }

          .title {
            font-size: 18px;
            font-weight: 600;
            color: teal;
          }

          .icon {
            height: 48px;
            width: 48px;
            object-fit: contain;
            display: block;
            margin-right: auto;
            margin-left: auto;
            margin-bottom: 20px;
          }

          .excerpt {
            font-size: 15px;
          }

          .ratings {
            margin-top: 15px;
          }

          .ratingSmallContainer {
            display: flex;
            justify-content: flex-end;
            width: 170px;
          }

          .rating {
            display: inline-block;
            width: 70px;
            height: 14px;
            background: url(../images/rating.png) top left;
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

          .fileSize {
            fill: teal;
            display: flex;
            align-items: center;
            margin: 15px 0 0;
          }

          .workOffline {
            fill: teal;
            display: flex;
            align-items: center;
            margin: 5px 0 0;
          }

          .lastUpdated {
            font-size: 13px;
            margin-top: 15px;
          }

          .postButton {
            background-color: white;
            width: 100%;
            font-size: 18px;
            margin-bottom: 5px;
            padding: 8px;
            border: 2px solid teal;
            border-radius: 5px;
            color: teal;
            fill: teal;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 16px;
          }

          .postButton:hover {
            border: 2px solid #2d5750;
            color: #2d5750;
            fill: #2d5750;
            background-color: #f0f0f0;
          }

          .audio {
            margin: 15px 0;
            width: auto;
          }

          .audioIcon {
            height: 16px;
            width: 25px;
            margin-right: 10px;
          }

          .audio-player {
            margin-bottom: 16px;
          }

          .audio-player-btn {
            width: 33.3333%;
            height: 100%;
            cursor: pointer;
            border: solid 1px #fff !important;
          }
          .audio-player-btn:hover {
            background-color: #2d5750 !important;
          }
          .audio-player-btn--backward {
            border-width: 1px 2px 0 0 !important;
            background: url(../images/backward-10.png) no-repeat teal center/16px auto !important;
          }
          .audio-player-btn--forward {
            border-width: 1px 0 0 2px !important;
            background: url(../images/forward-10.png) no-repeat teal center/16px auto !important;
          }
          .audio-player .video-js {
            background: none;
          }
          .audio-player .video-js.vjs-fluid {
            height: 62.5px;
            padding: 0;
          }
          .audio-player .video-js .vjs-big-play-button {
            display: none;
          }
          .audio-player .video-js .vjs-control:focus {
            text-shadow: none;
          }
          .audio-player .video-js .vjs-progress-control {
            width: 100%;
            height: 10px;
            background: #008080;
          }
          .audio-player .video-js .vjs-progress-control .vjs-progress-holder {
            height: 100%;
            margin: 0;
            overflow: hidden;
            background: none;
          }
          .audio-player .video-js .vjs-progress-control .vjs-progress-holder:hover {
            font-size: 1em;
          }
          .audio-player .video-js .vjs-progress-control .vjs-play-progress {
            background: none;
          }
          .audio-player .video-js .vjs-progress-control .vjs-play-progress::before {
            transform: translateY(3px);
            display: inline-block;
            width: 6px;
            height: 100%;
            content: "";
            border-radius: 0;
            background: #f09969;
          }
          .audio-player .video-js .vjs-current-time,
          .audio-player .video-js .vjs-duration {
            font-size: 14px;
            line-height: 1.5;
            display: block;
            width: 50%;
            height: auto;
            padding: 0 5px;
            color: #031e1b;
            background: #4eb6ab;
          }
          .audio-player .video-js .vjs-current-time {
            float: left;
            text-align: left;
          }
          .audio-player .video-js .vjs-duration {
            float: right;
            text-align: right;
          }
          .audio-player .video-js .vjs-time-tooltip {
            font-size: 1em !important;
          }
          .audio-player .video-js .vjs-control-bar {
            display: flex;
            background: none;
            justify-content: space-between;
          }
          .audio-player .video-js .vjs-control-bar .vjs-play-control {
            width: 33.33%;
            border: solid 1px #fff;
            border-width: 1px 1px 0;
            background: #008080;
          }
          .audio-player .video-js .vjs-control-bar .vjs-play-control:hover {
            background-color: #2d5750;
          }

          .similarApps {
            background-color: #2d5750;
            color: white;
            text-align: center;
            font-size: 18px;
            padding: 5px 0px;
            width: 100%;
          }

          .innerContent {
            margin-left: auto;
            margin-right: auto;
            max-width: 350px;
            padding-right:20px;
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
      <div className="contentContainer">
        <div className="postContent">
          <div>
            <img
              src={post.featuredImage?.node?.mediaItemUrl}
              alt={post.title}
              className="icon"
            />
          </div>
          <Typography
            sx={{ fontSize: 18, fontWeight: 700, color: "teal" }}
            component="h1"
          >
            {post.title}
          </Typography>
          <div className="excerpt">{post.excerpt?parse(post.excerpt):""}</div>
          <div
            className="audio-player"
            style={{
              display:
                showAudioPlayer && post.appFields.audioReview?.mediaItemUrl
                  ? "block"
                  : "none",
            }}
          >
            <audio
              controls
              id="audio-review"
              className="video-js vjs-default-skin"
              height="125"
              preload="auto"
              data-setup='{"fluid":true,"progressControl":{"children":[],"SeekBar":{"children":["MouseTimeDisplay","PlayProgressBar"]}},"CurrentTimeDisplay":true,"DurationDisplay":true,"controlBar":{"children":["PlayToggle"]}}'
            >
              <source
                src={post.appFields.audioReview?.mediaItemUrl}
                type="audio/mpeg"
              />
            </audio>
          </div>
          <div
            className="postButton audio"
            onClick={() => setShowAudioPlayer(true)}
            onKeyDown={() => setShowAudioPlayer(true)}
            style={{
              display:
                showAudioPlayer || !post.appFields.audioReview?.mediaItemUrl
                  ? "none"
                  : "flex",
            }}
          >
            <svg className="audioIcon" viewBox="0 0 22 18">
              <path d="M5.8,3.6H2c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h3.8l7.2,3.6V0L5.8,3.6z M5,11.6H2v-6h3V11.6z M11,14l-4-2V5.2l4-2V14z" />
              <path d="M18.7,0.1c2,2,3.3,5.1,3.3,8.5s-1.3,6.5-3.3,8.5l-1.6-1.3c1.8-1.6,2.9-4.3,2.9-7.3S18.9,3,17.1,1.3L18.7,0.1z" />
              <path d="M18,8.6c0-2.4-0.9-4.6-2.4-6.1L14,3.8c1.2,1.1,2,2.8,2,4.8c0,2-0.8,3.7-2,4.8l1.6,1.3C17.1,13.2,18,11,18,8.6z" />{" "}
            </svg>

            <div>Play audio review</div>
          </div>
          <div className="goodFor">
            <Typography
              sx={{ fontSize: 15, fontWeight: 600 }}
              component="strong"
            >
              Good for:
            </Typography>
            {post.appFields.goodFor?parse(post.appFields.goodFor):""}
          </div>
          <div className="howItWorks">
            <Typography
              sx={{ fontSize: 15, fontWeight: 600 }}
              component="strong"
            >
              How it works:
            </Typography>
            {/* {post.appFields.howItWorks} */}
            {post.appFields.howItWorks?parse(post.appFields.howItWorks):""}
          </div>
          <div className="theGood">
            <Typography
              sx={{ fontSize: 15, fontWeight: 600 }}
              component="strong"
            >
              The good:
            </Typography>
            {post.appFields.theGood?parse(post.appFields.theGood):""}
          </div>
          <div className="theBad">
            <Typography
              sx={{ fontSize: 15, fontWeight: 600 }}
              component="strong"
            >
              The bad:
            </Typography>
            {post.appFields.theBad?parse(post.appFields.theBad):""}
          </div>
          <div className="ratings">
            <div>
              <Typography
                sx={{ fontSize: 15, fontWeight: 600, marginRight: "10px" }}
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
          <div
            className="fileSize"
            style={{ display: post.appFields.fileSize ? "flex" : "none" }}
          >
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
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
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
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {post.appFields.worksOffline
                ? "Works offline"
                : "Does Not work offline"}
            </Typography>
          </div>
          {post.appFields.dataUsage === "1" ? (
            <div className="workOffline">
              <svg
                className="footerIcon"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 512 484.2"
              >
                <path
                  d="M505.4,407.5l-210-383.1C287.1,9.4,272,0,256,0s-31.1,9.4-39.4,24.5L6.6,407.5c-8.6,15.6-8.8,35.1-0.7,51
                  c8.1,15.9,23.5,25.7,40.1,25.7h420c16.6,0,31.9-9.9,40.1-25.7C514.2,442.7,514,423.1,505.4,407.5z M458.3,423.8
                  c-2,3.9-5.8,6.4-9.9,6.4H69.5c-4.1,0-7.9-2.4-9.9-6.4c-2-3.9-2-8.8,0.2-12.7L249.1,65.6c2.1-3.7,5.8-6.1,9.8-6.1
                  c4,0,7.7,2.3,9.8,6.1l189.4,345.5C460.3,415,460.3,419.8,458.3,423.8z"
                />
                <path
                  d="M259.1,161.6c-16,0-28.5,6.5-28.5,18.1c0,35.3,5.5,86,5.5,121.3c0,9.2,10.6,13.1,23.1,13.1c9.4,0,22.7-3.9,22.7-13.1
                  c0-35.3,5.5-86,5.5-121.3C287.2,168.1,274.3,161.6,259.1,161.6z"
                />
                <path
                  d="M259.1,331.7c-14.6,0-25.6,11.7-25.6,25.7c0,13.7,11,25.7,25.6,25.7c13.6,0,25.3-12,25.3-25.7
                  C284.4,343.4,272.7,331.7,259.1,331.7z"
                />
              </svg>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                This app uses a lot of data
              </Typography>
            </div>
          ) : null}

          {post.appFields.appVersion ? (
            <div className="workOffline">
              <AppShortcutIcon
                sx={{
                  fontSize: 16,
                  // height: "15px",
                  width: "16px",
                  marginRight: "10px",
                  fill: "#2d5750",
                }}
              />
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {`Version Reviewed:  ${post.appFields.appVersion}`}
              </Typography>
            </div>
          ) : null}
          {post.appFields.reviewDate ? (
            <div className="workOffline">
              <CalendarMonthIcon
                sx={{
                  fontSize: 16,
                  // height: "15px",
                  width: "16px",
                  marginRight: "10px",
                  fill: "#2d5750",
                }}
              />
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {`Review Date:  ${post.appFields.reviewDate}`}
              </Typography>
            </div>
          ) : null}
          <div className="lastUpdated">
            Last Updated: {getDate(post.dateGmt)}
          </div>
        </div>
      </div>
      <div className="similarApps">
        <div className="innerContent">
          <Typography
            component="h1"
            sx={{ textTransform: "uppercase", fontWeight: 600 }}
          >
            Similar Apps
          </Typography>
        </div>
      </div>
      <div className="similarAppsContainer">
        <div className="innerContent">
          {selectedPosts.map(post => {
            return (
              <Link key={post.slug} to={`/${post.slug}`}>
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
      </div>
      <footer>
        <div className="innerContent">
          <Link
            to={
              prevPath === "search"
                ? "/search"
                : `/categories/${post.categories.nodes[0].name.toLowerCase()}`
            }
          >
            <div className="postButton">
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
              <div>
                Back to{" "}
                {`${
                  prevPath === "search"
                    ? "Search"
                    : post.categories.nodes[0].name
                }`}
              </div>
            </div>
          </Link>
          <div
            className="postButton"
            onClick={executeScroll}
            onKeyDown={executeScroll}
          >
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
  query getPost($slug: String!, $category: String!) {
    wpgraphql {
      posts(where: { categoryName: $category }, first: 50) {
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
      postBy(slug: $slug) {
        appFields {
          audioReview {
            mediaItemUrl
          }
          dataUsage
          fileSize
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
          reviewDate
          appVersion
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
