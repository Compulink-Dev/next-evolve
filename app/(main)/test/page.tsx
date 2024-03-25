import Image from 'next/image'
import React from 'react'

const getTests = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/test", {
            cache: "no-store"
        })

        if (!res.ok) {
            throw new Error("Failed to fetch tests")
        }

        return res.json()
    } catch (error) {
        console.log("Error loading tests", error);

    }
}

async function TestPage() {
    const { tests } = await getTests()
    return (
        <div className="p-8">
            <div className='flex items-start justify-start mb-4'>
                {
                    tests.map((test: any) => (
                        <div
                            key={test._id}
                            style={{ backgroundColor: test.color }}
                            className="border p-4 rounded">
                            <Image src={test.imageUrl} width={300} height={300} alt='hero' className='object-contain' />
                            <p className="text-lg font-bold">{test.title}</p>
                            <p className="">{test.description}</p>
                        </div>
                    ))
                }
            </div>
            <p className="">Hello</p>
        </div>
    )
}

export default TestPage