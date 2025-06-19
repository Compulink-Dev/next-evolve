// models/Attendee.ts
import mongoose, { Document } from "mongoose";

export interface IAttendeeCard extends Document {
  name: string;
  organization: string;
  imageUrl: string;
  createdAt: Date;
}

const AttendeeCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.AttendeeCard ||
  mongoose.model<IAttendeeCard>("AttendeeCard", AttendeeCardSchema);
