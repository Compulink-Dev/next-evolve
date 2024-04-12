import mongoose, { Schema } from "mongoose";

const verifySchema = new Schema({
    name: String,
    email: String,
    password: String,
},


    {
        timestamps: true
    }
)

const Verify = mongoose.models.Verify || mongoose.model("Verify", verifySchema)

export default Verify