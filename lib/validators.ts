import { z } from 'zod';



export const UserRole = z.enum(["sponsor", "attendee", "exhibitor", "attachee"]);
export type UserRole = z.infer<typeof UserRole>;

export const baseRegistrationSchema = z.object({
  firstName: z.string().min(2, "First name is required").max(50),
  lastName: z.string().min(2, "Last name is required").max(50),
  jobTitle: z.string().min(2, "Job title is required").max(100),
  company: z.string().min(2, "Company name is required").max(100),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Invalid phone number").max(15),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required").max(50),
  industry: z.string().min(2, "Industry is required").max(100),
  companySize: z.string().min(2, "Company size is required"),
  position: z.string().optional(),
  type: UserRole,
  mode: z.enum(["online", "offline"]),
});

export const sponsorRegistrationSchema = baseRegistrationSchema.extend({
  type: z.enum(["sponsor", "attendee", "exhibitor", "attachee"]),
  sponsorshipLevel: z.string().min(2, "Sponsorship level is required"),
  additionalInfo: z.record(z.any()).optional(),
});

export const exhibitorRegistrationSchema = baseRegistrationSchema.extend({
  type: z.literal('exhibitor'),
  boothNumber: z.string().optional(),
  additionalInfo: z.record(z.any()).optional(),
});

export const onlineRegistrationSchema = baseRegistrationSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


export const offlineRegistrationSchema = z.union([
  sponsorRegistrationSchema.extend({
    mode: z.literal('offline'),
  }),
  exhibitorRegistrationSchema.extend({
    mode: z.literal('offline'),
  })
]);

export type OnlineRegistrationFormData = z.infer<typeof onlineRegistrationSchema>;
export type OfflineRegistrationFormData = z.infer<typeof offlineRegistrationSchema>;