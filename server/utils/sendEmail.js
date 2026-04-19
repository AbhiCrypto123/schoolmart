// sendEmail.js
// ─── Email Delivery Strategy ─────────────────────────────────────────────────
// 1. Brevo API   — if BREVO_API_KEY is set (recommended for Railway/production)
//                  Requires only sender email verification, no custom domain.
// 2. Resend API  — if RESEND_API_KEY is set (requires verified domain for non-owner recipients)
// 3. SMTP        — fallback for local development
// ─────────────────────────────────────────────────────────────────────────────

const sendEmail = async (options) => {
  const senderName = 'SchoolMart';

  // ── 1. BREVO (Sendinblue) — HTTPS API, no domain needed, just sender email ─
  if (process.env.BREVO_API_KEY) {
    const fromEmail = process.env.BREVO_FROM_EMAIL
      || process.env.SMTP_USER
      || 'raikantisathvik@gmail.com';

    console.log('[sendEmail] Using Brevo → to:', options.email, '| from:', fromEmail);

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY.replace(/^["']|["']$/g, ''),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: senderName, email: fromEmail },
        to: [{ email: options.email }],
        subject: options.subject,
        htmlContent: options.html,
        textContent: options.message,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Brevo API error ${response.status}`);
    }

    const data = await response.json();
    console.log('[sendEmail] Brevo delivered, messageId:', data.messageId);
    return data;
  }

  // ── 2. RESEND — HTTPS API, requires verified domain for arbitrary recipients ─
  if (process.env.RESEND_API_KEY) {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    console.log('[sendEmail] Using Resend → to:', options.email, '| from:', fromEmail);

    const { data, error } = await resend.emails.send({
      from: `${senderName} <${fromEmail}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
      text: options.message,
    });

    if (error) {
      console.error('[sendEmail] Resend error:', error);
      throw new Error(error.message || 'Resend failed to deliver email');
    }

    console.log('[sendEmail] Resend delivered, id:', data.id);
    return data;
  }

  // ── 3. SMTP / Nodemailer — local development only ─────────────────────────
  const { resolve4 } = require('dns').promises;
  const nodemailer = require('nodemailer');

  const user = (process.env.SMTP_USER || '').replace(/^["']|["']$/g, '');
  const pass = (process.env.SMTP_PASS || '').replace(/^["']|["']$/g, '');
  const hostname = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);

  let resolvedHost = hostname;
  try {
    const addresses = await resolve4(hostname);
    if (addresses?.length) {
      resolvedHost = addresses[0];
      console.log(`[sendEmail] DNS: ${hostname} → ${resolvedHost} (IPv4)`);
    }
  } catch (dnsErr) {
    console.warn('[sendEmail] IPv4 DNS fallback:', dnsErr.message);
  }

  console.log('[sendEmail] SMTP → host:', resolvedHost, '| port:', port, '| user:', user);

  const transporter = nodemailer.createTransport({
    host: resolvedHost,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    tls: { servername: hostname, rejectUnauthorized: false },
    connectionTimeout: 12000,
    greetingTimeout: 12000,
    socketTimeout: 20000,
  });

  const info = await transporter.sendMail({
    from: `"${senderName}" <${user}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  });

  console.log('[sendEmail] SMTP Sent:', info.messageId);
};

module.exports = sendEmail;
