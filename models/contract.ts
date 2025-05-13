import mongoose, { Schema, Document } from 'mongoose';

export interface IContract extends Document {
  registrationId: mongoose.Types.ObjectId;
  filePath: string;
  originalName: string;
  mimeType: string;
  size: number;
  status: string;
  signedBy?: mongoose.Types.ObjectId;
  signedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContractSchema: Schema = new Schema(
  {
    registrationId: { type: Schema.Types.ObjectId, ref: 'Registration', required: true },
    filePath: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'signed', 'rejected', 'archived'], default: 'pending' },
    signedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    signedAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.models.Contract || 
       mongoose.model<IContract>('Contract', ContractSchema);