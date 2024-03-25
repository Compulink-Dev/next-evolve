import React from "react";
import { Colors } from "@/constant/colors";
import Link from "next/link";
import { FaThreads, FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import Image from "next/image";

function Footer() {
  return (
    <footer

      className="p-4 bg-white sm:p-6 bg-gradient-to-r from-blue-950 via-blue-400 to-blue-950 ">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="https://evolveictsummit.com" target="_blank" className="flex items-center">
              <Image src="/home/logo.png" className="mr-3 h-auto w-24" alt="Logo" width={200} height={200} />
              <span
                style={{ color: Colors.white }}
                className="self-center text-blue-700 text-2xl font-semibold whitespace-nowrap dark:text-white">Evolve Summit</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2
                style={{ color: Colors.white }}
                className="mb-6 text-sm font-semibold text-blue-900 uppercase dark:text-white">Resources</h2>
              <ul
                style={{ color: Colors.white }}
                className=" dark:text-gray-400 text-blue-700">
                <li className="mb-4">
                  <Link href="/services" className="hover:underline">Services</Link>
                </li>
                <li className="mb-4">
                  <Link href="/about" className="hover:underline">About</Link>
                </li>
                <li className="mb-4">
                  <Link href="/event" className="hover:underline">Events</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2
                style={{ color: Colors.white }}
                className="mb-6 text-sm font-semibold text-purple-900 uppercase dark:text-white">Follow us</h2>
              <ul
                style={{ color: Colors.white }}
                className="text-blue-700 dark:text-gray-400">
                <li className="mb-4">
                  <Link href="https://www.facebook.com/profile.php?id=61556472505176&mibextid=ZbWKwL" className="hover:underline ">Facebook</Link>
                </li>
                <li className="mb-4">
                  <Link href="https://www.instagram.com/evolveafricaictsummit/" className="hover:underline">Instagram</Link>
                </li>
                <li className="mb-4">
                  <Link href="#" className="hover:underline">Outlook</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2
                style={{ color: Colors.white }}
                className="mb-6 text-sm font-semibold text-purple-900 uppercase dark:text-white">Legal</h2>
              <ul
                style={{ color: Colors.white }}
                className="text-blue-700 dark:text-gray-400">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr
          style={{ backgroundColor: Colors.white }}
          className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="text-sm flex items-center justify-center mb-6 text-white font-bold">
          <Link href={'https://www.compulink.co.zw'}>
            <p className="">Designed by Compulink</p>
          </Link>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com" className="hover:underline">Evolve Summit</a>. All Rights Reserved.
          </span>
          <div
            style={{ color: Colors.white }}
            className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link
              style={{ color: Colors.white }}
              target="_blank"
              href="https://www.facebook.com/profile.php?id=61556472505176&mibextid=ZbWKwL" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaFacebook />
            </Link>
            <Link
              style={{ color: Colors.white }}
              target="_blank"
              href="https://www.instagram.com/evolveafricaictsummit/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaInstagram />
            </Link>
            <Link
              style={{ color: Colors.white }}
              target="_blank"
              href="https://twitter.com/EvolveICTSummit" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaTwitter />
            </Link>
            <Link
              style={{ color: Colors.white }}
              target="_blank"
              href="https://www.linkedin.com/company/evolveafricaictsummit/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaLinkedin />
            </Link>
            <Link
              style={{ color: Colors.white }}
              target="_blank"
              href="https://www.threads.net/@evolveafricaictsummit"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaThreads />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
