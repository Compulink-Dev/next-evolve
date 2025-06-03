"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Colors } from "@/constant/colors";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Enter name",
    })
    .max(50),
  company: z
    .string()
    .min(2, {
      message: "Enter company",
    })
    .max(50),
  position: z
    .string()
    .min(2, {
      message: "Enter position",
    })
    .max(200),
  imageUrl: z
    .string()
    .min(2, {
      message: "Enter image URL",
    })
    .max(500),
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(2000, {
      message: "Bio must not be longer than 500 characters.",
    }),
  timeline: z
    .string()
    .min(2, {
      message: "Enter company",
    })
    .max(50),
});

interface SpeakersFormProps {
  initialData?: {
    name: string;
    company: string;
    position: string;
    bio: string;
    imageUrl: string;
    timeline: string;
  };
  isEdit?: boolean;
  id?: string;
  onSuccess?: () => void; // Add this prop
}

function SpeakersForm({
  initialData,
  isEdit = false,
  id,
  onSuccess,
}: SpeakersFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      company: "",
      position: "",
      bio: "",
      imageUrl: "",
      timeline: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

    try {
      if (isEdit && id) {
        const res = await fetch(`${baseUrl}/speakers/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          if (onSuccess) {
            onSuccess(); // Close the dialog
          } else {
            router.push("/speakers");
            router.refresh(); // Refresh the page to see changes
          }
        }
      } else {
        const res = await fetch(`${baseUrl}/speakers`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          if (onSuccess) {
            onSuccess(); // Close the dialog
          } else {
            router.push("/speakers");
            router.refresh(); // Refresh the page to see changes
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Enter company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timeline</FormLabel>
              <FormControl>
                <Input placeholder="Enter timeline" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Enter position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter bio"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          style={{ backgroundColor: Colors.blue }}
          type="submit"
          className="w-auto"
        >
          {isEdit ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default SpeakersForm;
