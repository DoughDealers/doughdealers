export async function onRequestGet({ env }) {
  if (!env.RESEND_API_KEY) return json({ error: 'Email service not configured.' }, 500)

  const name        = 'Test Customer'
  const email       = 'doughdealers08@gmail.com'
  const date        = 'Saturday, May 17'
  const displayTime = '2:30 PM'
  const methodLabel = 'Pickup'
  const total       = 59.54
  const itemsSummary = 'Chip Drip – Nutella (Chunks) x6, Oatsession – Regular (Chunks) x6'
  const paymentUrl  = 'https://thedoughdealers.com'

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <style>
    :root { color-scheme: light only; }
    body, html { margin:0; padding:0; background-color:#111111 !important; }
    @media (prefers-color-scheme: dark) {
      body { background-color:#111111 !important; }
      .logo-banner { background-color:#111111 !important; }
      .logo-banner img { filter:none !important; }
    }
  </style>
</head>
<body bgcolor="#111111" style="margin:0;padding:0;background-color:#111111;font-family:Arial,sans-serif;">
  <table width="100%" bgcolor="#111111" cellpadding="0" cellspacing="0" border="0">

    <tr>
      <td class="logo-banner" width="100%" bgcolor="#111111" align="center" style="width:100%;background-color:#111111;padding:0;margin:0;">
        <img src="https://thedoughdealers.com/logoemail.png" alt="Dough Dealers" width="100%" style="display:block;width:100%;max-width:100%;height:175px;object-fit:cover;object-position:center;filter:none;" />
      </td>
    </tr>

    <tr><td align="center" bgcolor="#111111" style="background-color:#111111;padding:12px 20px 40px;">
      <table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;">

        <tr><td height="8"></td></tr>

        <!-- Hero -->
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;text-align:center;">
          <p style="margin:0 0 12px;font-size:1.4rem;font-weight:800;color:#c8a96e;">Tap below to lock in your dough!</p>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Order summary -->
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;text-align:center;">
          <p style="margin:0 0 16px;font-size:0.75rem;font-weight:700;color:#c8a96e;letter-spacing:3px;text-transform:uppercase;">Order Summary</p>
          <p style="margin:0 0 10px;color:#d4c5a9;font-size:0.95rem;">📅 <strong style="color:#f0e8d5;">${date}</strong> at <strong style="color:#f0e8d5;">${displayTime}</strong></p>
          <p style="margin:0 0 16px;color:#d4c5a9;font-size:0.95rem;">📦 <strong style="color:#f0e8d5;">${methodLabel}</strong></p>
          <p style="margin:0;color:#888;font-size:0.9rem;line-height:1.7;">${itemsSummary}</p>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Amount + Pay button -->
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;text-align:center;">
          <p style="margin:0 0 4px;color:#888;font-size:0.85rem;text-transform:uppercase;letter-spacing:2px;">Amount Due</p>
          <p style="margin:0 0 24px;font-size:2rem;font-weight:800;color:#c8a96e;">$${total.toFixed(2)}</p>
          <a href="${paymentUrl}" style="display:inline-block;background:#c8a96e;color:#111;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:800;font-size:1.05rem;letter-spacing:0.5px;">
            💳 Pay Now
          </a>
          <p style="margin:20px 0 0;color:#555;font-size:0.8rem;">Secure payment powered by Stripe</p>
        </td></tr>

        <tr><td height="32"></td></tr>

        <!-- Footer -->
        <tr><td align="center">
          <p style="color:#555;font-size:0.78rem;margin:0 0 8px;line-height:1.6;">
            Using Outlook or Hotmail? Add
            <a href="mailto:orders@thedoughdealers.com" style="color:#c8a96e;text-decoration:none;">orders@thedoughdealers.com</a>
            to your contacts so our emails always reach you.
          </p>
          <p style="color:#444;font-size:0.8rem;margin:0 0 4px;">
            Questions? Hit us at
            <a href="mailto:Info@thedoughdealers.com" style="color:#c8a96e;text-decoration:none;">Info@thedoughdealers.com</a>
          </p>
          <p style="color:#333;font-size:0.75rem;margin:0;">© 2025 Dough Dealers · All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Dough Dealers <orders@thedoughdealers.com>',
      to: ['doughdealers08@gmail.com'],
      subject: '🧪 Payment Email Preview Test',
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return json({ error: err }, 500)
  }

  return json({ success: true })
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
}
