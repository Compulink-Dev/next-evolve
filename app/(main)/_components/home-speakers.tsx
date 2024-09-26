import Title from '@/components/NewTitle'
import { Facebook, Linkedin, Twitter, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const SpeakerCard = () => {
    return (
        <div className="flex flex-col items-center justify-center text-slate-400 p-4 hover:shadow-2xl rounded">
            <div className="">
                <Image src={'/guest.png'} alt='' width={200} height={200} />
            </div>
            <div className="text-center">
                <p className="my-4 text-lg font-bold">Thomas Miller</p>
                <p className="text-sm">CEO, StemLady</p>
            </div>
            <div className="flex gap-4 items-center my-4">
                <Link
                    className=''
                    href={''}>
                    <Facebook size={20} />
                </Link>
                <Link href={''}>
                    <Twitter size={20} />
                </Link>
                <Link href={''}>
                    <FaWhatsapp />
                </Link>
                <Link href={''}>
                    <Linkedin size={20} />
                </Link>
            </div>
        </div>
    )
}

function HomeSpeakers() {
    return (
        <div className="bg-purple-950">
            <div className="">
                <Title
                    title="Our Amazing & learned"
                    subtitle="event Speakers"
                />
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SpeakerCard />
                    <SpeakerCard />
                    <SpeakerCard />
                </div>
            </div>
        </div>
    )
}

export default HomeSpeakers