import config from "@config/config.json";
import { useTheme } from "next-themes";

const ThemeSwitcher = ({ className = "" }) => {
  const { theme_switcher } = config.settings;
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <>
      {theme_switcher && (
        <button
          aria-label="Toggle Theme"
          type="button"
          className={
            className ||
            "group inline-flex items-center justify-center h-8 w-8 rounded-full text-dark/70 hover:text-dark dark:text-darkmode-light dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          }
          onClick={() =>
            setTheme(
              theme === "dark" || resolvedTheme === "dark" ? "light" : "dark"
            )
          }
        >
          {/* Moon Icon for Light Mode (hidden in dark mode) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 block dark:hidden text-slate-700 group-hover:text-slate-900 transition-transform duration-200 group-hover:scale-110"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>

          {/* Sun Icon for Dark Mode (visible only in dark mode) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 hidden dark:block text-amber-400 group-hover:text-amber-300 transition-transform duration-200 group-hover:scale-110"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ThemeSwitcher;
