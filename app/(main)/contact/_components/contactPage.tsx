'use client'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { Colors } from "@/constant/colors";
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'


type LoginProps = {
    firstName: string,
    lastName: string
    email: string,
    message: string
}

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Enter valid username"
    }).max(50),
    lastName: z.string().min(2, {
        message: 'Password must contain 8 characters'
    }),
    email: z.string().min(2, {
        message: "Enter valid username"
    }).max(50),
    textarea: z
        .string()
        .min(10, {
            message: "Message must be at least 10 characters.",
        })
        .max(160, {
            message: "Message must not be longer than 30 characters.",
        }),
})



function ContactPage() {

    const form: any = useRef();

    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs
            .sendForm(`service_29qcsa4`, `template_15dj23x`, form.current, {
                publicKey: `kdSrStM0SlEFOPM61`,
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
        e.target.reset()
    };




    // 2. Define a submit handler.
    async function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form data.
        // ✅ This will be type-safe and validated.

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                message: data.textarea
            })
        })

        firstName: ""
        lastName: ""
        email: ""
        textarea: ""

        console.log(response)

    }



    return (
        <div className="">
            <div className="container mx-auto max-w-7xl my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col justify-center items-center">
                    <h1
                        style={{ color: Colors.blue }}
                        className="font-bold text-2xl md:text-4xl text-purple-400">
                        Please Send Us Your Enquiry
                    </h1>

                    <div className="border border-blue-500 p-4 mt-8 rounded w-full">
                        <form ref={form} onSubmit={sendEmail} className='mt-8 mb-2 w-full'>
                            <div className="mb-4 flex flex-col w-500">
                                <label style={{ color: Colors.blue }} className='text-sm font-bold'>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder='Enter full name'
                                    className="text-black border p-2 rounded outline-none"
                                />
                                <label style={{ color: Colors.blue }} className='text-sm font-bold mt-2'>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Enter email'
                                    className="w-full text-black border p-2 rounded outline-none"
                                />
                                <label style={{ color: Colors.blue }} className='text-sm font-bold mt-2'>Phone number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder='Enter phone number'
                                    className="text-black border p-2 rounded outline-none"
                                />
                                <label style={{ color: Colors.blue }} className='text-sm font-bold mt-2'>Message</label>
                                <textarea
                                    name="message"
                                    placeholder='Enter message'
                                    className="resize-none border rounded p-2 outline-none"
                                    rows={5}
                                />
                                <input type="submit" value="Send" style={{ background: Colors.blue }} className=' w-full rounded mt-4 bg-sky-400 text-white px-4 py-2' />
                            </div>
                        </form>
                    </div>
                </div>


                <div className="container w-full px-4 md:px-0 mx-auto max-w-7xl flex flex-col justify-center items-center">
                    <div className="border border-blue-600 rounded-lg w-full">
                        <div className="border-b border-blue-300  max-w-7xl container mx-auto text-center p-4">
                            <h1 className="font-bold text-lg text-blue-500 ">
                                Our Contact Details
                            </h1>
                        </div>

                        <div className="w-full max-w-7xl container mx-auto py-4 px-12 border-b-2 border-blue-200">
                            <h1 className="text-sm" style={{ color: Colors.text }}>info@evolveictsummit.com</h1>
                        </div>
                        <div className="max-w-7xl container mx-auto py-4 px-12 border-b-2 border-blue-200">
                            <h1 className="text-sm" style={{ color: Colors.text }}>
                                <Link
                                    target='_blank'
                                    href={'https://www.evolveictsummit.com'}>
                                    www.evolveictsummit.com
                                </Link>
                            </h1>
                        </div>
                        <div className=" max-w-7xl container mx-auto py-4 px-12">
                            <h1 className="text-sm font-bold text-blue-500">Office Address</h1>
                        </div>
                        <div className=" max-w-7xl container mx-auto py-4 px-12 border-b-2 border-blue-200">
                            <h1 className="text-sm" style={{ color: Colors.text }}>
                                313 Samora Machel East, Eastlea, Harare Zimbabwe
                            </h1>
                        </div>
                        <div className=" max-w-7xl container mx-auto py-4 px-12">
                            <h1 className="text-sm font-bold text-blue-500">Our Contact Details</h1>
                        </div>
                        <div className=" max-w-7xl container mx-auto py-4 px-12 border-b-2 border-blue-200">
                            <h1 className="text-sm" style={{ color: Colors.text }}>Tel: +263 242 494407, 08677 105 028</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
