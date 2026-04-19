// sendEmail.js — Gmail SMTP only
const { resolve4 } = require('dns').promises;
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const user = (process.env.SMTP_USER || '').replace(/^["']|["']$/g, '');
  const pass = (process.env.SMTP_PASS || '').replace(/^["']|["']$/g, '');
  const hostname = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);

  // Resolve smtp.gmail.com to IPv4 to prevent ENETUNREACH on IPv6-first hosts
  let resolvedHost = hostname;
  try {
    const addresses = await resolve4(hostname);
    if (addresses?.length) {
      resolvedHost = addresses[0];
    }
  } catch (_) {}

  console.log('[sendEmail] Connecting:', { host: resolvedHost, port, user });

  const transporter = nodemailer.createTransport({
    host: resolvedHost,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    tls: { servername: hostname, rejectUnauthorized: false },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 25000,
  });

  const info = await transporter.sendMail({
    from: `"SchoolMart" <${user}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  });

  console.log('[sendEmail] Sent:', info.messageId);
};

module.exports = sendEmail;
