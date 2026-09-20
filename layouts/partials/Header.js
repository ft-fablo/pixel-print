import Logo from "@components/Logo";
import menu from "@config/menu.json";
import ThemeSwitcher from "@layouts/components/ThemeSwitcher";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Header = ({ currentPath = "/" }) => {
  const { main } = menu;
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const activePath = currentPath || router.asPath;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [showMenu]);

  // Close menu on route change
  useEffect(() => {
    setShowMenu(false);
    setServicesOpen(false);
  }, [router.asPath]);

  return (
    <header className="header-floating-wrapper">
      <div className={`liquid-glass-capsule ${scrolled ? "is-scrolled" : ""}`}>
        {/* 3D Physical Liquid Glass Shine Beam */}
        <div className="capsule-glass-shine" />

        {/* Brand Logo (Left) */}
        <div className="flex items-center shrink-0 relative z-10">
          <Logo />
        </div>

        {/* Right Section: Navigation Links & Controls (Aligned to Right) */}
        <div className="flex items-center gap-1 sm:gap-2.5 ml-auto relative z-10">
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {main.map((item, i) => (
              <React.Fragment key={`menu-${i}`}>
                {item.hasChildren ? (
                  <div className="relative group">
                    <Link
                      href={item.url}
                      className={`nav-capsule-link ${
                        (activePath === item.url ||
                          item.children.some((c) => activePath === c.url))
                          ? "active"
                          : ""
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span>{item.name}</span>
                        <FaChevronDown className="text-[10px] transition-transform duration-200 group-hover:rotate-180 opacity-70" />
                      </span>
                    </Link>

                    {/* Liquid Glass Dropdown Menu */}
                    <div className="invisible opacity-0 translate-y-1.5 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute right-0 top-full pt-3 transition-all duration-200 z-50 pointer-events-auto">
                      <div className="nav-dropdown-glass">
                        <div className="px-3.5 py-1.5 mb-1 border-b border-black/5 dark:border-white/10">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-text/60 dark:text-darkmode-light/60">
                            Commercial Services
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          {item.children.map((child, idx) => (
                            <Link
                              key={`child-${idx}`}
                              href={child.url}
                              className={`nav-dropdown-link-glass ${
                                activePath === child.url ? "active" : ""
                              }`}
                            >
                              <span>{child.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.url}
                    className={`nav-capsule-link ${
                      activePath === item.url ? "active" : ""
                    }`}
                  >
                    <span>{item.name}</span>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Subtle Glass Divider on Desktop */}
          <div className="hidden lg:block h-4 w-[1px] bg-black/10 dark:bg-white/15 mx-0.5" />

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle navigation menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-black/5 text-dark transition-all hover:border-primary dark:border-white/10 dark:bg-white/10 dark:text-white lg:hidden"
          >
            {showMenu ? (
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M2 4.5A1.5 1.5 0 013.5 3h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 012 4.5zm0 5.5A1.5 1.5 0 013.5 8.5h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 012 10zm1.5 4a1.5 1.5 0 000 3h13a1.5 1.5 0 000-3h-13z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Liquid Frosted Glass) */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[320px] p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden mobile-drawer-glass pointer-events-auto ${
          !showMenu ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between pb-5 border-b border-black/10 dark:border-white/10">
          <Logo />
          <button
            aria-label="Close menu"
            className="p-1.5 rounded-full text-dark/70 hover:text-primary dark:text-darkmode-light"
            onClick={() => setShowMenu(false)}
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <ul className="mt-6 space-y-2">
          {main.map((item, i) => (
            <li key={`m-menu-${i}`}>
              {item.hasChildren ? (
                <div>
                  <div className="flex items-center justify-between py-2.5 text-base font-semibold text-dark dark:text-white">
                    <Link href={item.url} onClick={() => setShowMenu(false)}>
                      {item.name}
                    </Link>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="p-1 text-dark/60 dark:text-darkmode-light"
                    >
                      <FaChevronDown
                        className={`text-xs transition-transform ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {servicesOpen && (
                    <ul className="pl-4 pb-2 border-l border-primary/20 space-y-1.5 mt-1">
                      {item.children.map((child, idx) => (
                        <li key={`m-sub-${idx}`}>
                          <Link
                            href={child.url}
                            onClick={() => setShowMenu(false)}
                            className="block text-sm py-1 text-text/80 hover:text-primary dark:text-darkmode-text dark:hover:text-primary font-medium"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.url}
                  onClick={() => setShowMenu(false)}
                  className={`block py-2.5 text-base font-semibold ${
                    activePath === item.url
                      ? "text-primary font-bold"
                      : "text-dark/80 dark:text-darkmode-light hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop for Mobile Drawer */}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden pointer-events-auto"
        />
      )}
    </header>
  );
};

export default Header;

