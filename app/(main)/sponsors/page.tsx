import React from 'react'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'

import Subtitle from '../../../components/subtitle'
import SponsorCard from '../../../components/SponsorCard'
import SponsorBenefits from '../../../components/SponsorBenefits'
import SponsorshipTerms from '../../../components/SponsorshipTerms'
import { Colors } from '@/constant/colors'
import { packages } from '@/constant/data'


function Sponsor() {
    return (
        <Layout>
            <div className='px-6 my-8'>
                <div className="text-center">
                    <Title name={'EVENT SPONSORSHIP'} color={Colors.primary} />
                    <Subtitle name={'PROSPECTUS'} color={Colors.text} />
                </div>
                <div className="mt-8">
                    <p className=""><span className="font-extrabold text-lg" style={{ color: Colors.primary }}>PLATINUM SPONSORSHIP </span>PACKAGES</p>
                    <p className="text-sm md:text-md" style={{ color: Colors.blue }}>
                        Premier sponsorships with priority exposure, exclusive marketing opportunities and title naming
                    </p>
                </div>
                <div className="my-6">
                    {
                        packages.map((data: any) => (
                            <SponsorCard
                                key={data.id}
                                name={data.name}
                                price={data.price}
                                color={data.color}
                            >

                                <ol className='mt-4 text-sm' style={{}}>
                                    <li className='' style={{ color: Colors.blue }}>
                                        {data.benefit}
                                    </li>
                                </ol>
                            </SponsorCard>
                        ))
                    }
                </div>
                <div className="">
                    <SponsorBenefits />
                </div>
                <div className="">
                    <SponsorshipTerms />
                </div>
            </div>
        </Layout>
    )
}

export default Sponsor