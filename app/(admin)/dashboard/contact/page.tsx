import Title from '@/components/Title'
import { Colors } from '@/constant/colors'
import React from 'react'
import ContactForm from './_components/ContactForm'

function Contact() {
    return (
        <div className=''>
            <Title name="Contact" colors={Colors.primary} />
            <ContactForm />
        </div>
    )
}

export default Contact