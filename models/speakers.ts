import mongoose, { Schema } from "mongoose";

const speakersSchema = new Schema(
    {
        name: String,
        company: String,
        position: String,
        bio: String,
        imageUrl: String,
    },
    {
        timestamps: true
    }
)

const Speakers = mongoose.models.Speakers || mongoose.model("Speakers", speakersSchema)

export default Speakers