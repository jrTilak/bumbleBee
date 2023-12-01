import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import favicon from "../images/favicon.png";
function Header() {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl px-5 mx-auto sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-4"
              aria-label="Bumblebee"
            >
              <img src={favicon} alt="" className="h-9 w-9" />
              <span className="text-xl font-bold tracking-wider text-gray-800 uppercase">
                Bumblebee
              </span>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-wrap items-center justify-end flex-grow">
              <li>
                <Link
                  to="https://github.com/jrTilak/BumbleBee"
                  target="_blank"
                  className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="ml-3 text-gray-200 bg-gray-900 btn-sm hover:bg-gray-800"
                >
                  <span>Login</span>
                  <svg
                    className="flex-shrink-0 w-3 h-3 ml-2 -mr-1 text-gray-400 fill-current"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                      fillRule="nonzero"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
