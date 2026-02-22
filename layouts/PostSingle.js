import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import InnerPagination from "@layouts/components/InnerPagination";
import dateFormat from "@lib/utils/dateFormat";
import { markdownify } from "@lib/utils/textConverter";
import { DiscussionEmbed } from "disqus-react";
import { MDXRemote } from "next-mdx-remote";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";
import Post from "./partials/Post";
import shortcodes from "./shortcodes/all";
const { disqus } = config;
const { meta_author } = config.metadata;

const PostSingle = ({
  frontmatter,
  content,
  mdxContent,
  slug,
  posts,
  allCategories,
  currentPath,
}) => {
  let { description, title, date, image, categories } = frontmatter;
  description = description ? description : content.slice(0, 120);

  const { theme } = useTheme();
  const author = frontmatter.author ? frontmatter.author : meta_author;
  // Local copy so we don't modify global config.
  let disqusConfig = config.disqus.settings;
  disqusConfig.identifier = frontmatter.disqusId
    ? frontmatter.disqusId
    : config.settings.blog_folder + "/" + slug;

  return (
    <Base title={title} description={description} currentPath={currentPath}>
      <section className="section single-blog mt-6">
        <div className="container">
          <div className="row">
            <div className="lg:col-12">
              <article>
                <div className="relative">
                  
                  {frontmatter.gallery && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    {frontmatter.gallery.map((img, index) => (
      <ImageFallback
        key={index}
        src={img}
        alt={`${title} ${index + 1}`}
        className="rounded-lg w-full h-auto"
      />
    ))}
  </div>
)}

                 
                </div>
                {config.settings.InnerPaginationOptions.enableTop && (
                  <div className="mt-4">
                    <InnerPagination posts={posts} date={date} />
                  </div>
                )}
                {markdownify(title, "h1", "lg:text-[42px] mt-4")}
                
                <div className="content mb-16">
                  <MDXRemote
                    {...mdxContent}
                    components={{
                      ...shortcodes,
                      img: ImageFallback,
                    }}
                  />
                </div>
                {config.settings.InnerPaginationOptions.enableBottom && (
                  <InnerPagination posts={posts} date={date} />
                )}
              </article>
              <div className="mt-16">
                {disqus.enable && (
                  <DiscussionEmbed
                    key={theme}
                    shortname={disqus.shortname}
                    config={disqusConfig}
                  />
                )}
              </div>
            </div>
            
          </div>
        </div>

        {/* Related posts */}
        <div className="container mt-20">
          
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;
