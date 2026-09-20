import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import config from "@config/config.json";

const FloatingActions = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { whatsapp, phone } = config.params;

  const whatsappNumber = whatsapp?.replace(/[^0-9]/g, "") || "971529780054";
  const cleanPhone = phone?.replace(/\s+/g, "") || "+971529780054";

  if (!mounted) return null;

  return (
    <aside
      aria-label="Quick contact actions"
      className="floating-actions-container"
    >
      {/* WhatsApp Floating Button */}
      <div className="relative group flex items-center">
        <span className="liquid-glass-tooltip">
          Chat on WhatsApp
        </span>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Pixel Print House on WhatsApp"
          className="liquid-glass-float-btn float-btn-whatsapp"
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* Direct Phone Call Floating Button */}
      <div className="relative group flex items-center">
        <span className="liquid-glass-tooltip">
          Call Studio
        </span>
        <a
          href={`tel:${cleanPhone}`}
          aria-label="Call Pixel Print House directly"
          className="liquid-glass-float-btn float-btn-call"
        >
          <FaPhoneAlt />
        </a>
      </div>
    </aside>
  );
};

export default FloatingActions;
