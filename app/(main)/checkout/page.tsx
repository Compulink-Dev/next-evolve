import Layout from '@/components/Layout'
// import SignOutButton from '@/components/SignOutButton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


interface PaymentProps {
    title: String,
    description?: String,
    price: String
}

const PayNowCard = () => {
    return (
        <a href='https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPWRpZ2l0YWxwYXltZW50cyU0MGNvbXB1bGluay5jby56dyZhbW91bnQ9NDAwLjAwJnJlZmVyZW5jZT1jb21wdTEyMyZsPTE%3d' target='_blank'>
            <Image width={100} height={100} src='https://www.paynow.co.zw/Content/Buttons/Medium_buttons/button_pay-now_medium.png' style={{ border: 0 }} alt='' />
        </a>
    )
}


const PaymentCard = ({ title, description, price }: PaymentProps) => {
    return (
        <div className="">
            <div className='border-2 border-blue-950 bg-white rounded h-[400px] w-[300px] hover:shadow-4xl'>
                <Image src={'/image.png'} alt='' width={100} height={100} className='w-full' />
                <div className="">
                    <p className='text-center text-2xl font-bold text-blue-800'>{title}</p>
                    <p className='text-center mt-2 font-bold text-blue-800 text-lg'>{price}</p>
                </div>
            </div>
        </div>
    )
}

function Checkout() {
    return (
        <div className="bg-gradient-to-tr from-blue-300 via-blue-500 to-blue-900 ">
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="mb-4 text-lg text-white font-bold">Select your package and join the Evolve Summit</p>
                {/* <SignOutButton /> */}
                <div className="flex items-center justify-center gap-8">
                    <a href='https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPWRpZ2l0YWxwYXltZW50cyU0MGNvbXB1bGluay5jby56dyZhbW91bnQ9MjAwLjAwJnJlZmVyZW5jZT1TdHVkZW50MjAyNCZsPTE%3d' target='_blank'>
                        <PaymentCard title={'Students'} price={'$200'} />
                    </a>
                    <a href='https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPWRpZ2l0YWxwYXltZW50cyU0MGNvbXB1bGluay5jby56dyZhbW91bnQ9NDAwLjAwJnJlZmVyZW5jZT1EZWxlZ2F0ZTIwMjQmbD0x' target='_blank'>
                        <PaymentCard title={'Delegates'} price={'$400'} />
                    </a>
                </div>
            </div>

        </div>
    )
}

export default Checkout