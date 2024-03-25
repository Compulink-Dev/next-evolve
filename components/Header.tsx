'use client'
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { MdClose, MdHome, MdMenu } from 'react-icons/md';
import { Colors } from '@/constant/colors';
import Timer from './Timer';


const menuLInks = [
  {
    id: 1,
    link: '/',
    name: "Home"
  },
  {
    id: 2,
    link: '/about',
    name: "About"
  },
  {
    id: 3,
    link: '/speakers',
    name: "Speakers"
  },
  {
    id: 4,
    link: '/sponsors',
    name: "Sponsors"
  },
  {
    id: 5,
    link: '/event',
    name: "Evolve Summit 2024"
  },
  {
    id: 6,
    link: '/contact',
    name: "Contact"
  },
]

function Header() {
  const [navbar, setNavbar] = useState(false);
  const [isVisible, setIsVisible] = useState(false)
  const [header, setHeader] = useState(false)

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true)
    }
    else {
      setHeader(false)
    }
  }


  useEffect(() => {
    window.addEventListener('scroll', scrollHeader)
    return () => {
      window.addEventListener('scroll', scrollHeader)
    }
  })

  return (
    <div className="fixed w-full z-50">
      <div className={header ? "hidden" : "flex"}>
        <div className={`w-full flex justify-between items-center bg-gradient-to-r from-[#ffff] via-blue-200 to-blue-300  py-4 px-4 md:px-12 h-24`}>
          <Link href={'/'}>
            <Image unoptimized src={'/home/logo.png'} alt='' width={100} height={100} className='w-20 h-8 ' />
          </Link>
          <Timer />
          <div className="text-blue-950 text-sm text-end">
            <p className="font-bold text-xs md:text-sm">Core Agenda & Exhibition: 02 May 2024</p>
            <p className="text-xs md:text-sm">Exhibition Opening Dates: 02 - 03 May 2024</p>
            <p className="">Rainbow Towers, Harare</p>
          </div>
        </div>
      </div>

      <header

        className="flex justify-center w-full items-center px-4  h-full py-4 md:py-0 md:h-20 bg-slate-100">
        <ul className="hidden md:flex w-full items-center justify-center">
          <div className="">
            {
              header ?

                <Link href={'/'}>
                  <Image unoptimized src={'/home/logo.png'} alt='' width={80} height={80} className='mr-4' />
                </Link>
                :
                <Link href={'/'} className='text-3xl pb-4 md:pb-0 text-blue-95'>
                  <MdHome style={{ color: Colors.primary }} />
                </Link>
            }
          </div>
          {
            menuLInks.map((link) => (
              <li
                key={link.id}
                className="px-3 text-center mb-2 md:mb-0  ">
                <Link
                  key={link.id}
                  href={link.link}
                  className="hover:border-b-2 w-full hover:border-blue-950 transition-all pb-2 text-blue-500 text-xs"
                  style={{ color: Colors.primary }}

                  onClick={() => setNavbar(!navbar)}
                >
                  {link.name}
                </Link>
              </li>
            ))
          }
        </ul>



        <div className={"w-full flex items-center justify-between"}>
          {
            header ?
              <Link href="/" className="text-lg md:text-3xl block md:hidden pb-4 md:pb-0 text-blue-950">
                <Image unoptimized src={'/home/logo.png'} alt='' width={100} height={100}></Image>
              </Link>
              :
              <Link href="/" className="text-3xl pb-4 md:pb-0 text-blue-950  hidden ">
                <MdHome />
              </Link>
          }
          <div className="flex items-center justify-end md:py-3 md:block">
            {/* HAMBURGER BUTTON FOR MOBILE */}
            <div className="md:hidden">
              <button
                className="-mt-8 px-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <MdClose className="text-2xl text-blue-950" />
                ) : (
                  <MdMenu className="focus:border-none active:border-none text-2xl text-white"
                    style={{ color: Colors.primary }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>



        <div
          className={`flex-1 w-full h-full justify-self-center pb-3 -mt-14 md:flex md:pb-0 md:mt-0 ${navbar ? "p-12 md:p-0 flex" : "hidden"
            }`}
        >
          <div className="flex flex-1 h-full w-full flex-col mt-8  md:hidden gap-5">

            <ul
              className={`flex-1 justify-self-center pb-3 h-full w-full -mt-14 md:block md:pb-0 md:mt-0 ${navbar ? "p-12 md:p-0 block" : "hidden"
                }`}
            >
              {
                menuLInks.map((link) => (
                  <li
                    key={link.id}
                    className="px-6 text-center mb-4 md:mb-0  ">
                    <Link
                      key={link.id}
                      href={link.link}
                      className="hover:border-b-2 hover:border-blue-500 transition-all  pb-2 text-blue-500 text-xs"
                      style={{ color: Colors.primary }}

                      onClick={() => setNavbar(!navbar)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))
              }
            </ul>

            <Button
              style={{ backgroundColor: Colors.blue }}
              className="bg-blue-950 hover:bg-blue-500"
            >
              <Link href="/registry" className="text-sm">
                Register
              </Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:flex gap-5">
          <Button
            style={{ backgroundColor: Colors.blue }}
            className="bg-blue-950 hover:bg-blue-500"
          >
            <Link href="/registry" className="text-sm">
              Register
            </Link>
          </Button>
        </div>


      </header>
    </div>
  )
}

export default Header