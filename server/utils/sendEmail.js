// sendEmail.js
// Uses Gmail OAuth2 (HTTPS port 443) — works from Railway, Vercel, or any cloud host.
// Falls back to SMTP for local development if OAuth2 env vars are not set.

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const gmailUser = (process.env.SMTP_USER || '').replace(/^["']|["']$/g, '');

  // ── Gmail OAuth2 (production) — uses HTTPS, never blocked by cloud hosts ──
  if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN) {
    console.log('[sendEmail] Using Gmail OAuth2 →', gmailUser);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: gmailUser,
        clientId: process.env.GMAIL_CLIENT_ID.replace(/^["']|["']$/g, ''),
        clientSecret: process.env.GMAIL_CLIENT_SECRET.replace(/^["']|["']$/g, ''),
        refreshToken: process.env.GMAIL_REFRESH_TOKEN.replace(/^["']|["']$/g, ''),
      },
    });

    const info = await transporter.sendMail({
      from: `"SchoolMart" <${gmailUser}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    });

    console.log('[sendEmail] OAuth2 sent:', info.messageId);
    return;
  }

  // ── Gmail SMTP (local dev fallback) ───────────────────────────────────────
  const { resolve4 } = require('dns').promises;
  const pass = (process.env.SMTP_PASS || '').replace(/^["']|["']$/g, '');
  const hostname = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);

  let resolvedHost = hostname;
  try {
    const [addr] = await resolve4(hostname);
    if (addr) resolvedHost = addr;
  } catch (_) {}

  console.log('[sendEmail] Using SMTP →', gmailUser, '| host:', resolvedHost);

  const transporter = nodemailer.createTransport({
    host: resolvedHost,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: gmailUser, pass },
    tls: { servername: hostname, rejectUnauthorized: false },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 25000,
  });

  const info = await transporter.sendMail({
    from: `"SchoolMart" <${gmailUser}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  });

  console.log('[sendEmail] SMTP sent:', info.messageId);
};

module.exports = sendEmail;
