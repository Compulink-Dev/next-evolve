'use client'
import React, { useState } from 'react'
import GalleryPad from './GalleryPad';
import Title from '../../_components/title';


const images = [
    { id: '1', src: '/collab.jpg', alt: 'Picture 1' },
    { id: '2', src: '/exposure.jpg', alt: 'Picture 2' },
    { id: '3', src: '/contact.jpg', alt: 'Picture 3' },
    { id: '4', src: '/hotel.jpg', alt: 'Picture 4' },
    { id: '5', src: '/contact.jpg', alt: 'Picture 3' },
    { id: '6', src: '/hotel.jpg', alt: 'Picture 4' },
];


function GalleryCard() {

    const [gallery, setGallery] = useState('')

    return (
        <div className='mt-8'>
            <div className="">
                <Title title="Gallery" />
            </div>
            <div className="">
                <GalleryPad images={images} />
            </div>
        </div>
    )
}

export default GalleryCard