// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { IncomingForm } from "formidable";
import fs from "fs";

function parseForm(req: any): Promise<{ fields: any; files: any }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: "./public/uploads",
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer: any = Buffer.from(bytes);

  const uploadPath = path.join(process.cwd(), "public/uploads", file.name);
  await writeFile(uploadPath, buffer);

  return NextResponse.json({ url: `/uploads/${file.name}` });
}
