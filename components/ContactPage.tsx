'use client'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { Colors } from "@/constant/colors";
import { Textarea } from './ui/textarea'


type LoginProps = {
  firstName: string,
  lastName: string
  email: string,
  message: string
}

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Enter valid username"
  }).max(50),
  lastName: z.string().min(2, {
    message: 'Password must contain 8 characters'
  }),
  email: z.string().min(2, {
    message: "Enter valid username"
  }).max(50),
  textarea: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(160, {
      message: "Message must not be longer than 30 characters.",
    }),
})



function ContactPage() {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      textarea: ""
    },

  })

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form data.
    // ✅ This will be type-safe and validated.
    console.log(data)
  }



  return (
    <div className="">
      <div className="container mx-auto max-w-7xl my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center items-center">
          <h1
            style={{ color: Colors.blue }}
            className="font-bold text-2xl md:text-4xl text-purple-400">
            Please Send Us Your Enquiry
          </h1>

          <div className="border border-blue-500 p-4 mt-8 rounded">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="textarea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Let us help you here"
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
                  className='w-full'>Login</Button>
              </form>
            </Form>
          </div>
        </div>


        <div className="container w-full px-4 md:px-0 mx-auto max-w-7xl flex flex-col justify-center items-center">
          <div className="border border-blue-600 rounded-lg w-full">
            <div className="border-b border-blue-300  max-w-7xl container mx-auto text-center p-4">
              <h1 className="font-bold text-lg text-blue-500 ">
                Our Contact Details
              </h1>
            </div>

            <div className="w-full max-w-7xl container mx-auto py-4 px-12 border-b-2 border-blue-200">
              <h1 className="text-sm" style={{ color: Colors.text }}>info@compulink.co.zw</h1>
            </div>
            <div className="max-w-7xl container mx-auto py-4 px-12 border-b-2 border-blue-200">
              <h1 className="text-sm" style={{ color: Colors.text }}>www.compulink.co.zw</h1>
            </div>
            <div className=" max-w-7xl container mx-auto py-4 px-12">
              <h1 className="text-sm font-bold text-blue-500">Office Address</h1>
            </div>
            <div className=" max-w-7xl container mx-auto py-4 px-12 border-b-2 border-blue-200">
              <h1 className="text-sm" style={{ color: Colors.text }}>
                313 Samora Machel East, Eastlea, Harare Zimbabwe
              </h1>
            </div>
            <div className=" max-w-7xl container mx-auto py-4 px-12">
              <h1 className="text-sm font-bold text-blue-500">Our Contact Details</h1>
            </div>
            <div className=" max-w-7xl container mx-auto py-4 px-12 border-b-2 border-blue-200">
              <h1 className="text-sm" style={{ color: Colors.text }}>Tel: +263 242 494407, 08677 105 028</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
