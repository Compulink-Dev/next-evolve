import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendee extends Document {
  userId: mongoose.Types.ObjectId;
  seatNumber: string;
  status: 'pending' | 'approved' | 'rejected' | 'pending_payment';
  paymentProof?: string;
  additionalInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendeeSchema = new Schema<IAttendee>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seatNumber: { 
      type: String, 
      unique: true,
      required: true 
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'pending_payment'],
      default: 'pending',
    },
    paymentProof: { type: String },
    additionalInfo: { type: String },
  },
  { timestamps: true }
);

// Add error handling for duplicate seat numbers
AttendeeSchema.post('save', function(error: any, doc: any, next: any) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Seat number already taken'));
  } else {
    next(error);
  }
});

export default mongoose.models.Attendee ||
  mongoose.model<IAttendee>('Attendee', AttendeeSchema);