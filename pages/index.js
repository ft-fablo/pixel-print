import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { getListPage, getSinglePage } from "@lib/contentParser";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
  FaArrowRight,
  FaCheckCircle,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaLayerGroup,
  FaPrint,
  FaAward,
  FaShieldAlt,
} from "react-icons/fa";

const Home = ({
  banner = {},
  metrics = [],
  featured_services = {},
  finishes = {},
  process: processData = {},
  promotion = {},
  posts = [],
  currentPath = "/",
}) => {
  const { whatsapp, phone, email, location } = config.params;
  const { theme, resolvedTheme } = useTheme();
  const lightVideoRef = useRef(null);
  const darkVideoRef = useRef(null);

  useEffect(() => {
    const isDark = theme === "dark" || resolvedTheme === "dark";
    if (isDark) {
      if (darkVideoRef.current) {
        darkVideoRef.current.play().catch(() => {});
      }
    } else {
      if (lightVideoRef.current) {
        lightVideoRef.current.play().catch(() => {});
      }
    }
  }, [theme, resolvedTheme]);

  const heroTitle = banner.title || "Crafting Print Excellence";
  const heroTitleHighlight = banner.title_highlight || "in Every Pixel";
  const heroContent =
    banner.content ||
    "We engineer luxury rigid packaging, custom paper bags, executive stationery, and large-format signage for brands that value precision, refined aesthetics, and enduring quality.";

  const videoLightSrc =
    banner.video_light || banner.video || "/videos/hero-video-light.mp4";
  const videoDarkSrc =
    banner.video_dark || banner.video || "/videos/hero-video-dark.mp4";

  const displayMetrics =
    metrics && metrics.length > 0
      ? metrics
      : [
          { value: "500+", label: "Brand Projects Delivered" },
          { value: "99.8%", label: "Color Registration Accuracy" },
          { value: "24-48h", label: "Express Rush Available" },
          { value: "100%", label: "In-House Quality Control" },
        ];

  return (
    <Base currentPath={currentPath}>
      {/* ================= HERO SECTION (Seamless Studio Background) ================= */}
      <section className="relative overflow-hidden min-h-[calc(100vh-110px)] flex items-center py-12 md:py-16 bg-white dark:bg-black border-b border-border/40 dark:border-white/10">
        <div className="container w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & Call to Actions */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-6 my-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark dark:text-white tracking-tight leading-[1.1]">
                {heroTitle}{" "}
                <span className="text-primary block sm:inline">
                  {heroTitleHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-text/90 dark:text-darkmode-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                {heroContent}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/services"
                  className="btn btn-primary text-sm py-3.5 px-7 font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <span>Explore Services</span>
                  <FaArrowRight className="text-xs" />
                </Link>

                <Link
                  href="/contact"
                  className="btn btn-outline-primary text-sm py-3.5 px-7 font-bold transition-all inline-flex items-center gap-2"
                >
                  <span>Request a Quote</span>
                </Link>

                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      "Hello Pixel Print House, I want to discuss a new printing project."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Direct WhatsApp Consultation"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all dark:text-emerald-400 shrink-0"
                    title="Direct WhatsApp Consultation"
                  >
                    <FaWhatsapp className="text-xl" />
                  </a>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-text/75 dark:text-darkmode-text/80">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary text-sm" />
                  <span>Complimentary 3D Digital Proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary text-sm" />
                  <span>In-House UAE Production</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Video (Seamless Loop, Zero Border, Popping Out of Background) */}
            <div className="col-span-12 lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[540px] flex items-center justify-center">
                <div className="relative w-full hero-video-seamless flex items-center justify-center">
                  {/* Light Mode Video */}
                  <video
                    ref={lightVideoRef}
                    src={videoLightSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-auto object-contain block dark:hidden mx-auto"
                    onLoadedData={(e) => {
                      e.currentTarget.play().catch(() => {});
                    }}
                  />

                  {/* Dark Mode Video */}
                  <video
                    ref={darkVideoRef}
                    src={videoDarkSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-auto object-contain hidden dark:block mx-auto"
                    onLoadedData={(e) => {
                      e.currentTarget.play().catch(() => {});
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED SERVICES ================= */}
      <section className="section py-20 md:py-28">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="section-subtitle">
                {featured_services.subtitle || "What We Produce"}
              </span>
              <h2 className="section-title">
                {featured_services.title || "Precision Print & Packaging Services"}
              </h2>
              <p className="text-sm sm:text-base text-text/80 dark:text-darkmode-text">
                {featured_services.description ||
                  "From bespoke rigid gift boxes to large-format advertising banners, crafted to exact tolerances."}
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline shrink-0"
            >
              <span>View All Services</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          {/* Grid of services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((service) => {
              const {
                title,
                tagline,
                image,
                categories = [],
              } = service.frontmatter;

              return (
                <div
                  key={service.slug}
                  className="service-card flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Preview */}
                    <div className="relative mb-6 aspect-[16/11] overflow-hidden rounded-2xl bg-theme-light/50 dark:bg-[#161f33] flex items-center justify-center p-4">
                      {image && (
                        <ImageFallback
                          src={image}
                          alt={title}
                          width={600}
                          height={420}
                          className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      )}

                      {categories[0] && (
                        <span className="pill-badge absolute top-3 left-3 bg-white/90 text-dark backdrop-blur-md dark:bg-slate-900/90 dark:text-white border border-border/60 dark:border-darkmode-border text-[10px] font-bold">
                          {categories[0]}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-dark dark:text-white mb-2.5 group-hover:text-primary transition-colors">
                      <Link href={`/services/${service.slug}`}>
                        {title}
                      </Link>
                    </h3>

                    <p className="text-xs text-text/80 dark:text-darkmode-text line-clamp-2 leading-relaxed mb-5">
                      {tagline || service.content.slice(0, 110)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn btn-primary text-xs py-2.5 px-4 flex-1 text-center justify-center font-bold"
                    >
                      <span>Explore Details</span>
                      <FaArrowRight className="ml-1.5 text-[10px]" />
                    </Link>

                    {whatsapp && (
                      <a
                        href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hi Pixel Print House, I want to inquire about ${title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Inquire about ${title} on WhatsApp`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all dark:text-emerald-400 shrink-0"
                      >
                        <FaWhatsapp className="text-sm" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= METRICS STATS SECTION (After What We Produce) ================= */}
      {displayMetrics && displayMetrics.length > 0 && (
        <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-theme-light/30 to-white dark:from-[#070b12] dark:via-[#0c121e] dark:to-[#070b12] border-y border-border/60 dark:border-darkmode-border/60">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
              {displayMetrics.map((m, i) => (
                <div
                  key={i}
                  className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111827] border border-border/70 dark:border-darkmode-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group"
                >
                  <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary dark:text-primary tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300">
                    {m.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-dark/85 dark:text-darkmode-light tracking-wide max-w-[180px] leading-snug">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= THE FINISHING STUDIO ================= */}
      {finishes && finishes.items && (
        <section className="section py-20 bg-theme-light/40 dark:bg-[#070b12] border-y border-border/70 dark:border-darkmode-border/70">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-subtitle">
                {finishes.subtitle || "Tactile Craftsmanship"}
              </span>
              <h2 className="section-title">
                {finishes.title || "The Finishing Studio"}
              </h2>
              <p className="text-sm sm:text-base text-text/80 dark:text-darkmode-text">
                {finishes.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {finishes.items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/80 bg-white p-7 dark:border-darkmode-border dark:bg-[#111827] shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="pill-badge bg-primary/10 text-primary font-bold text-[10px]">
                      {item.tag}
                    </span>
                    <span className="text-xs font-mono text-text/40 dark:text-darkmode-text/40">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-dark dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text/80 dark:text-darkmode-text leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= 4-STEP PRODUCTION PROCESS ================= */}
      {processData && processData.steps && (
        <section className="section py-20 md:py-28">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-subtitle">
                {processData.subtitle || "How We Work"}
              </span>
              <h2 className="section-title">
                {processData.title || "Disciplined Production Process"}
              </h2>
              <p className="text-sm sm:text-base text-text/80 dark:text-darkmode-text">
                From dieline engineering to press proofing and hand finishing, every stage is controlled for consistency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processData.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl border border-border/80 bg-white p-6 dark:border-darkmode-border dark:bg-[#111827] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-3xl font-extrabold text-primary/30 dark:text-primary/20 font-mono block mb-4">
                      {step.number}
                    </span>
                    <h3 className="text-base font-bold text-dark dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-text/80 dark:text-darkmode-text leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= STUDIO LOCATION & FAST QUOTE BANNER ================= */}
      <section className="section pb-24 pt-0">
        <div className="container">
          <div className="rounded-3xl border border-border/80 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:border-darkmode-border dark:from-primary/10 dark:via-primary/5 dark:to-[#111827] p-8 sm:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="col-span-12 lg:col-span-7 space-y-4 text-center lg:text-left">
                <span className="section-subtitle">Visit Our Ajman Facility</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-dark dark:text-white tracking-tight">
                  Ready to transform your brand collateral?
                </h2>
                <p className="text-sm sm:text-base text-text/80 dark:text-darkmode-text max-w-xl leading-relaxed">
                  Bring your ideas or CAD files to our studio in Amber Gem Tower, Ajman, or connect with our print team online for immediate proofs and quotations.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 text-xs font-semibold text-dark dark:text-white">
                  {location && (
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary text-sm" />
                      <span>{location}</span>
                    </div>
                  )}
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <FaPhoneAlt className="text-primary text-sm" />
                      <span>{phone}</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
                <Link
                  href="/contact"
                  className="btn btn-primary text-sm py-3.5 px-8 font-bold text-center justify-center"
                >
                  Request a Formal Quote
                </Link>

                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      "Hello Pixel Print House, I want to discuss a new printing project."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp text-sm py-3.5 px-8 font-bold text-center justify-center gap-2"
                  >
                    <FaWhatsapp className="text-lg" />
                    <span>Instant WhatsApp Consultation</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

export const getStaticProps = async () => {
  const { blog_folder } = config.settings;
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const {
    banner = {},
    metrics = [],
    featured_services = {},
    finishes = {},
    process = {},
    promotion = {},
  } = frontmatter;

  const posts = getSinglePage(`content/${blog_folder}`);

  return {
    props: {
      banner,
      metrics,
      featured_services,
      finishes,
      process,
      promotion,
      posts,
      currentPath: "/",
    },
  };
};
