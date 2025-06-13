// lib/otpStore.ts
const otpStore = new Map<string, string>(); // email -> otp

export const generateOtp = (email: string): string => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);
  // In production, store in DB and set expiration
  return otp;
};

export const verifyOtp = (email: string, code: string): boolean => {
  const storedOtp = otpStore.get(email);
  return storedOtp === code;
};