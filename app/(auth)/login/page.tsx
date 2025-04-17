'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { Colors } from '@/constant/colors'
import Link from 'next/link'

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  })
})

export default function Login() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push('/dashboard') // Redirect on success
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="border rounded-lg shadow-lg bg-white flex flex-col md:flex-row gap-0 md:gap-4 w-full max-w-4xl overflow-hidden">
        <div className="flex items-center justify-center bg-blue-50 p-8 w-full md:w-1/2">
          <Image 
            src={'/home/logo.png'} 
            width={200} 
            height={200} 
            alt='Company Logo'
            className="w-auto h-auto"
            priority
          />
        </div>
        <div className="p-8 w-full md:w-1/2">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Login</h1>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your@email.com" 
                        {...field} 
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        {...field} 
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                style={{ backgroundColor: Colors.blue }}
                type="submit"
                className='w-full mt-6'
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <Link 
              href={'/forgot-password'} 
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              {"Don't have an account?"}{' '}
              <Link 
                href={'/register'} 
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}