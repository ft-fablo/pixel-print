import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Post = ({ post }) => {
  const { summary_length, blog_folder } = config.settings;
  if (!post) return null;

  const { title, tagline, image, categories = [] } = post.frontmatter;

  return (
    <div className="service-card flex flex-col justify-between h-full">
      <div>
        {image && (
          <div className="relative mb-5 aspect-[16/11] overflow-hidden rounded-xl bg-theme-light/50 dark:bg-[#161f33] flex items-center justify-center p-3">
            <ImageFallback
              className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              src={image}
              alt={title}
              width={405}
              height={270}
            />
            {categories[0] && (
              <span className="pill-badge absolute top-3 left-3 bg-white/90 text-dark backdrop-blur-md dark:bg-slate-900/90 dark:text-white border border-border/60 text-[10px] font-bold">
                {categories[0]}
              </span>
            )}
          </div>
        )}

        <h3 className="text-xl font-bold text-dark dark:text-white mb-2 group-hover:text-primary transition-colors">
          <Link
            href={`/${blog_folder}/${post.slug}`}
            className="block"
          >
            {title}
          </Link>
        </h3>

        <p className="text-xs text-text/80 dark:text-darkmode-text line-clamp-3 leading-relaxed mb-4">
          {tagline || post.content.slice(0, Number(summary_length))}
        </p>
      </div>

      <div className="pt-3 border-t border-border/60 dark:border-darkmode-border/60">
        <Link
          className="btn btn-outline-primary text-xs py-2 px-4 w-full flex items-center justify-center gap-1.5 font-bold"
          href={`/${blog_folder}/${post.slug}`}
        >
          <span>Explore Service</span>
          <FaArrowRight className="text-[9px]" />
        </Link>
      </div>
    </div>
  );
};

export default Post;
