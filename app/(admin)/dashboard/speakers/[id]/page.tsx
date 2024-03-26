import React from 'react'

const getTopicById = async (id: any) => {
    try {
        const res = await fetch(`${process.env.API_ROUTE}/api/speakers/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch speaker");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};


function Speaker() {
    return (
        <div className='p-8'>Speaker</div>
    )
}

export default Speaker