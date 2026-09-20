import React from "react";
import {
  IoCall,
  IoGlobeOutline,
  IoLocation,
  IoLogoBehance,
  IoLogoBitbucket,
  IoLogoCodepen,
  IoLogoDiscord,
  IoLogoDribbble,
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoMedium,
  IoLogoPinterest,
  IoLogoReddit,
  IoLogoTwitter,
  IoLogoWhatsapp,
  IoLogoYoutube,
  IoMail,
} from "react-icons/io5";

const iconMap = {
  facebook: IoLogoFacebook,
  twitter: IoLogoTwitter,
  instagram: IoLogoInstagram,
  youtube: IoLogoYoutube,
  linkedin: IoLogoLinkedin,
  github: IoLogoGithub,
  discord: IoLogoDiscord,
  medium: IoLogoMedium,
  codepen: IoLogoCodepen,
  bitbucket: IoLogoBitbucket,
  dribbble: IoLogoDribbble,
  behance: IoLogoBehance,
  pinterest: IoLogoPinterest,
  reddit: IoLogoReddit,
  whatsapp: IoLogoWhatsapp,
  email: IoMail,
  phone: IoCall,
  address: IoLocation,
  website: IoGlobeOutline,
};

const Social = ({ source = {}, className = "" }) => {
  const activeSocials = Object.entries(source).filter(
    ([key, value]) => value && value.trim() !== "" && iconMap[key]
  );

  if (activeSocials.length === 0) return null;

  return (
    <ul className={className}>
      {activeSocials.map(([key, url]) => {
        const IconComponent = iconMap[key];
        return (
          <li key={key} className="inline-block">
            <a
              aria-label={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center transition-transform hover:scale-110"
            >
              <IconComponent />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Social;
