import { Colors } from '@/constant/colors'
import React, { Children, ReactNode } from 'react'


interface CardProps {
    name: string,
    price: string,
    children: ReactNode,
    color: string
}


function SponsorCard({ name, price, children, color }: CardProps) {
    return (
        <div className=''>
            <div className='flex gap-1'>
                <div
                    style={{ backgroundColor: color }}
                    className={`h-28 bg-blue-600 w-16`}></div>
                <div className='flex-1'>
                    <div className='bg-slate-400 h-28 w-full p-4' style={{ color: Colors.white }}>
                        <p className='font-bold capitalize'>{name}</p>
                        <p className=''>Main Event & Dinner</p>
                        <p className='font-bold'>{`$ ${price}`}</p>
                    </div>
                    <div className="">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SponsorCard