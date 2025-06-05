import crypto from 'crypto'

// In a real app, you would store these in a database
const otpStorage = new Map<string, { otp: string; expiresAt: number }>()

export function generateOtp(length = 6): string {
  const digits = '0123456789'
  let otp = ''
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)]
  }
  
  return otp
}

export async function storeOtp(email: string, otp: string): Promise<void> {
  // Store OTP with expiration (5 minutes)
  const expiresAt = Date.now() + 5 * 60 * 1000
  otpStorage.set(email, { otp, expiresAt })
}

export async function verifyOtpToken(email: string, token: string): Promise<boolean> {
  const stored = otpStorage.get(email)
  
  if (!stored) return false
  if (Date.now() > stored.expiresAt) return false
  
  // Use timing-safe comparison
  return crypto.timingSafeEqual(
    //@ts-expect-error
    Buffer.from(stored.otp),
    Buffer.from(token)
  )
}