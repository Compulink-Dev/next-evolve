import mongoose, { Schema } from "mongoose";

const sponsorsScheme = new Schema(
    {
        title: String,
        description: String,
        imageUrl: String,
    },
    {
        timestamps: true
    }
)

const Sponsors = mongoose.models.Sponsors || mongoose.model("Sponsors", sponsorsScheme)

export default Sponsors