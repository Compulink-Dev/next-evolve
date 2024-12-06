import mongoose from "mongoose";


async function connect() {
    try {
        //@ts-ignore
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Mongo connection successful');

    } catch (error) {
        console.log(error);
        throw new Error("Error in connecting to mongodb")
    }
}


export default connect