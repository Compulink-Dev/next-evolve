import Link from 'next/link'
import React from 'react'

function Button({ link, name }: { link: string, name: string }) {
    return (
        <Link href={link} className=" text-center px-4 py-2 bg-purple-600 text-white rounded-sm hover:scale-95 transition duration-1000">
            {name}
        </Link>
    )
}

export default Button