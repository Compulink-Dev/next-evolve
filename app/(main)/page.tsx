import Details from '@/components/Details'
import Introduction from '@/components/Introduction'
import Layout from '@/components/Layout'
import React from 'react'
import Schedule from '@/components/Schedule'
import About from './_components/about'
import Partners from '@/components/Partner'
import Speakers from './speakers/_components/speakers'
import HomeAbout from './_components/about'
import Title from './_components/title'
import Countdown from './_components/countdown'
import { Dot } from 'lucide-react'
import HomeEvent from './_components/event'
import HomeSpeakers from './_components/home-speakers'
import Ticketing from './_components/ticketing'
import GeneralPartners from '@/components/general-partners'


function HomePage() {
  return (
    <Layout>
      <div className="p-8 bg-purple-950">
        <div className="text-white flex items-center justify-between">
          <div className="">
            <Title title={'Countdown'} />
            <p className="text-3xl font-bold">
              Countdown Until the Event. Register Now
            </p>
          </div>
          <div className="flex items-center">
            <Countdown value={"735"} type={"Days"} />
            <div className="flex flex-col">
              <Dot size={40} />
              <Dot size={40} />
            </div>
            <Countdown value={"13"} type={"Hours"} />
            <div className="flex flex-col">
              <Dot size={40} />
              <Dot size={40} />
            </div>
            <Countdown value={"03"} type={"Minutes"} />
            <div className="flex flex-col">
              <Dot size={40} />
              <Dot size={40} />
            </div>
            <Countdown value={"45"} type={"Seconds"} />

          </div>
        </div>
      </div>
      <HomeAbout />
      <HomeEvent />
      <HomeSpeakers />
      <Ticketing />
      <GeneralPartners />
      {/* <Introduction />
      <Details />
      <Speakers />
      <Schedule />
      <About />
      <Partners /> */}
    </Layout>
  )
}

export default HomePage