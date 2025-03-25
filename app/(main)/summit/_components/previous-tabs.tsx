// app/_components/previous-tabs.tsx
'use client'
import React from 'react'

function PreviousTabs({ selection, onSelect }: { selection: string, onSelect: (selection: string) => void }) {

    const tabClasses = (tab: string) => {
        const isActive = selection === tab;
        return isActive
            ? "cursor-pointer bg-purple-500 text-white h-36 w-36 flex items-center justify-center border rounded-lg animate-pulse"
            : "cursor-pointer bg-purple-950 text-slate-400 h-36 w-36 flex items-center justify-center border rounded-lg";
    };

    return (
        <div className='flex gap-4'>
            <div className="gap-4 md:space-y-8  flex-wrap flex flex-row md:flex-col items-center">
        
                <div
                    onClick={() => onSelect('event')}
                    className={tabClasses('event')}>
                    Event
                </div>
            </div>
        </div>
    )
}

export default PreviousTabs
