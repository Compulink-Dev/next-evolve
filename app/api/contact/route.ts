import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
    try {
        const { firstName, lastName, email, message } = await request.json()

        const transporter = nodemailer.createTransport({
            // host: "sandbox.smtp.mailtrap.io",
            // port: 2525,
            // secure: false,
            host: "smtp-mail.outlook.com",
            port: 587,
            service: 'outlook',
            secure: false,
            auth: {
                user: "info@evolveictsummit.com",
                pass: "@Evolve2024!"
            }
        });

        const mailOption = {
            from: `${email}`,
            to: 'info@evolveictsummit.com',
            subject: "Send Email Tutorial",
            html: `
        <h3>Hi Evolve ICT Summit</h3>
        <li> My name is: ${firstName}   ${lastName}</li>
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