// app/_components/BlogForm.tsx
'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

interface BlogFormProps {
  defaultValues?: {
    title?: string;
    imageUrl?: string;
    description?: string;
    date?: string;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
}

const formSchema = z.object({
  title: z.string().min(2, { message: 'Enter a valid title' }).max(100),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  date: z.string({ required_error: 'Date is required' }),
});

export default function BlogForm({ onSubmit, defaultValues, loading }: BlogFormProps) {
  const [imagePreview, setImagePreview] = useState(defaultValues?.imageUrl || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setImageError('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError('File size must be less than 5MB');
      return;
    }

    setImageError('');
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    if (!imageFile && !defaultValues?.imageUrl) {
      setImageError('Image is required');
      return;
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('date', values.date);
    
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (defaultValues?.imageUrl) {
      formData.append('imageUrl', defaultValues.imageUrl);
    }

    await onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
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

        {/* Image Upload Field */}
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2">
              <Input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
              />
              {imageError && (
                <p className="text-sm font-medium text-destructive">{imageError}</p>
              )}
              {(imagePreview || defaultValues?.imageUrl) && (
                <div className="mt-2">
                  <img
                    src={imagePreview || defaultValues?.imageUrl}
                    alt="Preview"
                    className="rounded border h-32 object-cover"
                  />
                </div>
              )}
            </div>
          </FormControl>
        </FormItem>

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter description" rows={5} />
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
        <Button type="submit" disabled={loading} className="w-full button">
          {loading ? 'Processing...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}