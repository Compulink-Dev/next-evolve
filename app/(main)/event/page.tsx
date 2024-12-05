import Layout from '@/components/Layout'
import React from 'react'
import Partnership from '@/components/partnership'
import EventShow from './_components/Events'

function Events() {
    return (
        <div>
            <div className="bg-purple-950">
                <EventShow />
                <div className="">
                    <Partnership />
                </div>
            </div>
            {/* <div className="">
                <Event />
            </div> */}
        </div>
    )
}

export default Events