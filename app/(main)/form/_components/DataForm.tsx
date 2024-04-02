'use client'

// components/ContactForm.tsx
import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Textarea, VStack } from '@chakra-ui/react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
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
        // Use Nodemailer to send email
        try {
            const response = await fetch('/api/sendEmail', {
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
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="border p-8 rounded">
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch">
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} required className='border rounded p-2 mt-4' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} required className='border rounded p-2 mt-4' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Message</FormLabel>
                            <Textarea name="message" value={formData.message} onChange={handleChange} required className='border rounded p-2 mt-4' />
                        </FormControl>
                        <Button type="submit" className='bg-blue-400 text-white rounded p-2 mt-4'>Send</Button>
                    </VStack>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
