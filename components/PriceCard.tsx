import Link from 'next/link'
import React from 'react'

function PriceCard({ title, price, per, children, desc, bColor }: any) {
    return (
        <Link className="p-4 xl:w-1/4 md:w-1/2 w-full" href={'/payments/payment'} >
            <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden" style={{ borderColor: `${bColor}` }}>
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{title}</h2>
                <h1 className="text-5xl text-purple-500 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                    <span className=''>{price}</span>
                    <span className="text-lg ml-1 font-normal text-gray-500">{per}</span>
                </h1>
                {children}
                <p className="text-xs text-gray-500 mt-3">{desc}</p>
            </div>
        </Link>
    )
}

export default PriceCard


{/* <p class="flex items-center text-gray-600 mb-2">
<span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>
</span>Vexillologist pitchfork
</p>
<p class="flex items-center text-gray-600 mb-2">
<span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>
</span>Tumeric plaid portland
</p>
<p class="flex items-center text-gray-600 mb-6">
<span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>
</span>Mixtape chillwave tumeric
</p> */}