import Title from '@/components/Title'
import { Colors } from '@/constant/colors'
import React from 'react'
import AboutForm from './_components/AboutForm'

function About() {
    return (
        <div className=''>
            <Title name="About" color={Colors.primary} />
            <div className="mt-4">
                <AboutForm />
            </div>
        </div>
    )
}

export default About