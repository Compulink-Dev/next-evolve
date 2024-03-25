import Title from '@/components/Title'
import { Colors } from '@/constant/colors'
import React from 'react'
import SponsorForm from './_components/SponsorsForm'

function Sponsors() {
    return (
        <div className=''>
            <Title name="Sponsors" colors={Colors.primary} />
            <SponsorForm />
        </div>
    )
}

export default Sponsors