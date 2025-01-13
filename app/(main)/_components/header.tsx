import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { NavMenu } from './navMenu'
import Navbar from './responsive-nav'

function Header() {
    return (
        <div className='relative overflow-hidden z-20 bg-purple-950'>
            <Image
                className=' h-[600px] w-full object-cover rounded-br-3xl rounded-bl-3xl'
                src={'/evolve.jpg'} alt='' width={100} height={100} />
            <div className="hidden md:block absolute h-auto pb-4 w-full bg-white top-0 right-0">
                <div className="space-x-12 p-4 text-sm text-slate-500">
                    <Link
                        className='hover:text-purple-500'
                        href={'/'} >Home</Link>
                    <Link
                        className='hover:text-purple-500'
                        href={'/about'} >About us</Link>
                    <Link
                        className='hover:text-purple-500'
                        href={'/event'} >Events</Link>
                    <Link
                        className='hover:text-purple-500'
                        href={'/gallery'} >Gallery</Link>
                    <Link
                        className='hover:text-purple-500'
                        href={'/blogs'} >Blogs</Link>
                    <Link
                        className='hover:text-purple-500'
                        href={'/contact'} >Contact us</Link>
                    <Link
                        className='hover:text-purple-500'
                        href={'/registry'} >Register</Link>
                    <Link
                        className='hover:text-purple-500'
                        href={'/previous'} >2024</Link>
                </div>
                <div className="px-4">
                    <Image
                        className='h-[150px] w-[300px]'
                        width={300} height={300} src={'/logo.png'} alt='' />
                </div>
                <div className="hidden md:flex absolute right-36 top-10 w-[350px] border-[8px] border-white h-[400px] bg-black rounded-3xl">
                    <Image src={'/evolve.jpg'} alt='' width={100} height={100} className='w-full h-full object-cover rounded-3xl' />

                </div>

            </div>
            <div className="block md:hidden absolute h-auto p-4 w-full bg-white top-0 right-0">
                <div className="flex items-center justify-between">
                    <Image
                        className='h-[50px] w-[100px]'
                        width={300} height={300} src={'/logo.png'} alt='' />
                    <div className="">
                        <Navbar />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-32 md:w-[550px] left-8 md:left-16 text-white">
                <p className="text-2xl md:text-4xl font-extrabold">SUSTAINABLE ICT SOLUTIONS FOR THE FUTURE</p>
                <p className="mt-8  md:text-2xl">3-4 JULY 2025</p>
                <p className="text-xs md:text-sm">HARARE INTERNATIONAL</p>
                <p className="text-xs md:text-sm">CONFERENCE CENTER</p>
            </div>
        </div>
    )
}

export default Header