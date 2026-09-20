import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { getSinglePage } from "@lib/contentParser";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaArrowRight,
  FaWhatsapp,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const ServicesPage = ({ services, currentPath = "/services" }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { whatsapp } = config.params;

  const categories = [
    "All",
    ...Array.from(
      new Set(
        services
          .flatMap((s) => s.frontmatter.categories || [])
          .filter(Boolean)
      )
    ),
  ];

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) =>
          (s.frontmatter.categories || []).includes(selectedCategory)
        );

  return (
    <Base
      title="Printing & Packaging Services | Pixel Print House"
      description="Explore our bespoke commercial printing, custom rigid box packaging, luxury paper bags, corporate gifts, and signage in Ajman, UAE."
      currentPath={currentPath}
    >
      {/* ================= Hero Header ================= */}
      <section className="section pb-12 pt-16 border-b border-border/70 bg-gradient-to-b from-theme-light/60 to-transparent dark:border-darkmode-border/70 dark:from-[#0b0f19]">
        <div className="container text-center max-w-3xl">
          <span className="section-subtitle">What We Craft</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark dark:text-white tracking-tight mb-5">
            Commercial Printing & Packaging Services
          </h1>
          <p className="text-base sm:text-lg text-text/90 dark:text-darkmode-light leading-relaxed mb-8">
            From bespoke rigid gift boxes and luxury paper bags to executive corporate stationery and outdoor architectural signage. Crafted with disciplined standards in Ajman, UAE.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "border border-border/80 bg-white text-dark/80 hover:border-primary hover:text-primary dark:border-darkmode-border dark:bg-[#111827] dark:text-darkmode-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Services Grid ================= */}
      <section className="section pt-16 pb-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
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

                    <h2 className="text-xl font-bold text-dark dark:text-white mb-2.5 group-hover:text-primary transition-colors">
                      <Link href={`/services/${service.slug}`}>
                        {title}
                      </Link>
                    </h2>

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

          {/* ================= Bottom Consultation Banner ================= */}
          <div className="mt-20 rounded-3xl border border-border/80 bg-theme-light/40 dark:border-darkmode-border dark:bg-[#111827] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="col-span-12 lg:col-span-8 space-y-3">
                <span className="section-subtitle">Need Custom Fabrication?</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-dark dark:text-white">
                  Have a bespoke requirement or specific material request?
                </h3>
                <p className="text-sm text-text/80 dark:text-darkmode-text max-w-2xl leading-relaxed">
                  Our print engineers provide complimentary paper consultation, digital proofing, and custom die-line templates for unique packaging shapes and finishes.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs text-dark dark:text-darkmode-light font-semibold">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary" />
                    <span>Free Digital Proofs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary" />
                    <span>FSC Certified Stocks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary" />
                    <span>Rush Turnaround in UAE</span>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  href="/contact"
                  className="btn btn-primary text-sm py-3 px-6 text-center justify-center font-bold"
                >
                  Request Consultation
                </Link>
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp text-sm py-3 px-6 text-center justify-center gap-2 font-bold"
                  >
                    <FaWhatsapp className="text-base" />
                    <span>Chat With Specialist</span>
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

export const getStaticProps = async () => {
  const { blog_folder } = config.settings;
  const services = getSinglePage(`content/${blog_folder}`);

  return {
    props: {
      services: services,
      currentPath: "/services",
    },
  };
};

export default ServicesPage;
