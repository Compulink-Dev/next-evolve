'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../../components/ui/input';
import { Textarea } from '../../../../../components/ui/textarea';
import { Button } from '../../../../../components/ui/button';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '../../../../../components/ui/form';
import { useState } from 'react';
import { UploadButton } from '@/lib/uploadthing';


// Zod schema
const formSchema = z.object({
    title: z.string().min(2, { message: 'Enter a valid title' }).max(100),
    imageUrl: z.string().url({ message: 'Image is required' }),
    description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
    date: z.string({ required_error: 'Date is required' }),
});

export default function BlogForm({ onSubmit, defaultValues, loading }: any) {
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(defaultValues?.imageUrl || '');

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            title: '',
            imageUrl: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
        },
    });

    // Update form field when image is uploaded
    const handleImageUpload = (url: string) => {
        setUploadedImageUrl(url);
        form.setValue('imageUrl', url);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => onSubmit(data))}
                className="space-y-4"
            >
                {/* Title Field */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter title" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Image Upload using UploadThing */}
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={() => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <>
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            if (res && res[0]?.url) {
                                                handleImageUpload(res[0].url);
                                            }
                                        }}
                                        onUploadError={(error: Error) => {
                                            console.error('Upload failed', error);
                                        }}
                                    />
                                    {uploadedImageUrl && (
                                        <img
                                            src={uploadedImageUrl}
                                            alt="Uploaded"
                                            className="mt-2 rounded border h-32 object-cover"
                                        />
                                    )}
                                </>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description Field */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="Enter description" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Date Field */}
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </form>
        </Form>
    );
}
