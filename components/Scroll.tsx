'use client'
import { Colors } from '@/constant/colors'
import { Button } from './ui/button'
import React, { useEffect, useState } from 'react'
import { MdArrowUpward } from 'react-icons/md'


function Scroll() {

    const [isVisible, setIsVisible] = useState(false)

    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true)
        }
        else {
            setIsVisible(false)
        }
    }

    useEffect(() => {
        // Add scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Button
            style={{ backgroundColor: Colors.blue }}
            className='fixed bottom-0 right-0 bg-blue-900 rounded-s-fill p-4 mr-6 mb-[60px] z-50 items-center text-xs flex gap-2'
            onClick={scrollToTop}
        >
            <MdArrowUpward className='inline-block h-4 w-4' />
        </Button>
    )
}

export default Scroll