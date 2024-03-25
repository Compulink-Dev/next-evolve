'use client'
import React from 'react'
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
import { Colors } from '@/constant/colors'

type LoginProps = {
    email: string,
    password: string
}

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Enter valid username"
    }).max(50),
    password: z.string().min(2, {
        message: 'Password must contain 8 characters'
    })
})

function Login() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },

    })

    // 2. Define a submit handler.
    function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form data.
        // ✅ This will be type-safe and validated.
        console.log(data)
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="border rounded  flex gap-4">
                <div className="flex items-center justify-center bg-white px-8">
                    <Image src={'/home/logo.png'} width={200} height={200} alt='logo' />
                </div>
                <div className="p-8 text-white">
                    <div className="">
                        <p className="my-8 font-bold text-2xl">Admin Login</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                style={{ backgroundColor: Colors.primary }}
                                type="submit"
                                className='w-full'>Login</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login