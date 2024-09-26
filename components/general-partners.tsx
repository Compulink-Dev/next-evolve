import Image from 'next/image'
import React from 'react'
import Title from './NewTitle'

const PartnerCard = () => {
    return (
        <div className="text-slate-400 flex-flex-col w-36 items-center justify-center">
            <div className="bg-purple-200 h-36 w-36 rounded-3xl flex items-center justify-center">
                <Image src={'fm.png'} alt='' className='object-contain w-full h-full' width={100} height={100} />
            </div>
            <div className="text-center">
                <p className="my-3">Zi FM</p>
                <p className="">Partner</p>
            </div>
        </div>
    )
}

function GeneralPartners() {
    return (
        <div className='bg-purple-950'>
            <Title
                title="Partners who"
                subtitle="collaborate with us"
            />
            <div className="p-12 even:mt-0 odd:mt-4 flex gap-12">
                <PartnerCard />
                <PartnerCard />
                <PartnerCard />
                <PartnerCard />
            </div>
        </div>
    )
}

export default GeneralPartners