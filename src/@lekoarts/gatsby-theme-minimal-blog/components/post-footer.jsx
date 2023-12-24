/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link, graphql, useStaticQuery } from "gatsby"
import { DiscussionEmbed } from "disqus-react"
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title"
// import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing"
import Listing from "./listing_vert"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"

export const query = graphql`
query MyQuery {
  allPost(sort: {date: DESC}, limit: 4) {
    edges {
      node {
        date(formatString: "DD.MM.yyyy")
        slug
        title
        excerpt
        description
        timeToRead
        tags {
          slug
          name
        }
      }
    }
  }
} 
`
const PostFooter = ({slug, title, post}) => {
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  }
  const { basePath, blogPath } = useMinimalBlogConfig()
  const data = useStaticQuery(query)
  const reshapedArray = data.allPost.edges.map(edge => edge.node);
  const filteredArray = reshapedArray.filter(item => item.slug !== post.slug);
  const limitedArray = filteredArray.slice(0, 3);
  return (
    <div>
      <DiscussionEmbed {...disqusConfig} sx={{ mb: [3, 4] }}/>
      <Title text="Latest Posts">
      <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>Read all posts</Link>
      </Title>
      <Listing posts={limitedArray} />
    </div>
  )
}

export default PostFooter
