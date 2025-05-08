import mongoose, { Schema, model, models } from 'mongoose';

const GallerySchema = new Schema(
    {
      title: {
        type: String,
        required: true,
        maxlength: 100,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      gallery: {
        type: [String], // Array of image URLs
        default: [],
      },
      videos: [{
        title: String,
        url: String
      }]
    },
    {
      timestamps: true,
    }
  );

// Check if model already exists to avoid overwriting
const Gallery = models.Gallery || model('Gallery', GallerySchema);

export default Gallery;
