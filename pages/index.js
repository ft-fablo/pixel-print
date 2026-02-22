import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import { getListPage, getSinglePage } from "@lib/contentParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import dynamic from "next/dynamic";

const Map = dynamic(
  () => import("@layouts/components/map"),
  { ssr: false }
);


const { blog_folder, pagination } = config.settings;

const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  promotion = {},
  currentPath = "/",
}) => {
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );
  const showPosts = pagination;

  return (
    <Base currentPath={currentPath}>
      {/* ================= Banner ================= */}
      <section className="section banner relative pb-0">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src={"/images/banner-bg-shape.svg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />
        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div
              className={
                banner.image_enable
                  ? "mt-12 text-center lg:mt-0 lg:text-left lg:col-6"
                  : "mt-12 text-center lg:mt-0 lg:text-left lg:col-12"
              }
            >
              <div className="banner-title">
                {markdownify(banner.title, "h1")}
                {markdownify(banner.title_small, "span")}
              </div>
              {markdownify(banner.content, "p", "mt-4")}
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-6"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
            {banner.image_enable && (
              <div className="col-9 lg:col-6">
                <ImageFallback
                  className="mx-auto object-contain"
                  src={banner.image}
                  width={548}
                  height={443}
                  priority
                  alt="Banner Image"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= Main Content ================= */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col gap-12">
            {/* ===== Featured Posts ===== */}
            {featured_posts.enable && (
              <div className="section pt-0">
                {markdownify(featured_posts.title, "h2", "section-title")}
                <div className="rounded border border-border p-6 dark:border-darkmode-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Post post={featuredPosts[0]} />
                    <div className="max-h-[480px] overflow-y-auto">
                      {featuredPosts.slice(1).map((post, i, arr) => (
                        <div
                          key={i}
                          className={`mb-6 flex items-center pb-6 ${
                            i !== arr.length - 1 &&
                            "border-b border-border dark:border-darkmode-border"
                          }`}
                        >
                          {post.frontmatter.image && (
                            <ImageFallback
                              className="mr-3 h-[85px] rounded object-cover"
                              src={post.frontmatter.image}
                              alt={post.frontmatter.title}
                              width={105}
                              height={85}
                            />
                          )}
                          <div>
                            <h3 className="h5 mb-2">
                              <Link
                                href={`/${blog_folder}/${post.slug}`}
                                className="hover:text-primary"
                              >
                                {post.frontmatter.title}
                              </Link>
                            </h3>
                            
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== Promotion ===== */}
            
            {/*{promotion.enable && (
  <div className="section pt-6">
    <Map
      lat={25.393972}
      lng={55.430667}
      location="Dubai, UAE"
    />
  </div>
)}*/}
{/* <Map lat={25.393972} lng={55.430667} location="Location" /> */}

            {/* ===== Recent Posts ===== *
            {recent_posts.enable && (
              <div className="section pt-0">
                {markdownify(recent_posts.title, "h2", "section-title")}
                <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortPostByDate.slice(0, showPosts).map((post) => (
                      <Post key={post.slug} post={post} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            */}

            {/* ===== Pagination ===== */}
            <div className="mt-12 flex justify-center">
              <Pagination
                totalPages={Math.ceil(posts.length / showPosts)}
                currentPage={1}
              />
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

/* ================= DATA ================= */
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion = {} } = frontmatter;

  const posts = getSinglePage(`content/${blog_folder}`);

  return {
    props: {
      banner,
      posts,
      featured_posts,
      recent_posts,
      promotion, // safe default
      currentPath: "/",
    },
  };
};
