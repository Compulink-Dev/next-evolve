import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json()

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false,
            auth: {
                user: "54bc0ade7d783c",
                pass: "b9531c2512272e"
            }
        });

        const mailOption = {
            from: `${email}`,
            to: 'info@evolveictsummit.com',
            subject: "Send Email Tutorial",
            html: `
        <h3>Hi Evolve ICT Summit</h3>
        <li> My name is: ${name}</li>
        <div/>
        <li> Message: ${message}</li> 
        `
        }

        await transporter.sendMail(mailOption)

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 })
    }
}