import mongoose, { Schema, Document } from 'mongoose';

interface IVideo {
  title: string;
  url: string;
}

interface IEvent extends Document {
  year: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  location: string;
  highlights: string[];
  gallery: string[];
  videos: IVideo[];
}

const SummitSchema: Schema = new Schema({
  year: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
  highlights: { type: [String], required: true },
  gallery: { type: [String], default: [] },
  videos: { 
    type: [{
      title: { type: String, required: true },
      url: { type: String, required: true }
    }], 
    default: [] 
  }
}, { timestamps: true });

export default mongoose.models.Summit || mongoose.model<IEvent>('Summit', SummitSchema);