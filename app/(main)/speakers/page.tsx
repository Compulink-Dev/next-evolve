import Layout from '@/components/Layout'
import React from 'react'
import Subscribe from '@/components/Subscribe'
import Speakers from '@/components/Speakers'

function SpeakersPage() {
    return (
        <Layout>
            <Speakers />
            <Subscribe />
        </Layout>
    )
}

export default SpeakersPage