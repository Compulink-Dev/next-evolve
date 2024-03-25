import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Colors } from '@/constant/colors'




function Hero({ }) {
    return (
        <div
            style={{ backgroundColor: Colors.primary }}
            className='pt-[80px] md:pt-[150px] bg-slate-200'>
            <Image src={'/hero2.png'} alt='banner' height={700} width={200} className='object-contain w-full h-[400px] sm:h-[350px] md:h-[500px] mb-8' />
            <div className="flex flex-col items-center justify-end pb-8 md:pb-12 px-4 md:px-0">
                <Button
                    style={{ backgroundColor: Colors.blue }}
                    className='bg-blue-950 p-8 w-full md:w-3/5'>
                    <Link href={'/login'}>
                        Register your interest for the Evolve Summit
                    </Link>
                </Button>
                <Button className='mt-4 w-full md:w-3/5 p-8' variant={'outline'}>
                    <Link
                        style={{ color: Colors.blue }}
                        href={'/contact'}>
                        Enquire to become a partner
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default Hero