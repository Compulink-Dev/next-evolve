import React from 'react';
import Title from '../../_components/title';

function Values() {
    const values = [
        {
            vision: 'VISION',
            description: "Let’s think about our world, Zimbabwe, Africa. Where we are today and where we would like to be tomorrow and how we can strategize together to get there.",
            color: 'bg-blue-800',
        },
        {
            vision: 'RELEVANCE',
            description: "Let’s employ our knowledge and understanding of ICT to appropriately enhance our world and environment in Africa.",
            color: 'bg-purple-900',
        },
        {
            vision: 'INNOVATION',
            description: "It is said you cannot do the same thing and expect a different answer. Let’s think of new ways that we can employ using ICT in order to advance.",
            color: 'bg-purple-950',
        },
        {
            vision: 'MENTORSHIP',
            description: "A good man leaves an inheritance for his children’s children. Let’s impart the wealth of ICT knowledge we have to the next generation.",
            color: 'bg-blue-900',
        },
    ];

    return (
        <div className='bg-blue-950 p-8 text-slate-400'>
            <div className="">
                <Title title="Evolve I.C.T Summit Core Values" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                    <div key={index} className={`flex flex-col md:flex-row cursor-pointer hover:animate-bounce w-full items-start gap-6 ${value.color} p-4 rounded-lg shadow-lg`}>
                        <div className={`p-8 flex items-center justify-center ${value.color} border rounded-md`}>
                            <p className="text-lg font-bold text-white">{value.vision}</p>
                        </div>
                        <p className="text-base">
                            {value.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Values;
