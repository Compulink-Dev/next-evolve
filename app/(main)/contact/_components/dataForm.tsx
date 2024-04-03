"use client"
import { useState } from 'react';

export default function DataForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('')

    const sendMail = async (e: any) => {
        e.preventDefault();

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                message
            })
        })

        const data = await response.json()
        console.log(data)
    }


    return (
        <main className="flex min-h-screen flex-col p-24">
            <form onSubmit={sendMail} className="h-full w-1/3 space-y-6">
                <div className="flex flex-col items-start w-full justify-start">
                    <h1 className="text-xl font-semibold">Tutorial Email</h1>
                </div>
                <div className="flex gap-4">
                    <div className="relative flex flex-col space-y-1">
                        <label htmlFor="title" className="text-sm font-light text-gray-500">
                            First Name
                        </label>
                        <input
                            name="firstName"
                            type="text"
                            id="firstName"
                            required
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            placeholder="Enter first name"
                            className="rounded-xl border-2 border-gray-400 p-2"
                        />
                    </div>
                    <div className="relative flex flex-col space-y-1">
                        <label htmlFor="title" className="text-sm font-light text-gray-500">
                            Last Name
                        </label>
                        <input
                            name="lastName"
                            type="text"
                            id="lastName"
                            required
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            placeholder="Enter last name"
                            className="rounded-xl border-2 border-gray-400 p-2"
                        />
                    </div>
                </div>
                <div className="relative flex flex-col space-y-1">
                    <label htmlFor="title" className="text-sm font-light text-gray-500">
                        Email
                    </label>
                    <input
                        name="email"
                        type="text"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder="Enter your email address"
                        className="rounded-xl border-2 border-gray-400 p-2 w-full"
                    />
                </div>
                <div className="relative flex flex-col space-y-1">
                    <label htmlFor="title" className="text-sm font-light text-gray-500">
                        Enter message
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        cols={10}
                        rows={5}
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                        placeholder="What will you title this goal?"
                        className="rounded-xl border-2 border-gray-400 p-2"
                    />
                </div>
                <button type='submit' className="ml-auto flex w-1/2 items-center justify-center space-x-3 rounded-lg bg-blue-600 p-2 text-white shadow-blue-500 hover:bg-blue-700 hover:shadow-md">
                    <span>Send Message</span>
                </button>
            </form>
        </main>
    )
}