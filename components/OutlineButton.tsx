import { Colors } from '@/constant/colors'
import Link from 'next/link'
import React from 'react'

function OutlineButton({ name, link }: any) {
    return (
        <button

            className="">
            <Link
                style={{ backgroundColor: Colors.blue, color: Colors.white }}
                href={link}
                className="px-4 py-2 hover:border-b-2 hover:border-r-2 hover:border-blue-500 rounded-sm transition duration-1000 pb-2 "
            >
                {name}
            </Link>
        </button>
    )
}

export default OutlineButton