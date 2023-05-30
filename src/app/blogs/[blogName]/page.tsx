import SingleBlog from "../../../../component/frontPage/SingleBlog/SingleBlog";

const BlogsNews = ({ params }: { params: { blogName: string } }) => {
  const decodedBlogName = decodeURI(params.blogName)
    .replace(/%20/g, " ")
    .replace(/3A/g, "")
    .replace(/:2C/g, ",")
    .replace(/%/g, ":");

  return (
    <>
      <SingleBlog blogName={decodedBlogName} />
    </>
  );
};

export default BlogsNews;
