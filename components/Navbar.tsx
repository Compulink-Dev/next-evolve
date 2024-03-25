"use client";
import { link } from "@/constant/data";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";

function Navbar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <header className="absolute ">
      <div className="flex fixed  top-0 left-0 w-full justify-between items-center gap-4 h-16 px-4 shadow-lg  bg-purple-100">
        <Link href="/">
          <Image alt="" src="/home/logo.png" width={100} height={50} />
        </Link>
        <div className="hidden md:flex">
          <ul className="flex space-x-4">
            {
              link.map((data: any) => (
                <li key={data.id}>
                  <Link
                    href={data.link}
                    className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500"
                  >
                    {data.name}
                  </Link>
                </li>
              ))
            }
            <li>
              <Link
                href="/about"
                className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500"
              >
                Abouts
              </Link>
            </li>
            <li>
              <Link
                href="/speakers"
                className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500"
              >
                Speakers
              </Link>
            </li>
            <li>
              <Link
                href="/event"
                className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500"
              >
                Event
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:border-b-2 hover:border-purple-500 transition-all pb-2 text-purple-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex gap-5">
          <button className=" border-spacing-3 border-bottom border-purple-600 rounded-sm">
            <Link
              href="/auth/login"
              className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500 text-sm"
            >
              Register
            </Link>
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-sm hover:scale-95">
            <Link href="/register" className="text-sm">
              Book a Meeting
            </Link>
          </button>
        </div>
        <button className="flex md:hidden" onClick={() => { }}>
          <MdMenu className="text-2xl text-purple-600 hover:scale-95" />
        </button>
      </div>
      <div
        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "p-12 md:p-0 block" : "hidden"
          }`}
      >
        <ul className="h-screen md:h-auto items-center justify-center md:flex ">
          <li className="pb-6 text-xl text-white py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
            <Link href="#about" onClick={() => setNavbar(!navbar)}>
              About
            </Link>
          </li>
          <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
            <Link href="#blog" onClick={() => setNavbar(!navbar)}>
              Blogs
            </Link>
          </li>
          <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
            <Link href="#contact" onClick={() => setNavbar(!navbar)}>
              Contact
            </Link>
          </li>
          <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
            <Link href="#projects" onClick={() => setNavbar(!navbar)}>
              Projects
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
