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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { Colors } from '@/constant/colors'
import Link from 'next/link'

type LoginProps = {
    firstName: string,
    lastName: string,
    jobTitle: string,
    company: string
    phoneNumber: string,
    country: string,
    state: string,
    email: string,
    industry: string,
    function: string,
    position: string,
    companySize: string,
    confirmPassword: string,
    password: string
}

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Enter valid username"
    }).max(50),
    lastName: z.string().min(2, {
        message: 'Enter valid last name'
    }),
    jobTitle: z.string().max(50),
    company: z.string().max(50),
    email: z.string().min(2, {
        message: 'Enter valid email'
    }),
    country: z.string().min(2, {
        message: "Enter valid country"
    }).max(50),
    state: z.string().min(2, {
        message: 'Enter valid state'
    }),
    industry: z.string().min(2, {
        message: "Enter valid industry"
    }).max(50),
    function: z.string().min(2, {
        message: "Enter valid function"
    }).max(50),
    phoneNumber: z.string().min(2, {
        message: "Enter valid phone number"
    }).max(50),
    companySize: z.string().min(2, {
        message: 'Company size is invalid'
    }),
    position: z.string().min(2, {
        message: "Enter valid position"
    }).max(50),
    password: z.string().min(2, {
        message: 'Password must contain 8 characters'
    }),
    confirmPassword: z.string().min(2, {
        message: "Password do not match"
    }).max(50),
})

function Registry() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            jobTitle: "",
            company: "",
            phoneNumber: "",
            country: "",
            state: "",
            email: "",
            industry: "",
            function: "",
            position: "",
            companySize: "",
            confirmPassword: "",
            password: ""
        },

    })

    // 2. Define a submit handler.
    function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form data.
        // ✅ This will be type-safe and validated.
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
        console.log(data)
    }

    return (
        <div className="border rounded flex flex-col md:flex-row  gap-8 m-8">
            <div className="flex items-center justify-center bg-white px-8 py-8 md:py-0">
                <Image src={'/home/logo.png'} width={200} height={200} alt='logo' />
            </div>
            <div className="p-8 text-white placeholder:text-white">
                <div className="">
                    <p className="my-8 font-bold text-2xl">Create Account</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="flex gap-4 w-full placeholder:text-white">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter first name" {...field} className='' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-4 w-full">
                            <FormField
                                control={form.control}
                                name="jobTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter job title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter company name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-4 w-full">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-4 w-full">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Country/Region</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className='border text-gray-500'>
                                                    <SelectValue placeholder="Country/Region" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State/Province</FormLabel>
                                        <Select
                                            onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className='border text-gray-500' >
                                                    <SelectValue placeholder="State/Province" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-4 w-full">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Industry of your company</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className='border text-gray-500'>
                                                    <SelectValue placeholder="Industry of your company" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department</FormLabel>
                                        <Select
                                            onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className='p-4 w-full'>
                                                <SelectTrigger className='border text-gray-500'>
                                                    <SelectValue placeholder="Department" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select your company size</FormLabel>
                                    <Select
                                        onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className='p-4 w-full'>
                                            <SelectTrigger className='border text-gray-500'>
                                                <SelectValue placeholder="Select your company size" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            style={{ backgroundColor: Colors.primary }}
                            type="submit"
                            className='w-full'>Submit</Button>
                    </form>
                </Form>
                <div className="mt-4 text-xs">
                    <p className="">Already have an account ? <span className="">
                        <Link href={'/login'} className='font-bold text-md'>{" "}Login</Link>
                    </span> </p>
                </div>
            </div>
        </div>
    )
}

export default Registry