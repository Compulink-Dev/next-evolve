"use client";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdClose, MdHome, MdMenu } from "react-icons/md";

function NavBar() {
    const [navbar, setNavbar] = useState(false);
    const [isVisible, setIsVisible] = useState(false)

    const toggleMenu = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className=" bg-purple-600">
            <div className="flex items-center justify-between mx-4 py-4">
                {/* LOGO */}
                <Link href="/">
                    <Image unoptimized alt="" src="/logo.png" width={100} height={100} />
                </Link>
                <div className="text-white text-sm text-end">
                    <p className="font-bold">Core Agenda & Exhibition: 01 May 2024</p>
                    <p className="">Exhibition Opening Dates: 01 - 02 May 2024</p>
                    <p className="">Rainbow Tower, Harare</p>
                </div>
            </div>
            <nav className="bg-purple-200 py-4 ">

                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">

                    <ul className="hidden items-center ml-4 justify-center md:flex">
                        <Link href="/" className="text-3xl pb-4 md:pb-0 text-purple-500 ">
                            <MdHome />
                        </Link>
                        <li className="px-6 text-center mb-4 md:mb-0  ">
                            <Link
                                href="/about"
                                className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500"
                                onClick={() => setNavbar(!navbar)}
                            >
                                About
                            </Link>
                        </li>
                        <li className="px-6 text-center mb-4 md:mb-0  ">
                            <Link
                                href="/speakers"
                                className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500"
                                onClick={() => setNavbar(!navbar)}
                            >
                                Speakers
                            </Link>
                        </li>
                        <li className="px-6 text-center mb-4 md:mb-0  ">
                            <Link
                                href="/event"
                                className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500"
                                onClick={() => setNavbar(!navbar)}
                            >
                                Evolve 2024
                            </Link>
                        </li>
                        <li className="px-6 text-center mb-4 md:mb-0  ">
                            <Link
                                href="/contact"
                                className="hover:border-b-2 hover:border-purple-500 transition-all pb-2 text-purple-500"
                                onClick={() => setNavbar(!navbar)}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Responsive */}
                    <ul className="fixed left-0 right-0 min-h-screen bg-purple-900 space-y-4 p-4">
                        <Link href="/" className="text-3xl pb-4 md:pb-0 text-purple-500 ">
                            <MdHome />
                        </Link>
                        <li className="px-6 text-center mb-4 md:mb-0  ">
                            <Link
                                href="/about"
                                className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500"
                                onClick={() => setNavbar(!navbar)}
                            >
                                About
                            </Link>
                        </li>
                        <li className="px-6 text-center mb-4 md:mb-0  ">
                            <Link
                                href="/speakers"
                                className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500"
                                onClick={() => setNavbar(!navbar)}
                            >
                                Speakers
                            </Link>
                        </li>
                        <li className="px-6 text-center mb-4 md:mb-0  ">
                            <Link
                                href="/event"
                                className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500"
                                onClick={() => setNavbar(!navbar)}
                            >
                                Evolve Summit 2024
                            </Link>
                        </li>
                        <li className="px-6 text-center mb-4 md:mb-0  ">
                            <Link
                                href="/contact"
                                className="hover:border-b-2 hover:border-purple-500 transition-all pb-2 text-purple-500"
                                onClick={() => setNavbar(!navbar)}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <div>

                        <div className="flex items-center justify-end py-2 md:py-3 md:block">
                            <Link href="/" className="text-3xl pb-4 md:pb-0 text-purple-500 ">
                                <MdHome />
                            </Link>
                            {/* HAMBURGER BUTTON FOR MOBILE */}
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <MdClose className="text-2xl text-purple-500" />
                                    ) : (
                                        <MdMenu className="focus:border-none active:border-none text-2xl text-purple-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`flex-1 justify-self-center pb-3 -mt-14 md:block md:pb-0 md:mt-0 ${navbar ? "p-12 md:p-0 block" : "hidden"
                            }`}
                    >
                        <div className="flex flex-col mt-8  md:hidden gap-5">
                            <button
                                onClick={() => setNavbar(!navbar)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-sm hover:scale-95"
                            >
                                <Link href="/register" className="text-sm">
                                    Register
                                </Link>
                            </button>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-5">
                        <Button className="bg-purple-700 hover:bg-purple-400">
                            <Link href="/register" className="text-sm">
                                Register
                            </Link>
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
