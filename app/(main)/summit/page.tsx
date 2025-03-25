'use client'
import React, { useState } from 'react'
import PreviousTabs from './_components/previous-tabs'
import PreviousEvents from './_components/events'
import Title from '../_components/title'

function Summit() {
    const [selection, setSelection] = useState('event') // Default to 'event' tab

    const renderContent = () => {
        switch (selection) {

            case 'event':
                return <PreviousEvents />
            default:    
                return <PreviousEvents/>
        }
    }

    return (
        <div className="">
            <div className="p-8 bg-purple-950 text-slate-400">
                <Title
                    title="Evolve Summit"
                />
            </div>
            <div className='p-8 flex flex-col md:flex-row gap-4 bg-purple-950 text-slate-400'>
                <PreviousTabs selection={selection} onSelect={setSelection} />
                <div className="flex-1">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Summit