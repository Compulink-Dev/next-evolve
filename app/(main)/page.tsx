import React from 'react';
import Layout from '@/components/Layout';
import HomeAbout from './_components/about';
import HomeEvent from './_components/event';
import HomeSpeakers from './_components/home-speakers';
import Ticketing from './_components/ticketing';
import GeneralPartners from '@/components/general-partners';
import Countdown from './_components/countdown';
import Title from './_components/title';
import Partnership from '@/components/partnership';

function HomePage() {
  const eventDate = new Date('2025-07-03T00:00:00');

  return (
    <div className="">
      <div className="p-8 bg-purple-950">
        <div className="text-white flex flex-col md:flex-row gap-8 items-center justify-between">
          <div>
            <Title title={'Countdown'} />
            <p className="text-3xl font-bold">
              Countdown Until the Event. Register Now
            </p>
          </div>
          <Countdown targetDate={eventDate} />
        </div>
      </div>
      <HomeAbout />
      <HomeEvent />
      <HomeSpeakers />
      <Ticketing />
      <GeneralPartners />
      <Partnership />
    </div>
  );
}

export default HomePage;
