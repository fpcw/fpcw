import React from "react"
import {
  CarouselProvider,
  Slider,
  Slide,
  Dot,
} from "pure-react-carousel"

import { graphql, useStaticQuery } from "gatsby"

function Carousel() {
  const { reviews } = useStaticQuery(graphql`
    query {
      reviews: allContentfulReview(
        sort: { fields: createdAt, order: DESC }
        limit: 5
      ) {
        nodes {
          author
          content {
            content
            childMarkdownRemark {
              html
            }
          }
          link
        }
      }
    }
  `)

  return (
    <CarouselProvider
      naturalSlideWidth={600}
      naturalSlideHeight={350}
      totalSlides={reviews.nodes.length}
      isPlaying={true}
      interval={10000}
      dragEnabled={false}
      infinite={true}
      isIntrinsicHeight={true}
    >
      <Slider>
        {reviews.nodes.map(({ author, content, link }, i) => {
          return (
            <Slide index={i} key={i}>
              <div className="content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.childMarkdownRemark.html,
                  }}
                />
                <div style={{ textAlign: "right", marginTop: "2em" }}>
                  {" "}
                  <em>{author}</em>
                </div>
              </div>
            </Slide>
          )
        })}
      </Slider>
      <div className="has-text-centered" style={{ marginTop: "15px" }}>
        {reviews.nodes.map((n, i) => {
          return (
            <Dot
              className="button is-rounded is-small is-success"
              slide={i}
              style={{ margin: "2px" }}
              key={i}
            />
          )
        })}
      </div>
    </CarouselProvider>
  )
}

export default Carousel;
