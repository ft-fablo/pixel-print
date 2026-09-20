import config from "@config/config.json";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaClock,
  FaCheckCircle,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, subtitle, form_action, phone, mail, location } = frontmatter;
  const router = useRouter();

  const [selectedService, setSelectedService] = useState("");
  const { whatsapp, working_hours } = config.params;

  useEffect(() => {
    if (router.query.service) {
      setSelectedService(decodeURIComponent(router.query.service));
    }
  }, [router.query.service]);

  const serviceOptions = [
    "Custom Box Packaging",
    "Luxury Paper Bags",
    "Business Cards & Stationery",
    "Corporate Gifts & Sets",
    "Promotional Merchandise",
    "Fabric & Sublimation Printing",
    "Advertising & Signage",
    "Other Bespoke Printing",
  ];

  return (
    <section className="section pt-12 pb-24">
      <div className="container">
        {/* ================= Header ================= */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-subtitle">Get in Touch</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark dark:text-white tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-text/80 dark:text-darkmode-light leading-relaxed">
            {subtitle ||
              "Share your specifications, dielines, or volume requirements. Our print team will respond with material guidance and pricing."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Direct Studio Information */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            <div className="rounded-3xl border border-border/80 bg-white p-8 dark:border-darkmode-border dark:bg-[#111827] shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-dark dark:text-white pb-4 border-b border-border/70 dark:border-darkmode-border/70">
                Studio Contact Details
              </h2>

              <div className="space-y-5 text-sm">
                {/* Phone */}
                {phone && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-text/60 dark:text-darkmode-text/60 uppercase tracking-wider">
                        Call Direct
                      </span>
                      <a
                        href={`tel:${phone}`}
                        className="text-base font-bold text-dark dark:text-white hover:text-primary transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* WhatsApp */}
                {whatsapp && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                      <FaWhatsapp className="text-lg" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-text/60 dark:text-darkmode-text/60 uppercase tracking-wider">
                        Instant WhatsApp
                      </span>
                      <a
                        href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-bold text-dark dark:text-white hover:text-primary transition-colors"
                      >
                        {whatsapp}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {mail && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FaEnvelope />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-text/60 dark:text-darkmode-text/60 uppercase tracking-wider">
                        Email Inquiries
                      </span>
                      <a
                        href={`mailto:${mail}`}
                        className="text-base font-bold text-dark dark:text-white hover:text-primary transition-colors"
                      >
                        {mail}
                      </a>
                    </div>
                  </div>
                )}

                {/* Location */}
                {location && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-text/60 dark:text-darkmode-text/60 uppercase tracking-wider">
                        Studio Location
                      </span>
                      <p className="text-sm font-medium text-dark/90 dark:text-darkmode-light leading-relaxed">
                        {location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Hours */}
                {working_hours && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FaClock />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-text/60 dark:text-darkmode-text/60 uppercase tracking-wider">
                        Operating Hours
                      </span>
                      <p className="text-sm font-medium text-dark/90 dark:text-darkmode-light">
                        {working_hours}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Quick Chat Card */}
              {whatsapp && (
                <div className="pt-4 border-t border-border/70 dark:border-darkmode-border/70">
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      "Hi Pixel Print House, I have a new print inquiry."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp text-xs font-bold py-3 w-full flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="text-base" />
                    <span>Chat on WhatsApp Now</span>
                  </a>
                </div>
              )}
            </div>

            {/* Quality Promise Badge */}
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 space-y-3">
              <h3 className="text-sm font-bold text-dark dark:text-white flex items-center gap-2">
                <FaCheckCircle className="text-primary" />
                The Pixel Print Guarantee
              </h3>
              <p className="text-xs text-text/80 dark:text-darkmode-text leading-relaxed">
                Every project includes complimentary pre-press digital proofs and spectrophotometer color verification prior to full-run production.
              </p>
            </div>
          </div>

          {/* Right Column: Quote & Inquiry Form */}
          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-3xl border border-border/80 bg-white p-8 sm:p-12 dark:border-darkmode-border dark:bg-[#111827] shadow-xl">
              <div className="mb-8">
                <span className="section-subtitle">Online Form</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white">
                  Send Your Project Specifications
                </h2>
              </div>

              <form
                className="space-y-5"
                method="POST"
                action={form_action || "https://formspree.io/f/xpqjayay"}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 dark:text-darkmode-light mb-2">
                      Full Name *
                    </label>
                    <input
                      className="form-input"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 dark:text-darkmode-light mb-2">
                      Company / Brand Name
                    </label>
                    <input
                      className="form-input"
                      name="company"
                      type="text"
                      placeholder="Brand or Organization"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 dark:text-darkmode-light mb-2">
                      Email Address *
                    </label>
                    <input
                      className="form-input"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 dark:text-darkmode-light mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      className="form-input"
                      name="phone"
                      type="tel"
                      placeholder="+971 50 123 4567"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 dark:text-darkmode-light mb-2">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      className="form-input"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      required
                    >
                      <option value="">Select a print service...</option>
                      {serviceOptions.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 dark:text-darkmode-light mb-2">
                      Estimated Quantity
                    </label>
                    <select name="quantity" className="form-input">
                      <option value="50 - 100">50 - 100 units</option>
                      <option value="100 - 500">100 - 500 units</option>
                      <option value="500 - 2000">500 - 2,000 units</option>
                      <option value="2000+">2,000+ units</option>
                      <option value="Prototype / Sample">Prototype / Sample Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark/80 dark:text-darkmode-light mb-2">
                    Project Specifications & Details *
                  </label>
                  <textarea
                    className="form-textarea"
                    name="message"
                    rows="5"
                    placeholder="Provide details such as dimensions, paper preferences (e.g. rigid board, kraft, cotton), finishing (e.g. gold foil, spot UV, deboss), and any deadline requirements..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary text-sm py-3.5 px-8 w-full sm:w-auto font-bold flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Submit Quote Request</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
