import Title from '@/components/Title'
import { Colors } from '@/constant/colors'
import React from 'react'
import HomeForm from './_components/HomeForm'

function Home() {
    return (
        <div className=''>
            <Title name="Home" colors={Colors.primary} />
            <HomeForm />
        </div>
    )
}

export default Home