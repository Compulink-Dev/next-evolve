'use client';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Title from '@/components/NewTitle';
import Tile from '../../_components/title';
import { Label } from '@/components/ui/label';
import { Facebook, Instagram, Linkedin, LocateIcon, Mail, Phone, Twitter } from 'lucide-react';
import { FaThreads } from 'react-icons/fa6';

// Define the form schema with zod
const formSchema = z.object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters long.' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long.' }),
    email: z.string().email({ message: 'Enter a valid email address.' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
});

type FormSchemaType = z.infer<typeof formSchema>;

function ContactDetails() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // react-hook-form reset to clear the form
    } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false); // Add loading state

    const sendEmail = (data: FormSchemaType) => {
        setLoading(true); // Set loading to true when the email is being sent
        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                form.current!,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            )
            .then(
                () => {
                    toast.success('Email sent successfully!'); // Show success message
                    reset(); // Clear form
                    setLoading(false); // Set loading to false
                },
                (error) => {
                    toast.error('Failed to send email. Try again!'); // Show error message
                    setLoading(false); // Set loading to false
                }
            );
    };

    const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
        sendEmail(data); // Pass the validated data to sendEmail
    };

    return (
        <div className="bg-purple-950 p-8 text-slate-400">
            <ToastContainer /> {/* Add ToastContainer */}
            <Title title="Contact us" subtitle="for more information" />
            <div className="my-8 w-3/2 p-4 rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                    <div>
                        <Tile title="Please Send Us Your Enquiry" />
                        {/* Form submission using react-hook-form */}
                        <form ref={form} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label>First Name</Label>
                                <Input
                                    {...register('firstName')}
                                    className="bg-transparent"
                                    placeholder="Enter your first name"
                                />
                                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <Label>Last Name</Label>
                                <Input
                                    {...register('lastName')}
                                    className="bg-transparent"
                                    placeholder="Enter your last name"
                                />
                                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    {...register('email')}
                                    className="bg-transparent"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                            </div>
                            <div>
                                <Label>Message</Label>
                                <Textarea
                                    {...register('message')}
                                    rows={8}
                                    placeholder="Enter your message"
                                    className="p-4 resize-none bg-transparent"
                                />
                                {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                            </div>
                            <Button
                                type="submit"
                                disabled={loading} // Disable button when loading
                                className={`w-full rounded mt-4 ${loading ? 'bg-gray-600' : 'bg-purple-800'} hover:bg-purple-700 text-white px-4 py-2`}
                            >
                                {loading ? 'Sending...' : 'Send'} {/* Show 'Sending...' when loading */}
                            </Button>
                        </form>
                    </div>

                    <div>
                        <Tile title="Our Contact Details" />
                        <div className="space-y-4">
                            <Label className="text-lg font-bold">Emails</Label>
                            <div className="flex items-center gap-4">
                                <Mail />
                                <p>info@evolveictsummit.com</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail />
                                <p>www.evolveictsummit.com</p>
                            </div>
                        </div>

                        <div className="space-y-4 mt-8">
                            <Label className="text-lg font-bold">Office Address</Label>
                            <div className="flex items-center gap-4">
                                <LocateIcon />
                                <p>313 Samora Machel East, Eastlea, Harare Zimbabwe</p>
                            </div>
                        </div>

                        <div className="space-y-4 mt-8">
                            <Label className="text-lg font-bold">Phone Numbers</Label>
                            <div className="flex items-center gap-4">
                                <Phone />
                                <p>Tel: +263 242 494407, 08677 105 028</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Label className="text-lg font-bold">Social Media</Label>
                            <div className="flex items-center gap-6 mt-4">
                                <div className="h-8 w-8 flex items-center justify-center rounded-tl-2xl rounded-br-2xl bg-purple-800 hover:bg-purple-700 hover:animate-spin">
                                    <Facebook size={14} />
                                </div>
                                <div className="h-8 w-8 flex items-center justify-center rounded-tl-2xl rounded-br-2xl bg-purple-800 hover:bg-purple-700 hover:animate-spin">
                                    <Instagram size={14} />
                                </div>
                                <div className="h-8 w-8 flex items-center justify-center rounded-tl-2xl rounded-br-2xl bg-purple-800 hover:bg-purple-700 hover:animate-spin">
                                    <Twitter size={14} />
                                </div>
                                <div className="h-8 w-8 flex items-center justify-center rounded-tl-2xl rounded-br-2xl bg-purple-800 hover:bg-purple-700 hover:animate-spin">
                                    <Linkedin size={14} />
                                </div>
                                <div className="h-8 w-8 flex items-center justify-center rounded-tl-2xl rounded-br-2xl bg-purple-800 hover:bg-purple-700 hover:animate-spin">
                                    <FaThreads size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactDetails;
