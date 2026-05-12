export async function onRequestPost({ request, env }) {
  try {
    const { cart, customer, method, deliveryFee } = await request.json()

    if (!env.RESEND_API_KEY) {
      return json({ error: 'Email service not configured.' }, 500)
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
    const tax      = subtotal * 0.0825
    const total    = subtotal + tax + deliveryFee

    const methodLabel = method === 'pickup' ? '🏪 Pickup' : '🚗 Delivery'

    // ── Order rows for customer email ──────────────────────────────────────
    const orderRows = cart.map(i => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #2a2a2a;color:#d4c5a9;">
          ${i.name}${i.variant ? ` <span style="color:#888;font-size:0.85em;">(${i.variant})</span>` : ''}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #2a2a2a;text-align:center;color:#888;">x${i.qty}</td>
        <td style="padding:10px 0;border-bottom:1px solid #2a2a2a;text-align:right;color:#d4c5a9;">$${(i.price * i.qty).toFixed(2)}</td>
      </tr>`).join('')

    // ── Customer confirmation email ────────────────────────────────────────
    const customerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body, html { margin:0; padding:0; background-color:#111111 !important; }
    @media (prefers-color-scheme: dark) { body { background-color:#111111 !important; } }
  </style>
</head>
<body bgcolor="#111111" style="margin:0;padding:0;background-color:#111111;font-family:Arial,sans-serif;">
  <table width="100%" bgcolor="#111111" cellpadding="0" cellspacing="0" border="0">
    <tr><td align="center" bgcolor="#111111" style="background-color:#111111;padding:40px 20px;">
      <table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;">

        <!-- Logo -->
        <tr><td align="center" style="padding-bottom:32px;">
          <img src="https://thedoughdealers.com/logowhite.png" alt="Dough Dealers" width="180" style="display:block;max-width:180px;height:auto;" />
        </td></tr>

        <!-- Hero message -->
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;margin-bottom:20px;">
          <p style="margin:0 0 12px;font-size:1.4rem;font-weight:800;color:#c8a96e;">Hey ${customer.name}!</p>
          <p style="margin:0;color:#d4c5a9;line-height:1.75;font-size:1rem;">
            Your order just landed with the crew. In the meantime, your receipt is right here below. Thanks for choosing Dough Dealers!
          </p>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Order items -->
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;">
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
            ${deliveryFee > 0 ? `<tr>
              <td style="color:#888;font-size:0.9rem;padding:4px 0;">Delivery Fee</td>
              <td></td>
              <td align="right" style="color:#888;font-size:0.9rem;padding:4px 0;">$${deliveryFee.toFixed(2)}</td>
            </tr>` : ''}
            <tr><td colspan="3" style="border-top:1px solid #333;padding-top:12px;"></td></tr>
            <tr>
              <td style="color:#c8a96e;font-size:1.1rem;font-weight:800;padding-top:8px;">Total</td>
              <td></td>
              <td align="right" style="color:#c8a96e;font-size:1.1rem;font-weight:800;padding-top:8px;">$${total.toFixed(2)}</td>
            </tr>
          </table>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Order details -->
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;">
          <p style="margin:0 0 16px;font-size:0.75rem;font-weight:700;color:#c8a96e;letter-spacing:3px;text-transform:uppercase;">Order Details</p>
          <p style="margin:0 0 10px;color:#d4c5a9;font-size:0.95rem;">📅 <strong style="color:#f0e8d5;">${customer.date}</strong> at <strong style="color:#f0e8d5;">${customer.time}</strong></p>
          <p style="margin:0 0 10px;color:#d4c5a9;font-size:0.95rem;">📦 <strong style="color:#f0e8d5;">${methodLabel}</strong></p>
          ${method === 'delivery' ? `<p style="margin:0;color:#d4c5a9;font-size:0.95rem;">📍 <strong style="color:#f0e8d5;">${customer.address}</strong></p>` : ''}
        </td></tr>

        <tr><td height="32"></td></tr>

        <!-- Footer -->
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

    // ── Business notification email ────────────────────────────────────────
    const orderLinesText = cart
      .map(i => `${i.name}${i.variant ? ` (${i.variant})` : ''} x${i.qty} — $${(i.price * i.qty).toFixed(2)}`)
      .join('<br>')

    const businessHtml = `
<!DOCTYPE html>
<html lang="en">
<body style="font-family:Arial,sans-serif;background:#f9f9f9;padding:32px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e0e0e0;">
    <h2 style="margin:0 0 4px;color:#1a1a1a;">🔔 New Order</h2>
    <p style="color:#888;margin:0 0 24px;font-size:0.9rem;">${methodLabel} · ${customer.date} at ${customer.time}</p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr><td style="padding:6px 0;color:#555;width:120px;">Name</td><td style="font-weight:600;">${customer.name}</td></tr>
      <tr><td style="padding:6px 0;color:#555;">Email</td><td>${customer.email}</td></tr>
      <tr><td style="padding:6px 0;color:#555;">Phone</td><td>${customer.phone}</td></tr>
      <tr><td style="padding:6px 0;color:#555;">Method</td><td>${methodLabel}</td></tr>
      <tr><td style="padding:6px 0;color:#555;">Date</td><td>${customer.date} at ${customer.time}</td></tr>
      ${method === 'delivery' ? `<tr><td style="padding:6px 0;color:#555;">Address</td><td>${customer.address}</td></tr>` : ''}
    </table>

    <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
    <h3 style="margin:0 0 12px;">Order Items</h3>
    <p style="line-height:1.8;color:#333;">${orderLinesText}</p>

    <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
    <p style="margin:4px 0;color:#555;">Subtotal: <strong>$${subtotal.toFixed(2)}</strong></p>
    <p style="margin:4px 0;color:#555;">Tax: <strong>$${tax.toFixed(2)}</strong></p>
    ${deliveryFee > 0 ? `<p style="margin:4px 0;color:#555;">Delivery Fee: <strong>$${deliveryFee.toFixed(2)}</strong></p>` : ''}
    <p style="margin:12px 0 0;font-size:1.1rem;color:#1a1a1a;">Total: <strong>$${total.toFixed(2)}</strong></p>
  </div>
</body>
</html>`

    // ── Send customer confirmation via Resend ─────────────────────────────
    const custRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Dough Dealers <orders@thedoughdealers.com>',
        to: [customer.email],
        reply_to: 'Info@thedoughdealers.com',
        subject: `🍪 Dough Fasho! We Got Your Order, ${customer.name}!`,
        html: customerHtml,
      }),
    })

    if (!custRes.ok) {
      const err = await custRes.text()
      console.error('Resend customer email error:', err)
      return json({ error: 'Failed to send confirmation email.' }, 500)
    }

    // ── Send business notification via FormSubmit ──────────────────────────
    const orderLinesPlain = cart
      .map(i => `${i.name}${i.variant ? ` (${i.variant})` : ''} x${i.qty} — $${(i.price * i.qty).toFixed(2)}`)
      .join('\n')

    await fetch('https://formsubmit.co/ajax/Info@thedoughdealers.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `🔔 New Order — ${customer.name} — ${methodLabel} — ${customer.date}`,
        Name: customer.name,
        Email: customer.email,
        Phone: customer.phone,
        Method: methodLabel,
        Date: `${customer.date} at ${customer.time}`,
        ...(method === 'delivery' && { Address: customer.address }),
        'Order Items': orderLinesPlain,
        Subtotal: `$${subtotal.toFixed(2)}`,
        'Tax (8.25%)': `$${tax.toFixed(2)}`,
        ...(deliveryFee > 0 && { 'Delivery Fee': `$${deliveryFee.toFixed(2)}` }),
        Total: `$${total.toFixed(2)}`,
      }),
    }).catch(() => {})

    return json({ success: true })
  } catch (err) {
    return json({ error: 'Server error: ' + err.message }, 500)
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
}
