import Image from 'next/image'
import React from 'react'

function Title({ title }: any) {
    return (
        <div className="flex items-center gap-4 text-2xl font-bold">
            {title}
            <span className="">
                <Image className='animate-pulse' src={'/home-1-light.png'} alt='' width={200} height={50} />
            </span>
        </div>
    )
}

export default Title