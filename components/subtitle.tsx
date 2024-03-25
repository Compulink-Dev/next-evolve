import React from 'react'

function Subtitle({ name, color }: any) {
    return (
        <p
            style={{ color: `${color}` }}
            className={`text-sm `}>{name}</p>
    )
}

export default Subtitle