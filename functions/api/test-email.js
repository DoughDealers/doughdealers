export async function onRequestGet({ env }) {
  if (!env.RESEND_API_KEY) {
    return json({ error: 'Email service not configured.' }, 500)
  }

  const cart = [
    { name: 'Chip Drip', variant: 'Nutella', price: 5.00, qty: 6 },
    { name: 'Oatsession', variant: 'Regular', price: 5.00, qty: 6 },
  ]
  const customer = { name: 'Test Customer', date: 'Saturday, May 17', time: '14:30' }
  const method = 'pickup'
  const deliveryFee = 0

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const tax      = subtotal * 0.0825
  const total    = subtotal + tax + deliveryFee
  const methodLabel = '🏪 Pickup'

  const formatTime = t => {
    const [h, m] = t.split(':')
    const hr = parseInt(h)
    return `${hr % 12 || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`
  }
  const displayTime = formatTime(customer.time)

  const orderRows = cart.map(i => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#d4c5a9;">
        ${i.name}${i.variant ? ` <span style="color:#888;font-size:0.85em;">(${i.variant})</span>` : ''}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #2a2a2a;text-align:center;color:#888;">x${i.qty}</td>
      <td style="padding:10px 0;border-bottom:1px solid #2a2a2a;text-align:right;color:#d4c5a9;">$${(i.price * i.qty).toFixed(2)}</td>
    </tr>`).join('')

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
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;margin-bottom:20px;text-align:center;">
          <p style="margin:0 0 12px;font-size:1.4rem;font-weight:800;color:#c8a96e;">Hey ${customer.name}!</p>
          <p style="margin:0;color:#d4c5a9;line-height:1.75;font-size:1rem;">
            Your order just landed with the crew. In the meantime, your receipt is right here below. Thanks for choosing Dough Dealers!
          </p>
        </td></tr>
        <tr><td height="16"></td></tr>
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;text-align:center;">
          <p style="margin:0 0 20px;font-size:0.75rem;font-weight:700;color:#c8a96e;letter-spacing:3px;text-transform:uppercase;">Your Order</p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            ${orderRows}
            <tr><td colspan="3" height="16"></td></tr>
            <tr>
              <td style="color:#888;font-size:0.9rem;padding:4px 0;">Subtotal</td>
              <td></td>
              <td align="right" style="color:#888;font-size:0.9rem;padding:4px 0;">$${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="color:#888;font-size:0.9rem;padding:4px 0;">Tax (8.25%)</td>
              <td></td>
              <td align="right" style="color:#888;font-size:0.9rem;padding:4px 0;">$${tax.toFixed(2)}</td>
            </tr>
            <tr><td colspan="3" style="border-top:1px solid #333;padding-top:12px;"></td></tr>
            <tr>
              <td style="color:#c8a96e;font-size:1.1rem;font-weight:800;padding-top:8px;">Total</td>
              <td></td>
              <td align="right" style="color:#c8a96e;font-size:1.1rem;font-weight:800;padding-top:8px;">$${total.toFixed(2)}</td>
            </tr>
          </table>
        </td></tr>
        <tr><td height="16"></td></tr>
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;text-align:center;">
          <p style="margin:0 0 16px;font-size:0.75rem;font-weight:700;color:#c8a96e;letter-spacing:3px;text-transform:uppercase;">Order Details</p>
          <p style="margin:0 0 10px;color:#d4c5a9;font-size:0.95rem;">📅 <strong style="color:#f0e8d5;">${customer.date}</strong> at <strong style="color:#f0e8d5;">${displayTime}</strong></p>
          <p style="margin:0 0 10px;color:#d4c5a9;font-size:0.95rem;">📦 <strong style="color:#f0e8d5;">${methodLabel}</strong></p>
        </td></tr>
        <tr><td height="32"></td></tr>
        <tr><td align="center">
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
      subject: '🧪 Email Preview Test',
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return json({ error: err }, 500)
  }

  return json({ success: true, message: 'Test email sent to doughdealers08@gmail.com!' })
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
}
