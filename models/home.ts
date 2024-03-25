import mongoose, { Schema } from "mongoose";

const homeSchema = new Schema(
    {
        title: String,
        description: String,
        imageUrl: String,
    },
    {
        timestamps: true
    }
)

const Home = mongoose.models.Home || mongoose.model("Home", homeSchema)

export default Home