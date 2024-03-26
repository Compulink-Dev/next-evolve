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
import { Colors } from '@/constant/colors'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'




const formSchema = z.object({
    name: z.string().min(2, {
        message: "Enter name"
    }).max(50),
    company: z.string().min(2, {
        message: "Enter company"
    }).max(50),
    position: z.string().min(2, {
        message: "Enter position"
    }).max(150),
    imageUrl: z.string().min(2, {
        message: "Enter image"
    }).max(50),
    bio: z
        .string()
        .min(10, {
            message: "Message must be at least 10 characters.",
        })
        .max(160, {
            message: "Message must not be longer than 30 characters.",
        }),
})


function HostForm() {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", company: "", position: "", bio: "", imageUrl: "" },

    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form data.
        // ✅ This will be type-safe and validated.
        const name = values.name
        const position = values.position
        const bio = values.bio
        const imageUrl = values.imageUrl
        const company = values.company


        try {
            const res = await fetch(`${process.env.API_ROUTE}/api/hosts`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ name, company, position, bio, imageUrl })
            })

            if (res.ok) {
                router.push('/dashboard/')
            } else {
                throw new Error("Failed to create a paragraph")
            }
        } catch (error) {
            console.log(error);

        }


        console.log(values)
    }

    return (
        <div className=''>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter name" {...field} />
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
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter company" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter position" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter image" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Paragraph</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter paragraph"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        style={{ backgroundColor: Colors.blue }}
                        type="submit"
                        className='w-auto'>Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default HostForm