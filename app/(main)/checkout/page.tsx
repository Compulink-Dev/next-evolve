'use client'
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
        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

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
        <form onSubmit={handleSubmit} className='bg-blue-600'>
            <div className="flex gap-6 w-full placeholder:text-white">
                <div className=''>
                    <label>First Name</label>
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
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="text-black p-2 text-sm rounded-lg w-full"
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
            </div>
            <div className="flex gap-6 w-full placeholder:text-white">
                <div className=''>
                    <label>Job Title</label>
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
                <div>
                    <label>Company name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="text-black p-2 text-sm rounded-lg w-full"
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
            </div>
            <div className="flex gap-6 w-full placeholder:text-white">
                <div className=''>
                    <label>Email</label>
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
                <div>
                    <label>Company name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="text-black p-2 text-sm rounded-lg w-full"
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;
