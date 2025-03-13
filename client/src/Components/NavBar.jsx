"use client";
import React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-white text-xl font-bold">
            User Table
          </a>
          <button
            className="text-white cursor-pointer md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <ul
            className={`md:flex space-x-6 md:space-x-4 absolute md:static top-16 left-0 w-full bg-blue-600 md:bg-transparent md:w-auto md:flex-row md:items-center transition-all duration-300 ease-in-out ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-white hover:bg-blue-500 md:hover:bg-transparent"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-white hover:bg-blue-500 md:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-white hover:bg-blue-500 md:hover:bg-transparent"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-white hover:bg-blue-500 md:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
