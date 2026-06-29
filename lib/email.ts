import nodemailer from "nodemailer";

interface Attachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: Attachment[];
}

export default async function sendEmail({
  to,
  subject,
  text,
  html,
  attachments,
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
    secure: EMAIL_SECURE === "true",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    const res = await transporter.sendMail({
      from: `GeoMundus 2026 Conference <${EMAIL_FROM}>`,
      to,
      subject,
      text,
      html,
      attachments: attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
        contentType: a.contentType,
      })),
    });

    return res.accepted.length > 0;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}
