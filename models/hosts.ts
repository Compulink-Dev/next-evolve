import mongoose, { Schema } from "mongoose";

const hostSchema = new Schema(
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

const Hosts = mongoose.models.Hosts || mongoose.model("Hosts", hostSchema)

export default Hosts