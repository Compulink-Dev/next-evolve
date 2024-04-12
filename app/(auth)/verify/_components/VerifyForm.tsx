'use client'
import { Button } from '@/components/ui/button'
import { Colors } from '@/constant/colors'
import Image from 'next/image'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

function VerifyForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')

    const handleSubmit = async (e: any) => {

        const isValidEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        if (!isValidEmail(email)) {
            setErrors('Email is invalid')
            toast.error('Email is invalid')
            return
        }


        try {
            const res = await fetch(`/api/verify `, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });


            if (res.ok) {
                toast.success("Verification Successful");
                setName("")
                setEmail("")
                setPassword("")
            } else {
                toast.error('Form submission failed due to validation errors');
            }


        } catch (error) {
            toast.error("Unable to register");
        }
    }

    return (
        <div className="border rounded flex flex-col md:flex-row  gap-8 mb-6 my-8">
            <div className="flex items-center justify-center bg-white px-8 py-4 md:py-0">
                <Image src={"/home/logo.png"} priority width={200} height={200} alt="logo" />
            </div>
            <div className="p-6 text-white placeholder:text-white ">
                <div className="">
                    <p className="my-8 font-bold text-2xl">Create Account</p>
                </div>
                <form onSubmit={handleSubmit} action="" className="space-y-8">

                    <div className="grid gap-2">
                        <label className="text-sm font-bold">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            placeholder="Enter first name"
                            className="text-black p-2 text-sm rounded-lg w-full"
                        />
                        {/* {errors.firstName && <span className="text-xs text-red-200">{errors.firstName}</span>} */}
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-bold">Email</label>
                        <input
                            value={email}
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            placeholder="Enter email"
                            className="text-black p-2 text-sm rounded-lg w-full"
                        />
                        {/* {errors.firstName && <span className="text-xs text-red-200">{errors.firstName}</span>} */}
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-bold">Password</label>
                        <input
                            value={password}
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder="Enter password"
                            className="text-black p-2 text-sm rounded-lg w-full"
                        />
                        {/* {errors.firstName && <span className="text-xs text-red-200">{errors.firstName}</span>} */}
                    </div>
                    <Button
                        style={{ backgroundColor: Colors.primary }}
                        type="submit"
                        className="w-full"
                    >
                        Verify user
                    </Button>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default VerifyForm