import { NextApiRequest, NextApiResponse } from "next";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, phone, subject, message } = req.body as ContactFormData;

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  // In production, you would integrate an email service (Resend, SendGrid, etc.)
  // For now, we log the submission and return success.
  // Example with Resend (if RESEND_API_KEY is in .env.local):
  //
  // const { Resend } = await import('resend');
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'noreply@comfortsplus.com',
  //   to: 'info@comfortsplus.com',
  //   subject: subject || `New Inquiry from ${name}`,
  //   html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`,
  // });

  console.log("[Contact Form Submission]", {
    name,
    email,
    phone: phone || "N/A",
    subject: subject || "General Inquiry",
    message,
    timestamp: new Date().toISOString(),
  });

  return res.status(200).json({ message: "Your message has been received. We will get back to you shortly." });
}
