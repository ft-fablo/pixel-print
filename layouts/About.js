import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import ImageFallback from "./components/ImageFallback";
import Link from "next/link";
import { FaCheckCircle, FaAward, FaBuilding, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import config from "@config/config.json";

const About = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const {
    title,
    subtitle,
    image,
    principles = {},
    capabilities = {},
    education,
    experience,
  } = frontmatter;

  const { whatsapp, location, phone } = config.params;

  // Support both new principles/capabilities and legacy education/experience
  const foundationTitle = principles.title || education?.title || "Our Studio Foundation";
  const foundationItems = principles.items || education?.degrees?.map(d => ({ title: d.university, content: d.content })) || [];

  const capTitle = capabilities.title || experience?.title || "Studio Capabilities";
  const capList = capabilities.list || experience?.list || [];

  return (
    <section className="section pt-12 pb-24">
      <div className="container">
        {/* ================= Header ================= */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-subtitle">About Pixel Print House</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark dark:text-white tracking-tight mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg text-text/80 dark:text-darkmode-light">
              {subtitle}
            </p>
          )}
        </div>

        {/* ================= Studio Image ================= */}
        {image && (
          <div className="relative mb-16 overflow-hidden rounded-3xl border border-border/80 dark:border-darkmode-border shadow-xl bg-theme-light/40 dark:bg-[#111827] max-h-[500px] flex items-center justify-center p-4">
            <ImageFallback
              src={image}
              width={1200}
              height={500}
              alt={title}
              priority
              className="max-h-[460px] w-auto object-contain"
            />
          </div>
        )}

        {/* ================= Editorial Content ================= */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="content text-base sm:text-lg leading-relaxed">
            <MDXRemote
              {...mdxContent}
              components={{
                ...shortcodes,
                img: ImageFallback,
              }}
            />
          </div>
        </div>

        {/* ================= Foundation Principles & Capabilities ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Left: Foundation */}
          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-3xl border border-border/80 bg-white p-8 sm:p-10 dark:border-darkmode-border dark:bg-[#111827] h-full shadow-sm">
              <span className="section-subtitle">Philosophy</span>
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-8">
                {foundationTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {foundationItems.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      <h3 className="text-base font-bold text-dark dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-text/80 dark:text-darkmode-text leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Capabilities */}
          <div className="col-span-12 lg:col-span-5">
            <div className="rounded-3xl border border-border/80 bg-white p-8 sm:p-10 dark:border-darkmode-border dark:bg-[#111827] h-full shadow-sm">
              <span className="section-subtitle">What We Do Best</span>
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-8">
                {capTitle}
              </h2>
              <ul className="space-y-3">
                {capList.map((cap, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm font-semibold text-dark/90 dark:text-darkmode-light"
                  >
                    <FaCheckCircle className="text-primary shrink-0 text-sm" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================= Facility & Location Card ================= */}
        <div className="rounded-3xl border border-border/80 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:border-darkmode-border dark:from-primary/10 dark:via-[#111827] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="section-subtitle">Facility & Location</span>
            <h3 className="text-2xl font-bold text-dark dark:text-white">
              Amber Gem Tower, Ajman, UAE
            </h3>
            <p className="text-xs sm:text-sm text-text/80 dark:text-darkmode-text max-w-xl">
              Equipped with modern precision digital flatbeds, offset presses, laser cutting, and specialty foil stamping machinery.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/contact" className="btn btn-primary text-xs py-3 px-6 font-bold">
              <span>Contact Studio</span>
              <FaArrowRight className="ml-1.5 text-[10px]" />
            </Link>
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp text-xs py-3 px-4 font-bold flex items-center gap-2"
              >
                <FaWhatsapp className="text-sm" />
                <span>WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
