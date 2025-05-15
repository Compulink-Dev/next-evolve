import mongoose, { Document, Schema } from 'mongoose';

export interface ISponsorship extends Document {
  userId: mongoose.Types.ObjectId;
  tier: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  paymentProof?: string;
  additionalInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SponsorshipSchema = new Schema<ISponsorship>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tier: { type: String, required: true, enum: ['PLATINUM', 'GOLD', 'SILVER', 'BRONZE', 'CUSTOM'] },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    paymentProof: { type: String },
    additionalInfo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Sponsorship || mongoose.model<ISponsorship>('Sponsorship', SponsorshipSchema);