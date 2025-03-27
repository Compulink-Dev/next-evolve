import Image from 'next/image'
import React from 'react'

function Title({ title, subtitle }: any) {
    return (
        <div className="py-8 flex flex-col items-center justify-center">
            <Image className='animate-pulse' src={'/home-1-light.png'} alt='' width={200} height={50} />
            <p className="text-3xl md:text-5xl font-bold text-slate-300">{title}</p>
            <p className="text-3xl md:text-5xl font-bold text-slate-400">{subtitle}
            </p>
        </div>
    )
}

export default Title