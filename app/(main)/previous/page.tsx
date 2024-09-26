// app/previous/page.tsx
'use client'
import Layout from '@/components/Layout'
import React, { useState } from 'react'
import PreviousTabs from './_components/previous-tabs'
import PreviousSpeakers from './_components/speakers'
import PreviousEvents from './_components/events'
import PreviousGallery from './_components/gallery'

function Previous() {
    const [selection, setSelection] = useState('')

    const renderContent = () => {
        switch (selection) {
            case 'speakers':
                return <PreviousSpeakers />
            case 'event':
                return <PreviousEvents />
            case 'gallery':
                return <PreviousGallery />
            default:
                return <div>Select an option to view content</div>
        }
    }

    return (
        <Layout>
            <div className="p-8">
                <div className="text-3xl text-slate-400 font-bold">
                    Evolve Summit 2024
                </div>
            </div>
            <div className='p-8 flex gap-4'>
                <PreviousTabs selection={selection} onSelect={setSelection} />
                <div className="flex-1">
                    {renderContent()}
                </div>
            </div>
        </Layout>
    )
}

export default Previous
