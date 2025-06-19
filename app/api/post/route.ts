import { NextRequest, NextResponse } from "next/server";
import Post from "@/schemas/Post";
import { connectDB } from "@/lib/connectToDB";

export const GET = async (request: NextRequest) => {
    try {
        await connectDB()
        await Post.create({ title: "", description: "" })
        return new NextResponse("Connection in progress", { status: 200 })
    } catch (error) {
        console.log(error);
        return new NextResponse("Error in fetching posts" + error, { status: 500 })
    }
}