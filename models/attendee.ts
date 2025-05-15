import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendee extends Document {
  userId: mongoose.Types.ObjectId;
  seatNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentProof?: string;
  additionalInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendeeSchema = new Schema<IAttendee>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seatNumber: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    paymentProof: { type: String },
    additionalInfo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Attendee ||
  mongoose.model<IAttendee>('Attendee', AttendeeSchema);