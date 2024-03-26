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
    title: z.string().min(2, {
        message: "Enter title"
    }).max(50),
    imageUrl: z.string().min(2, {
        message: "Enter image"
    }).max(50),
    color: z.string().min(2, {
        message: "Enter color"
    }).max(50),
    description: z
        .string()
        .min(10, {
            message: "Message must be at least 10 characters.",
        })
})


function AboutForm() {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            imageUrl: "",
            color: ""
        },

    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form data.
        // ✅ This will be type-safe and validated.
        const title = values.title
        const description = values.description
        const color = values.color
        const imageUrl = values.imageUrl

        try {
            const res = await fetch(`${process.env.API_ROUTE}/api/about`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ title, description, imageUrl, color })
            })

            if (res.ok) {
                router.push('/dashboard/about')
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
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter title" {...field} />
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
                        name="color"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter color" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
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

export default AboutForm