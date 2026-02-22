import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";

const Post = ({ post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { meta_author } = config.metadata;
  const author = post.frontmatter.author ? post.frontmatter.author : meta_author;
  return (
    <div className="post">
      <div className="relative">
        {post.frontmatter.image && (
          <ImageFallback
            className="rounded"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={405}
            height={208}
          />
        )}
        
      </div>
      <h3 className="h5 mb-2 mt-4">
        <Link
          href={`/${blog_folder}/${post.slug}`}
          className="block hover:text-primary"
        >
          {post.frontmatter.title}
        </Link>
      </h3>
      
      <p>{post.content.slice(0, Number(summary_length))}</p>
      <Link
        className="btn btn-outline-primary mt-4"
        href={`/${blog_folder}/${post.slug}`}
      >
        Read More
      </Link>
    </div>
  );
};

export default Post;
