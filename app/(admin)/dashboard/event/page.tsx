import Title from '@/components/Title'
import { Colors } from '@/constant/colors'
import React from 'react'
import EventForm from './_components/EventForm'

function Event() {
    return (
        <div className=''>
            <Title name="Event" colors={Colors.primary} />
            <EventForm />
        </div>
    )
}

export default Event