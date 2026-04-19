// sendEmail.js
// ─── Strategy ────────────────────────────────────────────────────────────────
// Railway blocks outbound SMTP (ports 25, 465, 587) at the network level.
// When RESEND_API_KEY is set (production/Railway), we use Resend's HTTPS API.
// When it's not set, we fall back to SMTP/Nodemailer (local development).
// ─────────────────────────────────────────────────────────────────────────────

const sendEmail = async (options) => {
  // ── PRODUCTION: Resend API (works over HTTPS port 443 — never blocked) ────
  if (process.env.RESEND_API_KEY) {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromEmail = process.env.RESEND_FROM_EMAIL || `SchoolMart <onboarding@resend.dev>`;
    console.log('[sendEmail] Using Resend API → to:', options.email);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
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

  // ── LOCAL DEV: Nodemailer / Gmail SMTP ────────────────────────────────────
  const { resolve4 } = require('dns').promises;
  const nodemailer = require('nodemailer');

  const user = (process.env.SMTP_USER || '').replace(/^["']|["']$/g, '');
  const pass = (process.env.SMTP_PASS || '').replace(/^["']|["']$/g, '');
  const hostname = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);

  // Resolve to IPv4 to avoid ENETUNREACH with IPv6
  let resolvedHost = hostname;
  try {
    const addresses = await resolve4(hostname);
    if (addresses?.length) {
      resolvedHost = addresses[0];
      console.log(`[sendEmail] DNS: ${hostname} → ${resolvedHost} (IPv4)`);
    }
  } catch (dnsErr) {
    console.warn('[sendEmail] IPv4 DNS fallback to hostname:', dnsErr.message);
  }

  console.log('[sendEmail] SMTP Connecting:', { host: resolvedHost, port, user });

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
    from: `"SchoolMart" <${user}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  });

  console.log('[sendEmail] SMTP Sent:', info.messageId);
};

module.exports = sendEmail;
