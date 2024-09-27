// app/previous/page.tsx
'use client'
import Layout from '@/components/Layout'
import React, { useState } from 'react'
import PreviousTabs from './_components/previous-tabs'
import PreviousSpeakers from './_components/speakers'
import PreviousEvents from './_components/events'
import PreviousGallery from './_components/gallery'
import Title from '../_components/title'

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
            <div className="p-8 bg-purple-950 text-slate-400">
                <Title
                    title="Evolve Summit 2024"
                />
            </div>
            <div className='p-8 flex gap-4 bg-purple-950 text-slate-400'>
                <PreviousTabs selection={selection} onSelect={setSelection} />
                <div className="flex-1">
                    {renderContent()}
                </div>
            </div>
        </Layout>
    )
}

export default Previous
