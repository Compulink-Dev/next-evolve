'use client'
// components/ContactForm.tsx
import { useState } from 'react';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea, VStack } from '@chakra-ui/react';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters long')
});

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            schema.parse(formData);
            // Validation successful, proceed to send email
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Email sent successfully');
                // Optionally, reset form fields
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                console.error('Failed to send email');
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Validation failed, set form errors
                const fieldErrors = error.errors.reduce((acc, err) => {
                    const path = err.path[0];
                    return { ...acc, [path]: err.message };
                }, {});
                //@ts-ignore
                setFormErrors(fieldErrors);
            } else {
                console.error('Error sending email:', error);
            }
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className='border p-8 rounded'>
                <VStack spacing={4} align="stretch">
                    <FormControl isInvalid={!!formErrors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" name="name" value={formData.name} onChange={handleChange} required className='p-2 border rounded mb-4' />
                        <FormErrorMessage>{formErrors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formErrors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} required className='p-2 border rounded mb-4' />
                        <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formErrors.message}>
                        <FormLabel>Message</FormLabel>
                        <Textarea name="message" value={formData.message} onChange={handleChange} required className='p-2 border rounded' />
                        <FormErrorMessage>{formErrors.message}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" className='p-2 bg-blue-500 text-white mt-4 rounded' >Send Message</Button>
                </VStack>
            </form>
        </div>
    );
};

export default ContactForm;
