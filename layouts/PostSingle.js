import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaWhatsapp,
  FaCheckCircle,
  FaShieldAlt,
  FaTruck,
  FaArrowRight,
  FaChevronRight,
} from "react-icons/fa";
import shortcodes from "./shortcodes/all";

const PostSingle = ({
  frontmatter,
  content,
  mdxContent,
  slug,
  posts = [],
  currentPath,
}) => {
  const {
    title,
    tagline,
    description,
    image,
    categories = [],
    materials = [],
    finishes = [],
    applications = [],
    gallery = [],
  } = frontmatter;

  const [activeImage, setActiveImage] = useState(image || (gallery.length > 0 ? gallery[0] : ""));
  const { whatsapp } = config.params;

  const otherServices = posts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello Pixel Print House, I am interested in getting a quote for ${title}.`
  );

  return (
    <Base
      title={`${title} | Pixel Print House`}
      description={description || tagline || `Custom ${title} by Pixel Print House in Ajman, UAE.`}
      currentPath={currentPath}
      image={image}
    >
      {/* ================= Breadcrumb ================= */}
      <div className="border-b border-border/60 bg-theme-light/30 dark:border-darkmode-border/60 dark:bg-[#070b12] py-4">
        <div className="container">
          <nav className="flex items-center space-x-2 text-xs text-text/70 dark:text-darkmode-text/70">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <FaChevronRight className="text-[9px] opacity-60" />
            <Link href="/services" className="hover:text-primary transition-colors">
              Services
            </Link>
            <FaChevronRight className="text-[9px] opacity-60" />
            <span className="font-semibold text-dark dark:text-white truncate">
              {title}
            </span>
          </nav>
        </div>
      </div>

      <section className="section pt-10 pb-20">
        <div className="container">
          {/* ================= Service Hero Header ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            {/* Left: Gallery & Visuals */}
            <div className="col-span-12 lg:col-span-6 space-y-4">
              <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-theme-light/40 dark:border-darkmode-border dark:bg-[#111827] aspect-[4/3] flex items-center justify-center p-4">
                {activeImage && (
                  <ImageFallback
                    src={activeImage}
                    alt={title}
                    width={800}
                    height={600}
                    priority
                    className="max-h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                        activeImage === img
                          ? "border-primary shadow-md"
                          : "border-border/60 hover:border-border dark:border-darkmode-border opacity-70 hover:opacity-100"
                      }`}
                    >
                      <ImageFallback
                        src={img}
                        alt={`${title} sample ${idx + 1}`}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Overview & Quick Quote Actions */}
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
              {categories.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {categories.map((cat, i) => (
                    <span
                      key={i}
                      className="pill-badge bg-primary/10 text-primary border border-primary/20 text-xs font-bold"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark dark:text-white tracking-tight mb-4">
                {title}
              </h1>

              {tagline && (
                <p className="text-lg text-text/90 dark:text-darkmode-light font-medium mb-6 leading-relaxed">
                  {tagline}
                </p>
              )}

              {/* Feature Highlights Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-5 border-y border-border/70 dark:border-darkmode-border/70 mb-8">
                <div className="flex items-center gap-2.5">
                  <FaTruck className="text-primary text-base shrink-0" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-text/60 dark:text-darkmode-text/60 font-semibold">
                      Delivery
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-dark dark:text-white">
                      UAE Nationwide
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <FaShieldAlt className="text-primary text-base shrink-0" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-text/60 dark:text-darkmode-text/60 font-semibold">
                      Production
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-dark dark:text-white">
                      In-House Studio
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-primary text-base shrink-0" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-text/60 dark:text-darkmode-text/60 font-semibold">
                      Proofing
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-dark dark:text-white">
                      Complimentary 3D
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
                <Link
                  href={`/contact?service=${encodeURIComponent(title)}`}
                  className="btn btn-primary text-sm py-3.5 px-6 text-center justify-center font-bold"
                >
                  Request a Custom Quote
                </Link>

                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp text-sm py-3.5 px-6 text-center justify-center gap-2 font-bold"
                  >
                    <FaWhatsapp className="text-lg" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-text/70 dark:text-darkmode-text/70">
                <FaCheckCircle className="text-emerald-500 shrink-0" />
                <span>Custom die-cutting, pantone matching & sample proofs available on request</span>
              </div>
            </div>
          </div>

          {/* ================= Technical Specifications Matrix ================= */}
          {(materials.length > 0 || finishes.length > 0 || applications.length > 0) && (
            <div className="mb-16 rounded-3xl border border-border/80 bg-theme-light/40 dark:border-darkmode-border dark:bg-[#111827]/80 p-8 lg:p-10">
              <div className="mb-8">
                <span className="section-subtitle">Craftsmanship Details</span>
                <h2 className="text-2xl font-bold text-dark dark:text-white">
                  Technical Specifications & Finishing Options
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {materials.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-dark dark:text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Paper & Material Stocks
                    </h3>
                    <ul className="space-y-2 text-sm text-text/80 dark:text-darkmode-text">
                      {materials.map((m, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary font-bold text-xs mt-0.5">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {finishes.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-dark dark:text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Finishes & Enhancements
                    </h3>
                    <ul className="space-y-2 text-sm text-text/80 dark:text-darkmode-text">
                      {finishes.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary font-bold text-xs mt-0.5">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {applications.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-dark dark:text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Typical Applications
                    </h3>
                    <ul className="space-y-2 text-sm text-text/80 dark:text-darkmode-text">
                      {applications.map((a, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary font-bold text-xs mt-0.5">•</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= Detailed Article / Content ================= */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="content">
              <MDXRemote
                {...mdxContent}
                components={{
                  ...shortcodes,
                  img: ImageFallback,
                }}
              />
            </div>
          </div>

          {/* ================= Bottom Action Card ================= */}
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 sm:p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white">
                Have a project requiring {title}?
              </h3>
              <p className="text-sm sm:text-base text-text/80 dark:text-darkmode-text max-w-xl">
                Send us your dimensions, estimated volume, and artwork specifications for an immediate proposal and material recommendations.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/contact?service=${encodeURIComponent(title)}`}
                className="btn btn-primary text-sm py-3 px-6"
              >
                Get Proposal
              </Link>
            </div>
          </div>

          {/* ================= Other Services ================= */}
          {otherServices.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="section-subtitle">More Offerings</span>
                  <h2 className="text-2xl font-bold text-dark dark:text-white">
                    Explore Other Print Services
                  </h2>
                </div>
                <Link
                  href="/services"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <span>View All Services</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherServices.map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="service-card flex flex-col justify-between"
                  >
                    <div>
                      {svc.frontmatter.image && (
                        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl bg-theme-light/50 dark:bg-[#1a2234] flex items-center justify-center p-3">
                          <ImageFallback
                            src={svc.frontmatter.image}
                            alt={svc.frontmatter.title}
                            width={400}
                            height={250}
                            className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-dark dark:text-white group-hover:text-primary transition-colors mb-2">
                        {svc.frontmatter.title}
                      </h3>
                      <p className="text-xs text-text/80 dark:text-darkmode-text line-clamp-2 leading-relaxed">
                        {svc.frontmatter.tagline || svc.content.slice(0, 100)}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/60 dark:border-darkmode-border/60 flex items-center justify-between text-xs font-bold text-primary">
                      <span>View Specifications</span>
                      <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;
