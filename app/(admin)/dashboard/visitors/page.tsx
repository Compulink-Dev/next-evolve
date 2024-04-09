import React from 'react'
import { MdDelete, MdEdit, MdEmail, MdFlag, MdHomeWork, MdLocationPin, MdPerson, MdPhone, MdUpdate } from 'react-icons/md'

interface VisitorProps {
    name: string
    surname: string
    position: string
    company: string
    status: string
    number: string
    country: string
    email: string
    industry: string
    state: 'Student' | 'Company'
}


const getVisitors = async () => {
    try {
        const res = await fetch(`${process.env.API_ROUTE}/api/registration/`)

        if (!res.ok) {
            throw new Error("Failed to fetch visitors")
        }
        return res.json()
    } catch (error) {
        console.log("Error loading visitors", error);

    }
}

const VisitorCard = ({ name, surname, position, company, status, number, email, country, industry, state }: VisitorProps) => {
    return (
        <div className="my-6 border p-4 flex justify-between">
            <div className="rounded flex gap-2">
                <div className="border p-2 flex items-center justify-center rounded-full w-20 h-20">
                    <MdPerson className='text-4xl text-slate-400' />
                </div>
                <div className="">
                    <div className="flex gap-2 text-2xl font-bold">
                        <p className="">{name}</p>
                        <p className="">{surname}</p>
                    </div>
                    <div className="text-slate-500">
                        <div className="flex items-center gap-2">
                            <MdPerson className='text-slate-400' />
                            <p className="">{position}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <MdHomeWork className='text-slate-400' />
                            <p className="">{company}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center text-slate-500">
                        <MdEmail className='text-slate-400' />
                        <p className="">{email}</p>
                    </div>
                    <div className="flex gap-2 items-center text-slate-500">
                        <MdPhone className='text-slate-400' />
                        <p className="">{number}</p>
                    </div>
                    <div className="flex gap-2 items-center text-slate-500">
                        <MdLocationPin className='text-slate-400' />
                        <p className="">{state}</p>
                    </div>
                    <div className="flex gap-2 items-center text-slate-500">
                        <MdFlag className='text-slate-400' />
                        <p className="">{country}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between">
                <div className="space-y-2">
                    <div className="p-4 h-6 bg-red-400 rounded flex items-center justify-center text-white text-sm">
                        {status}
                    </div>
                    <div className="p-4 h-6 bg-blue-400 rounded flex items-center justify-center text-white text-sm">
                        {status}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="border  h-8 w-8 text-slate-600 flex items-center justify-center rounded-full">
                        <MdEdit />
                    </div>
                    <div className="bg-red-700 h-8 w-8 text-white flex items-center justify-center rounded-full">
                        <MdDelete />
                    </div>
                </div>
            </div>
        </div>
    )
}

async function Visitors() {
    const { visitors } = await getVisitors()
    let number = 0
    return (
        <div className=''>
            <div className="">
                {
                    visitors.map((data: any, index: any) => {
                        number = index
                        return (
                            <div key={index} className="hidden">{index}
                            </div>
                        )
                    })
                }
            </div>
            <div className="font-bold text-lg">Visitors <span className=''>{`( ${number} )`}</span></div>
            <div className="">
                {
                    visitors.map((visitor: any) => (
                        <VisitorCard
                            name={visitor.firstName}
                            surname={visitor.lastName}
                            position={visitor.position}
                            company={visitor.company}
                            status={'Pending'}
                            number={visitor.phoneNumber}
                            country={visitor.country}
                            email={visitor.email}
                            industry={visitor.industry}
                            state={`Company`}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Visitors