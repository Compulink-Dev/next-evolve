import { Colors } from '@/constant/colors'
import React from 'react'


function SponsorshipTerms() {
    return (
        <div className='mt-8 p-4 ' style={{ backgroundColor: Colors.primary }}>
            <div className="">
                <p className="text-white"><span className="font-extrabold text-lg" style={{ color: Colors.white }}>SPONSORSHIP </span>TERMS & CONDITIONS</p>
            </div>
            <div className='mt-2 text-white '>
                <ul className='flex flex-col gap-2'>
                    <li className=''>
                        1. While every effort to ensure color matching with your brand is correct, the organisers cannot accept responsibility for inaccuracies
                    </li>
                    <li className="">
                        2. Material will only br accepted both JPEG & PDF electronic format
                    </li>
                    <li className="">
                        3. Sponsorship must be paid for in full prior to the date of the event.
                    </li>
                    <li className="">
                        4. Please ensure the company name, marketing contact, telephone and booking type are noted clearly when sending material electronically or by delivery.
                    </li>
                    <li className="">
                        5. Details supplied in the incorrect format will be the responsibility of the sponsor.
                    </li>
                    <li className="">
                        6. All the documents will be sent through to the sponsor for personal for perusal prior to being made public. For enquiries contact info@evolveictsummit.com Tel: 263 242 494407, 08677 105 028.
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SponsorshipTerms