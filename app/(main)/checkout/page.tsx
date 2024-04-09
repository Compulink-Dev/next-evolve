'use client'
import { Button } from '@/components/ui/button';
import { Colors } from '@/constant/colors';
import { countries } from '@/constant/data';
import React, { useState } from 'react';

const MyForm: React.FC = () => {
    // State variables for form fields and errors
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        password: '',
        company: '',
        email: '',
        phoneNumber: '',
        position: '',
        country: '',
        state: '',
        industry: '',
        department: '',
        size: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Update form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Form validation logic
    const validateForm = () => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};


        // Email validation
        if (!formData.firstName) {
            newErrors.firstName = 'First Name is required';
            valid = false;
        } else {
            newErrors.firstName = 'First Name is invalid';
            valid = false;
        }

        // // Password validation
        // if (!formData.password) {
        //     newErrors.password = 'Password is required';
        //     valid = false;
        // } else if (formData.password.length < 6) {
        //     newErrors.password = 'Password must be at least 6 characters';
        //     valid = false;
        // }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Form submission logic
            console.log('Form is valid, submit data:', formData);
        } else {
            console.error('Form submission failed due to validation errors');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='bg-blue-600 text-white flex flex-col items-center gap-2 justify-start pb-12'>
            <div className="flex gap-6 items-center justify-center w-full placeholder:text-white">
                <div className='grid gap-2'>
                    <label className='text-sm font-bold'>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        placeholder='Enter name'
                        onChange={handleChange}
                        className="text-black p-2 text-sm rounded-lg w-full"
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <div className='grid gap-2'>
                    <label className='text-sm font-bold'>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="text-black p-2 text-sm rounded-lg w-full"
                    />
                    {errors.email && <span className='text-xs' style={{ color: 'red' }}>{errors.email}</span>}
                </div>
            </div>
            <div className="flex items-center justify-center gap-6 w-full placeholder:text-white">
                <div className='grid gap-2'>
                    <label className='text-sm font-bold'>Job Title</label>
                    <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        placeholder='Enter job title'
                        onChange={handleChange}
                        className="text-black p-2 text-sm rounded-lg w-full"
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <div className='grid gap-2'>
                    <label className='text-sm font-bold'>Company name</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder='Enter company name'
                        className="text-black p-2 text-sm rounded-lg w-full"
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
            </div>
            <div className="flex items-center justify-center gap-6 w-full">
                <div className='grid gap-2'>
                    <label className='text-sm font-bold'>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder='Enter email'
                        onChange={handleChange}
                        className="text-black p-2 text-sm rounded-lg w-full"
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <div className='grid gap-2'>
                    <label className='text-sm font-bold'>Phone number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder='Enter phone number'
                        className="text-black p-2 text-sm rounded-lg w-full"
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
            </div>
            <div className="flex gap-10 mt-2 placeholder:text-white">
                <div className='grid gap-2'>
                    <label className='text-sm font-bold'>Country/Region</label>
                    <select
                        value={formData.country}
                        //@ts-ignore
                        onChange={handleChange}
                        className="text-black p-2 text-sm rounded-lg w-full">

                        {
                            countries.map((country) => (

                                <option key={country.name} value={country.name}>{country.name}</option>

                            ))
                        }
                    </select>
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <div className='grid gap-2'>
                    <label className='text-sm font-bold'>State/Province</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder='Enter your state'
                        className="text-black p-2 text-sm rounded-lg w-full"
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
            </div>


            <div className="grid gap-2 w-auto">
                <label className="text-sm font-bold">
                    Industry of your company
                </label>
                <input
                    value={formData.industry}
                    name="company"
                    onChange={handleChange}
                    placeholder="Industry of your company"
                    className="text-black p-2 text-sm rounded-lg w-full"
                />
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            </div>


            <div className="grid gap-2">
                <label className="text-sm font-bold">Company Size</label>
                {/* <input
              value={companySize}
              name="size"
              onChange={(e) => setCompanySize(e.target.value)}
              placeholder="Company Size"
              className="text-black p-2 text-sm rounded-lg w-full"
            /> */}
                <select
                    value={formData.size}
                    //@ts-ignore
                    onChange={handleChange}
                    className="text-black p-2 text-sm rounded-lg w-full">
                    <option></option>
                    <option value={'Micro Enterprise: 1-9 employees'}>Micro Enterprise: 1-9 employees</option>
                    <option value={'Small Enterprise: 10-49 employees'}>Small Enterprise: 10-49 employees</option>
                    <option value={'Medium Enterprise: 50-249 employees'}>Medium Enterprise: 50-249 employees</option>
                    <option value={'Large Enterprise: 250-999 employees'}>Large Enterprise: 250-999 employees</option>
                    <option value={'Enterprise: 1000+ employees'}>Enterprise: 1000+ employees</option>
                </select>
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            </div>
            <Button
                style={{ backgroundColor: Colors.primary }}
                type="submit"
                className="w-auto"
            >
                Submit
            </Button>
        </form>
    );
};

export default MyForm;
