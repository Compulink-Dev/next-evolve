import mongoose, { Schema, model, models } from 'mongoose';

const SponsorSchema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, enum: ['sponsor', 'endorsement', 'media'], required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

const Sponsor = models.Sponsor || model('Sponsor', SponsorSchema);
export default Sponsor;
