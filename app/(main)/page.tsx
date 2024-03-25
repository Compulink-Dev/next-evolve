import Details from '@/components/Details'
import Introduction from '@/components/Introduction'
import Layout from '@/components/Layout'
import React from 'react'
import Schedule from '@/components/Schedule'
import About from './_components/about'
import Partners from '@/components/Partner'
import Speakers from '@/components/Speakers'

function HomePage() {
  return (
    <Layout>
      <Introduction />
      <Details />
      <Speakers />
      <Schedule />
      <About />
      <Partners />
    </Layout>
  )
}

export default HomePage