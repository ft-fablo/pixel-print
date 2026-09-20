import ImageFallback from "@components/ImageFallback";
import config from "@config/config.json";
import Link from "next/link";

const Logo = ({ src }) => {
  // destructuring items from config object
  const { logo, logo_white, logo_width, logo_height, logo_text, title } =
    config.site;

  return (
    <Link href="/" className="navbar-brand">
      <span className="relative inline-flex items-center">
        {src ? (
          <ImageFallback
            width={logo_width.replace("px", "") * 2}
            height={logo_height.replace("px", "") * 2}
            src={src}
            alt={title}
            priority
            style={{
              height: "auto",
              maxHeight: "36px",
              width: "auto",
              maxWidth: "180px",
            }}
            className="object-contain block"
          />
        ) : logo ? (
          <>
            {/* Light Mode Logo */}
            <ImageFallback
              width={logo_width.replace("px", "") * 2}
              height={logo_height.replace("px", "") * 2}
              src={logo}
              alt={title}
              priority
              style={{
                height: "auto",
                maxHeight: "36px",
                width: "auto",
                maxWidth: "180px",
              }}
              className="object-contain block dark:hidden"
            />

            {/* Dark Mode Logo */}
            <ImageFallback
              width={logo_width.replace("px", "") * 2}
              height={logo_height.replace("px", "") * 2}
              src={logo_white || logo}
              alt={title}
              priority
              style={{
                height: "auto",
                maxHeight: "36px",
                width: "auto",
                maxWidth: "180px",
              }}
              className="object-contain hidden dark:block"
            />
          </>
        ) : logo_text ? (
          logo_text
        ) : (
          title
        )}
      </span>
    </Link>
  );
};

export default Logo;
