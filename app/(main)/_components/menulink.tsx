'use client'
import Link from 'next/link'
import React, { useState } from 'react'



function MenuLink({ href, name }: any) {
    const [navbar, setNavbar] = useState(false);
    return (
        <li className="px-6 text-center mb-4 md:mb-0  ">
            <Link
                href={`/${href}`}
                className="hover:border-b-2 hover:border-purple-500 transition-all  pb-2 text-purple-500"
                onClick={() => setNavbar(!navbar)}
            >
                {name}
            </Link>
        </li>
    )
}

export default MenuLink