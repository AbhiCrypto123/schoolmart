// Explicitly resolve SMTP hostname to IPv4 before connecting.
// Railway (and some PaaS platforms) return IPv6 via DNS which is unreachable
// for outbound SMTP. We bypass OS DNS preference by calling dns.resolve4()
// directly and using the raw IPv4 address as the transport host.
const { resolve4 } = require('dns').promises;
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const user = (process.env.SMTP_USER || '').replace(/^["']|["']$/g, '');
  const pass = (process.env.SMTP_PASS || '').replace(/^["']|["']$/g, '');
  const hostname = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);

  // ─── Force IPv4 by resolving hostname manually ────────────────────────────
  let resolvedHost = hostname;
  try {
    const addresses = await resolve4(hostname);
    if (addresses && addresses.length > 0) {
      resolvedHost = addresses[0]; // Use first IPv4 address directly
      console.log(`[sendEmail] DNS: ${hostname} → ${resolvedHost} (IPv4)`);
    }
  } catch (dnsErr) {
    console.warn('[sendEmail] IPv4 DNS resolution failed, falling back to hostname:', dnsErr.message);
  }

  console.log('[sendEmail] Connecting:', { host: resolvedHost, port, user });

  const transporter = nodemailer.createTransport({
    host: resolvedHost,          // Raw IPv4 address — no DNS lookup needed
    port,
    secure: port === 465,        // SSL only for port 465 — otherwise STARTTLS
    requireTLS: port !== 465,    // Enforce STARTTLS on port 587
    auth: { user, pass },
    tls: {
      servername: hostname,      // TLS cert must match original hostname, not IP
      rejectUnauthorized: false, // Accept Railway sandbox certs
    },
    connectionTimeout: 12000,
    greetingTimeout: 12000,
    socketTimeout: 20000,
  });

  const message = {
    from: `"SchoolMart" <${user}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  const info = await transporter.sendMail(message);
  console.log('[sendEmail] Sent:', info.messageId);
};

module.exports = sendEmail;
