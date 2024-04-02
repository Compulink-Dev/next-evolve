
import Subtitle from './subtitle'
import React from 'react'
import Title from './Title'
import { Colors } from '@/constant/colors'
import Image from 'next/image'
import Link from 'next/link'
import PulseLoader from "react-spinners/PulseLoader";
import Loader from './Loader'


const getSpeakers = async () => {
  try {
    const res = await fetch(`${process.env.API_ROUTE}/api/speakers`, {
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch speakers")
    }

    return res.json()
  } catch (error) {
    console.log("Error loading speakers", error);

  }
}


const getHosts = async () => {
  try {
    const res = await fetch(`${process.env.API_ROUTE}/api/hosts`, {
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch speakers")
    }

    return res.json()
  } catch (error) {
    console.log("Error loading speakers", error);

  }
}


const Speaker = ({ imageUrl, name, desc, post, link }) => {
  return (
    <Link
      href={link}
      className="mx-8 flex justify-between mb-8">
      <div className="border border-white w-full h-full rounded text-white flex flex-col justify-between">
        <div className="flex items-center justify-center p-4">
          <Image
            src={imageUrl}
            alt={name}
            width={180}
            height={180}
            className='rounded-full p-4 bg-white'
          />
        </div>
        <hr />
        <div className="p-8 text-center h-full text-sm bg-gradient-to-br from-blue-950 via-blue-600 to-blue-300 bg-blue-600 flex flex-col gap-2 items-center justify-center">
          <p className="font-bold text-lg">{name}</p>
          <p className="">{post}</p>
          <p className="font-bold text-lg">{desc}</p>
        </div>
      </div>
    </Link>
  )
}





async function Speakers() {

  const { hosts } = await getHosts()

  const { speakers } = await getSpeakers()
  return (
    <div
      style={{ backgroundColor: Colors.primary }}
      className=" bg-blue-950 py-4">
      <div className='m-8'>
        <Title color={Colors.white} name='Speakers' />
        <Subtitle title='Evolve ICT Summit' color='text-white' />
      </div>

      {/* <div className="flex w-full my-40 items-center justify-center text-lg text-white">
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4">Speakers are loading soon</p>
          <PulseLoader
            color="#ffffff"
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 gap-x-4">
        {
          speakers.map((speaker) => (
            <Speaker
              key={speaker._id}
              link={`/speakers/${speaker._id}`}
              name={speaker.name}
              imageUrl={speaker.imageUrl}
              desc={speaker.company}
              post={speaker.position}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Speakers