'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { generateOtp, verifyOtpToken } from "@/lib/otp"

export async function sendOtp() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return { error: 'No user session found' }
  }

  // Generate and send OTP (implementation depends on your email/SMS service)
  const otp = generateOtp()
  // await sendOtpToEmail(session.user.email, otp)
  
  // In a real app, you would store the OTP hash in your database
  // associated with the user's email/phone
  
  return { success: true }
}

export async function verifyOtp(otp: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return { error: 'No user session found' }
  }

  // Verify the OTP (implementation depends on your storage)
  const isValid = await verifyOtpToken(session.user.email, otp)
  
  if (!isValid) {
    return { error: 'Invalid OTP code' }
  }
  
  // Update session to mark OTP as verified
  // This depends on your session management
  
  return { success: true }
}