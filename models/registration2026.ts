import mongoose, { Schema, Document } from 'mongoose';

export type RegistrationType2026 = 'attendee' | 'exhibitor' | 'sponsor';

export interface IRegistration2026 extends Document {
  type: RegistrationType2026;
  year: number;
  registrationDate: Date;
  
  // Attendee fields
  name?: string;
  email: string;
  company?: string;
  jobTitle?: string;
  phone?: string;
  
  // Exhibitor fields
  companyName?: string;
  contactName?: string;
  boothSize?: string;
  products?: string;
  employeesAttending?: number;
  
  // Sponsor fields
  sponsorshipLevel?: string;
  marketingMaterials?: boolean;
}

const Registration2026Schema: Schema = new Schema({
  type: { type: String, required: true, enum: ['attendee', 'exhibitor', 'sponsor'] },
  year: { type: Number, required: true, default: 2026 },
  registrationDate: { type: Date, required: true, default: Date.now },
  
  // Common fields
  email: { type: String, required: true },
  phone: { type: String },
  
  // Attendee fields
  name: { type: String },
  company: { type: String },
  jobTitle: { type: String },
  
  // Exhibitor fields
  companyName: { type: String },
  contactName: { type: String },
  boothSize: { type: String },
  products: { type: String },
  employeesAttending: { type: Number },
  
  // Sponsor fields
  sponsorshipLevel: { type: String },
  marketingMaterials: { type: Boolean },
},
{timestamps: true}
);

// Index for faster lookups
Registration2026Schema.index({ email: 1, type: 1, year: 1 });

export default mongoose.models.Registration2026 || 
       mongoose.model<IRegistration2026>('Registration2026', Registration2026Schema);