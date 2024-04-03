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
import Link from 'next/link'

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
                <div className="p-12 text-white">
                    <div className="">
                        <p className="my-8 font-bold text-2xl">Login</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                                style={{ backgroundColor: Colors.blue }}
                                type="submit"
                                className='w-full mt-4'>Login</Button>
                        </form>
                        <div className="mt-4">
                            <Link href={'/forgotPassword'} className="text-xs">Forgot password?</Link>
                            <div className="mt-4 text-xs">
                                <p className="">{"Don't have an account ? "}<span className="">
                                    <Link href={'/registry'} className='font-bold text-md'>{" "}Sign up</Link>
                                </span> </p>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login