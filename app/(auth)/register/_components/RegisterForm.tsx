'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { countries } from '@/constant/data';
import { useRouter } from 'next/navigation';
import Title from '@/app/(main)/_components/title';
import { X } from 'lucide-react';

// Define form validation schema using Zod
const formSchema = z.object({
    firstName: z.string().min(2, 'First name is required').max(50),
    lastName: z.string().min(2, 'Last name is required').max(50),
    jobTitle: z.string().min(2, 'Job title is required').max(100),
    company: z.string().min(2, 'Company name is required').max(100),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(10, 'Invalid phone number').max(15),
    country: z.string().min(2, 'Country is required'),
    state: z.string().min(2, 'State is required').max(50),
    industry: z.string().min(2, 'Industry is required').max(100),
    companySize: z.string().min(2, 'Company size is required'),
});

// Define form data types
type FormData = z.infer<typeof formSchema>;

function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Initialize loading state

    // Use React Hook Form with Zod validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    // Handle form submission
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        try {
            const res = await fetch(`/api/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                toast.success('Registration Successful');
                router.push('/');
            } else {
                toast.error('Registration failed');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 text-slate-400">
            <div className="flex items-center justify-between">
                <Title title="Register your account" />
                <Button
                    onClick={() => router.back()}
                    variant={'ghost'}
                >
                    <X />
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label>First Name</Label>
                        <Input {...register('firstName')} placeholder="Enter your first name" className="bg-transparent placeholder:text-slate-400" />
                        {errors.firstName && <span className="text-red-600 text-xs">{errors.firstName.message}</span>}
                    </div>

                    <div>
                        <Label>Last Name</Label>
                        <Input {...register('lastName')} placeholder="Enter your last name" className="bg-transparent placeholder:text-slate-400" />
                        {errors.lastName && <span className="text-red-600 text-xs">{errors.lastName.message}</span>}
                    </div>

                    <div>
                        <Label>Job Title</Label>
                        <Input {...register('jobTitle')} placeholder="Enter your job title" className="bg-transparent placeholder:text-slate-400" />
                        {errors.jobTitle && <span className="text-red-600 text-xs">{errors.jobTitle.message}</span>}
                    </div>

                    <div>
                        <Label>Company</Label>
                        <Input {...register('company')} placeholder="Enter your company name" className="bg-transparent placeholder:text-slate-400" />
                        {errors.company && <span className="text-red-600 text-xs">{errors.company.message}</span>}
                    </div>

                    <div>
                        <Label>Email</Label>
                        <Input {...register('email')} placeholder="Enter your email address" className="bg-transparent placeholder:text-slate-400" />
                        {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                    </div>

                    <div>
                        <Label>Phone Number</Label>
                        <Input {...register('phoneNumber')} placeholder="Enter your phone number" className="bg-transparent placeholder:text-slate-400" />
                        {errors.phoneNumber && <span className="text-red-600">{errors.phoneNumber.message}</span>}
                    </div>

                    <div>
                        <Label>Country/Region</Label>
                        <select {...register('country')} className="w-full bg-transparent border p-2 rounded-lg">
                            {countries.map((country) => (
                                <option key={country.name} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        {errors.country && <span className="text-red-600 text-xs">{errors.country.message}</span>}
                    </div>

                    <div>
                        <Label>State/Province</Label>
                        <Input {...register('state')} placeholder="Enter your state or province" className="bg-transparent placeholder:text-slate-400" />
                        {errors.state && <span className="text-red-600 text-xs">{errors.state.message}</span>}
                    </div>

                    <div>
                        <Label>Industry</Label>
                        <Input {...register('industry')} placeholder="Enter your industry" className="bg-transparent placeholder:text-slate-400" />
                        {errors.industry && <span className="text-red-600 text-xs">{errors.industry.message}</span>}
                    </div>

                    <div>
                        <Label>Company Size</Label>
                        <select {...register('companySize')} className="w-full bg-transparent border p-2 rounded-lg">
                            <option value=""></option>
                            <option value="Micro Enterprise: 1-9 employees">Micro Enterprise: 1-9 employees</option>
                            <option value="Small Enterprise: 10-49 employees">Small Enterprise: 10-49 employees</option>
                            <option value="Medium Enterprise: 50-249 employees">Medium Enterprise: 50-249 employees</option>
                            <option value="Large Enterprise: 250-999 employees">Large Enterprise: 250-999 employees</option>
                            <option value="Enterprise: 1000+ employees">Enterprise: 1000+ employees</option>
                        </select>
                        {errors.companySize && <span className="text-red-600 text-xs">{errors.companySize.message}</span>}
                    </div>
                </div>

                <Button type="submit" className="w-full mt-4 bg-purple-950 hover:bg-purple-700" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'} {/* Change button text based on loading state */}
                </Button>
                <ToastContainer />
            </form>
        </div>
    );
}

export default RegisterForm;
