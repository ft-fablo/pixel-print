import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import Logo from "@layouts/components/Logo";
import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const { copyright, footer_content, phone, whatsapp, email, location, working_hours } = config.params;

  const servicesList = [
    { name: "Custom Box Packaging", url: "/services/box-printing" },
    { name: "Luxury Paper Bags", url: "/services/bag-printing" },
    { name: "Business Cards & Stationery", url: "/services/business-cards" },
    { name: "Corporate Gifts & Sets", url: "/services/corporate-gifts" },
    { name: "Promotional Merchandise", url: "/services/promotional-items" },
    { name: "Fabric & Sublimation", url: "/services/fabric-printing" },
    { name: "Advertising & Signage", url: "/services/advertising-signage" },
  ];

  return (
    <footer className="border-t border-border/80 bg-theme-light/40 dark:border-darkmode-border/80 dark:bg-[#070b12] pt-16 pb-12 transition-colors">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Col 1: Brand & Studio Info */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="mb-5 inline-block">
              <Logo />
            </div>
            <p className="text-sm text-text/80 dark:text-darkmode-text leading-relaxed mb-6 max-w-sm">
              {footer_content}
            </p>
            <div className="space-y-2.5 text-xs text-text/80 dark:text-darkmode-text">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-primary mt-0.5 shrink-0 text-sm" />
                <span>{location}</span>
              </div>
              {working_hours && (
                <div className="flex items-center gap-2.5">
                  <FaClock className="text-primary shrink-0 text-sm" />
                  <span>{working_hours}</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-dark dark:text-white mb-5">
              Print Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesList.map((service, i) => (
                <li key={i}>
                  <Link
                    href={service.url}
                    className="text-text/80 hover:text-primary dark:text-darkmode-text dark:hover:text-primary transition-colors inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="col-span-12 md:col-span-6 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-dark dark:text-white mb-5">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {menu.footer.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.url}
                    className="text-text/80 hover:text-primary dark:text-darkmode-text dark:hover:text-primary transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Direct Inquiries */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-dark dark:text-white mb-5">
              Direct Inquiries
            </h4>
            <div className="space-y-3 text-sm text-text/80 dark:text-darkmode-text mb-6">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2.5 hover:text-primary transition-colors"
                >
                  <FaPhoneAlt className="text-primary text-xs" />
                  <span>{phone}</span>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 hover:text-primary transition-colors"
                >
                  <FaEnvelope className="text-primary text-xs" />
                  <span>{email}</span>
                </a>
              )}
            </div>

            {/* Quick WhatsApp Action Button */}
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp text-xs font-semibold py-2.5 px-4 w-full flex items-center justify-center gap-2 mb-6"
              >
                <FaWhatsapp className="text-base" />
                <span>Chat on WhatsApp</span>
              </a>
            )}

            {/* Social channels */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-dark/70 dark:text-darkmode-text/70 block mb-2">
                Follow our work
              </span>
              <Social source={social} className="socials" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/80 dark:border-darkmode-border/80 flex flex-col sm:flex-row items-center justify-between text-xs text-text/70 dark:text-darkmode-text/60 gap-4">
          <p>{copyright}</p>
          <div className="flex items-center gap-4">
            <span>Ajman, United Arab Emirates</span>
            <span>•</span>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
