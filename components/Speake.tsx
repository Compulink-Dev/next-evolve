'use client'
import Link from 'next/link'
import React from 'react'
import { MdPerson } from 'react-icons/md'
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Title from './Title'
import Subtitle from './subtitle';
import { Colors } from '@/constant/colors';
import Speakers from '@/app/(main)/_components/speakers';




const Card = () => {



  return (
    <Link href={'/speakers/speaker'} className="border border-blue-950 rounded h-[400px] hover:shadow-2xl w-full mx-8">
      <div className="h-3/5 flex items-center justify-center">
        <MdPerson className='w-[200px] h-[200px] text-gray-500' />
      </div>
      <hr className='border border-blue-950' />
      <div className="text-center mt-4">
        <p className="font-bold text-lg">Name</p>
        <p className="text-gray-500">Position</p>
        <p className="font-bold">Department</p>
      </div>
    </Link>
  )
}

function Partner() {

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <div className='px-16 my-8'>
      <div className="">
        <Title color={Colors.primary} name='Guest Speakers' />
        <Title color={Colors.text} name='We have identified our speakers from the industry’s thought leaders, influencer, and professionals within Africa and beyond the borders of Africa. We believe their experience and expertise will go a long way in bringing relevance that will help connect with the audience and the themes we set.' />
      </div>
      <div className="flex w-full my-40 items-center justify-center text-lg text-blue-950">
        <div className="flex flex-col items-center justify-center">
          <p
            style={{ color: Colors.primary }}
            className="mb-4">Speakers are loading soon</p>
          <PulseLoader
            color={Colors.primary}
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
      {/* <div className="my-8 grid grid-col-1 md:grid-cols-4 gap-4 flex-wrap">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div> */}
      <Speakers />
    </div>
  )
}

export default Partner