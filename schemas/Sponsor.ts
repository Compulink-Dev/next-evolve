import { baseRegistrationSchema } from "@/lib/validators";
import { z } from "zod";

export const sponsorRegistrationSchema = baseRegistrationSchema.extend({
    type: z.literal('sponsor'),
    sponsorshipLevel: z.string().min(2, "Sponsorship level is required"),
    additionalInfo: z.record(z.any()).optional(),
  });