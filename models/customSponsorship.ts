import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomSponsorship extends Document {
  name: string;
  budget: number;
  objectives: string;
  benefits: string;
  contactName: string;
  contactEmail: string;
  status: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomSponsorshipSchema = new Schema<ICustomSponsorship>(
  {
    name: { type: String, default: 'Custom Package' },
    budget: { type: Number, required: true },
    objectives: { type: String, required: true },
    benefits: { type: String, required: true },
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    status: { type: String, default: 'PENDING_REVIEW' },
    userId: { type: String },
  },
  { timestamps: true }
);

// Check if model already exists to prevent OverwriteModelError
const CustomSponsorship = mongoose.models.CustomSponsorship || 
  mongoose.model<ICustomSponsorship>('CustomSponsorship', CustomSponsorshipSchema);

export default CustomSponsorship;