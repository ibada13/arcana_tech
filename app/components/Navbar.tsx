"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const navlinks = [
  { name: "Home", href: "/" },
  { name: "PCs", href: "/pcs" },
  { name: "Laptops", href: "/laptops" },
  {
    name: "Components",
    dropdown: true,
    sublinks: [
      { name: "CPUs", href: "/components/cpus" },
      { name: "GPUs", href: "/components/gpus" },
      { name: "RAM", href: "/components/ram" },
      { name: "Storage", href: "/components/storage" },
      { name: "Power Supplies", href: "/components/psu" },
      { name: "Cases", href: "/components/cases" },
      { name: "Cooling", href: "/components/cooling" },
    ],
  },
  { name: "Accessories", href: "/accessories" },
  { name: "Sold Items", href: "/sold" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed w-[95%] bg-gray-900/70 backdrop-blur-lg shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-xl font-light text-white tracking-wide">
          TechStore
        </Link>

        <ul className="hidden md:flex space-x-8 text-white text-sm font-light tracking-wide">
          {navlinks.map((link, index) =>
            link.dropdown ? (
              <li key={index} className="relative group">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 hover:text-gray-300 transition"
                >
                  {link.name}
                  <FiChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <ul
                  className={`absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                    dropdownOpen ? "opacity-100" : ""
                  }`}
                >
                  {link.sublinks?.map((sublink, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={sublink.href}
                        className="block px-4 py-2 hover:bg-gray-700 rounded-md transition"
                      >
                        {sublink.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={index}>
                <Link href={link.href as string} className="hover:text-gray-300 transition">
                  {link.name}
                </Link>
              </li>
            )
          )}
        </ul>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-black p-6 shadow-lg transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-[150%]"
          }`}
        >
          <button
            className="text-white mb-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiX className="w-6 h-6" />
          </button>
          <ul className="flex flex-col p-2 w-64 bg-black right-0 fixed  space-y-6 text-white text-sm font-light">
            {navlinks.map((link, index) =>
              link.dropdown ? (
                <li key={index} className="relative bg-black">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-center gap-1 hover:text-gray-300 w-full text-left transition"
                  >
                    {link.name} <FiChevronDown className="w-4 h-4" />
                  </button>
                  {dropdownOpen && (
                    <ul className="mt-2 transition-transform duration-300 bg-gray-800 rounded-lg p-2">
                      {link.sublinks?.map((sublink, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={sublink.href}
                            className="block px-4 py-2 hover:bg-gray-700 rounded-md transition"
                          >
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index}>
                  <Link href={link.href as string} className="hover:text-gray-300 transition">
                    {link.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
