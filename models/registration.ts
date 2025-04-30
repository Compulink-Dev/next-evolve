// models/registration.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IRegistration extends Document {
  firstName: string
  lastName: string
  jobTitle: string
  company: string
  email: string
  password: string
  phoneNumber: string
  country: string
  state: string
  industry: string
  position: string
  companySize: string
  role?: string
  createdAt: Date
  updatedAt: Date
}

const RegistrationSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    industry: { type: String, required: true },
    position: { type: String },
    companySize: { type: String, required: true },
    role: { type: String, default: 'user' }
  },
  { timestamps: true }
)

export default mongoose.models.Registration || 
       mongoose.model<IRegistration>('Registration', RegistrationSchema)