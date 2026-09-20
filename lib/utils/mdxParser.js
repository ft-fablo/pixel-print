import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// mdx content parser
const parseMDX = async (content) => {
  return await serialize(content);
};

export default parseMDX;
