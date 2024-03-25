import mongoose, { Schema } from "mongoose";

const testSchema = new Schema(
    {
        title: String,
        description: String,
        color: String,
        imageUrl: String
    },
    {
        timestamps: true
    }
)

const Test = mongoose.models.Test || mongoose.model("Test", testSchema)

export default Test