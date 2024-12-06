'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Button } from '../../../components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Colors } from '../../../constant/colors';
import { Textarea } from '../../../components/ui/textarea';

// Zod schema
const formSchema = z.object({
    title: z.string().min(2, { message: 'Enter a valid title' }).max(100),
    imageUrl: z.string().url({ message: 'Enter a valid image URL' }),
    description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
    date: z.string({ required_error: 'Date is required' }),
});

function BlogForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            imageUrl: '',
            description: '',
            date: '',
        },
    });

    // Submit handler
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { title, imageUrl, description, date } = values;

        try {
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, imageUrl, description, date }),
            });

            if (res.ok) {
                router.refresh(); // Refresh data after submission
                form.reset();
            } else {
                throw new Error('Failed to create the blog');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className=" p-6 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-4">Create Blog</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter blog title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image URL */}
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter image URL" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Date */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="Pick a date" type='date' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter blog description"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        style={{ backgroundColor: Colors.blue }}
                        type="submit"
                        className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default BlogForm;
