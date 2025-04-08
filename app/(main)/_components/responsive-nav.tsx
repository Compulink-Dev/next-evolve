'use client'
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
// components/Navbar.tsx
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="z-50">
            <div className="container mx-auto flex flex-col justify-between items-center">
                <Button
                    variant={'ghost'}
                    onClick={toggleMenu}
                    className=" md:hidden focus:outline-none mb-2 text-slate-500"
                >
                    {isOpen ? <X /> : <Menu />}
                </Button>
                <div
                    className={`md:flex gap-4 flex-col items-center rounded p-4 md:items-center md:space-y-4 text-sm text-slate-500 ${isOpen ? 'flex' : 'hidden'
                        }`}
                >
                    <Link href="/" className='hover:text-purple-500'>
                        Home
                    </Link>
                    <Link href="/about" className='hover:text-purple-500'>
                        About
                    </Link>
                    <Link href="/event" className='hover:text-purple-500'>
                        Event
                    </Link>
                    <Link href="/gallery" className='hover:text-purple-500'>
                        Gallery
                    </Link>
                    <Link href="/contact" className='hover:text-purple-500'>
                        Contact
                    </Link>
                    <Link href="/summit" className='hover:text-purple-500'>
                        Summit
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
 