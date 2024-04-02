// pages/api/sendEmail.ts
import type { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export default async function handler(req: NextRequest, res: NextResponse) {
    try {
        //@ts-ignore
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false,
            auth: {
                user: "54bc0ade7d783c",
                pass: "b9531c2512272e"
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'recipient-email@example.com',
            subject: `Message from ${name} <${email}>`,
            text: message
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });

    }
    // else {
    //     res.setHeader('Allow', ['POST']);
    //     res.status(405).end(`Method ${req.method} Not Allowed`);
    // }
}


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { name, email, message } = await req.json()

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false,
            auth: {
                user: "54bc0ade7d783c",
                pass: "b9531c2512272e"
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'recipient-email@example.com',
            subject: `Message from ${name} <${email}>`,
            text: message
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }


    // await Speakers.create({ name, company, position, bio, imageUrl })
    // return NextResponse.json({ message: "Speakers Created" }, { status: 201 })
}
