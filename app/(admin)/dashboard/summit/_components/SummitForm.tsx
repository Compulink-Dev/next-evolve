'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function SummitForm({ 
  event, 
  onSubmit,
  isLoading
}: {
  event?: any;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}) {
  const [formData, setFormData] = useState(event || {
    year: '',
    title: '',
    description: '',
    date: '',
    imageUrl: '',
    location: '',
    highlights: [''],
    gallery: [],
    videos: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const addHighlight = () => {
    setFormData({ 
      ...formData, 
      highlights: [...formData.highlights, ''] 
    });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = formData.highlights.filter((_: any, i: any) => i !== index);
    setFormData({ ...formData, highlights: newHighlights });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Year</Label>
          <Input
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Main Image URL</Label>
        <Input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Highlights</Label>
        <div className="space-y-2">
          {formData.highlights.map((highlight: any, index: any) => (
            <div key={index} className="flex gap-2">
              <Input
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                required
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeHighlight(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addHighlight}
          >
            Add Highlight
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {event ? 'Updating...' : 'Creating...'}
          </span>
        ) : (
          event ? 'Update' : 'Create'
        )}
      </Button>
    </form>
  );
}