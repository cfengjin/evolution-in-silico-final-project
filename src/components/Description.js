import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Description = () => {
  const { markdownRemark } = useStaticQuery(
    graphql`
      {
        markdownRemark(frontmatter: {title: {eq: "Description"}}) {
          html
          frontmatter {
            title
          }
        }
      }
    `
  )
  return (
    <section dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
  )
}

export default Description