import Title from '@/components/Title'
import { Colors } from '@/constant/colors'
import { interests } from '@/constant/data'
import React from 'react'




const Card = ({ imageUrl, title, subtitle }: any) => {
    return (
        <div className="bg-[url('/home3.jpg')] border w-full md:w-1/5  h-[150px] text-center py-4 object-contain rounded">
            <Title color={Colors.white} name={title} />
            <p
                style={{ color: Colors.blue }}
                className='text-lg font-bold'>{subtitle}</p>

        </div>
    )
}

function Interest() {
    return (
        <div className='m-8'>
            <div className="text-center">
                <Title color={Colors.primary} name='The Place to be' />
                <p className="text-gray-500 mt-2 mx-8 text-sm">
                    {"You can't beat Evolve I.C.T Summit for size, depth and opportunity: we're truly the continent's most influential tech event. Don't miss out on being part of Africa's largest tech event this May!"}
                </p>
            </div>
            <div className="flex items-center justify-center mt-8 gap-4 flex-wrap">
                {
                    interests.map((interest) => (
                        <Card title={interest.title} subtitle={interest.subtitle} key={interest.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Interest