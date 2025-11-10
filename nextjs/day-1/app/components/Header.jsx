import React from "react";
import Link from "next/link";

export default function Header() {
  const headerLinks = [
    {
      path: "/about",
      title: "About",
    },
    {
      path: "/contact",
      title: "Contact Us",
    },
    {
      path: "/products",
      title: "All Products",
    },
  ];
  return (
    <header className="pb-6 bg-white lg:pb-0">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link href="/" title="" className="flex">
              Header
            </Link>
          </div>

          {/* <button
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8h16M4 16h16"
                />
              </svg>

              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button> */}

          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            {headerLinks.map((ele) => {
              return (
                <Link
                  key={ele.title}
                  href={ele.path}
                  title=""
                  className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {ele.title}
                </Link>
              );
            })}
          </div>

          <Link
            href="#"
            title=""
            className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700"
            role="button"
          >
            Get started now
          </Link>
        </nav>
      </div>
    </header>
  );
}
