import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import parseMDX from "@lib/utils/mdxParser";

const { blog_folder } = config.settings;

const ServiceDetailPage = ({
  post,
  mdxContent,
  slug,
  posts,
  currentPath,
}) => {
  const { frontmatter, content } = post;

  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      slug={slug}
      posts={posts}
      currentPath={currentPath}
    />
  );
};

export const getStaticPaths = () => {
  const allSlug = getSinglePage(`content/${blog_folder}`);
  const paths = allSlug.map((item) => ({
    params: {
      single: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const posts = getSinglePage(`content/${blog_folder}`);
  const post = posts.find((p) => p.slug === single);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const mdxContent = await parseMDX(post.content);

  return {
    props: {
      post: post,
      mdxContent: mdxContent,
      slug: single,
      posts: posts,
      currentPath: `/services/${single}`,
    },
  };
};

export default ServiceDetailPage;
