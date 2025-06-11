// models/Exhibitor.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IExhibitor extends Document {
  userId: mongoose.Types.ObjectId;
  boothNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentProof?: string;
  additionalInfo?: string;
  logoUrl?:string;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExhibitorSchema = new Schema<IExhibitor>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'Registration', required: true },
    boothNumber: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    paymentProof: { type: String },
    logoUrl: {type: String},
    link: {type: String},
    additionalInfo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Exhibitor ||
  mongoose.model<IExhibitor>('Exhibitor', ExhibitorSchema);
