import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

export default async function sendEmail({
  to,
  subject,
  text,
}: EmailOptions): Promise<boolean> {
  const {
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
  } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_FROM || !EMAIL_HOST || !EMAIL_PORT) {
    console.error("Missing email configuration.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: EMAIL_SECURE === "true", // false for port 587, true for 465
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    const res = await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      text,
    });

    return res.accepted.length > 0;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}
