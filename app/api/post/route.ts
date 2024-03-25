import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/database";
import Post from "@/schemas/Post";

export const GET = async (request: NextRequest) => {
    try {
        await connect()
        await Post.create({ title: "", description: "" })
        return new NextResponse("Connection in progress", { status: 200 })
    } catch (error) {
        console.log(error);
        return new NextResponse("Error in fetching posts" + error, { status: 500 })
    }
}