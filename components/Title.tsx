import React from 'react'


function Title({ name, color }: any) {
    return (
        <div className='font-bold text-2xl md:text-4xl'
            style={{ color: `${color}` }}
        >{name}</div>
    )
}

export default Title
