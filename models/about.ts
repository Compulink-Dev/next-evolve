import mongoose, { Schema } from "mongoose";

const aboutScheme = new Schema(
    {
        title: String,
        description: String,
        imageUrl: String,
        color: String
    },
    {
        timestamps: true
    }
)

const About = mongoose.models.About || mongoose.model("About", aboutScheme)

export default About