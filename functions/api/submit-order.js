export async function onRequestPost({ request, env }) {
  try {
    const { cart, customer, method, deliveryFee, serviceFee = 0, giftMessage } = await request.json()

    if (!env.RESEND_API_KEY) {
      return json({ error: 'Email service not configured.' }, 500)
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
    const tax      = subtotal * 0.0825
    const total    = subtotal + tax + deliveryFee + serviceFee

    const methodLabel = method === 'pickup' ? '🏪 Pickup' : '🚗 Delivery'

    const formatTime = t => {
      const [h, m] = t.split(':')
      const hr = parseInt(h)
      return `${hr % 12 || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`
    }
    const displayTime = formatTime(customer.time)

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

    <!-- Full-width logo banner -->
    <tr>
      <td class="logo-banner" width="100%" bgcolor="#111111" align="center" style="width:100%;background-color:#111111;padding:0;margin:0;">
        <img src="https://thedoughdealers.com/logoemail.png" alt="Dough Dealers" width="100%" style="display:block;width:100%;max-width:100%;height:175px;object-fit:cover;object-position:center;filter:none;" />
      </td>
    </tr>

    <tr><td align="center" bgcolor="#111111" style="background-color:#111111;padding:12px 20px 40px;">
      <table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;">

        <tr><td height="8"></td></tr>

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
            ${serviceFee > 0 ? `<tr>
              <td style="color:#888;font-size:0.9rem;padding:4px 0;">Service Fee (3%)</td>
              <td></td>
              <td align="right" style="color:#888;font-size:0.9rem;padding:4px 0;">$${serviceFee.toFixed(2)}</td>
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
          <p style="margin:0 0 10px;color:#d4c5a9;font-size:0.95rem;">📅 <strong style="color:#f0e8d5;">${customer.date}</strong> at <strong style="color:#f0e8d5;">${displayTime}</strong></p>
          <p style="margin:0 0 10px;color:#d4c5a9;font-size:0.95rem;">📦 <strong style="color:#f0e8d5;">${methodLabel}</strong></p>
          ${method === 'delivery' ? `<p style="margin:0;color:#d4c5a9;font-size:0.95rem;">📍 <strong style="color:#f0e8d5;">${customer.address}</strong></p>` : ''}
        </td></tr>

        <tr><td height="16"></td></tr>

        ${giftMessage ? `
        <!-- Gift message -->
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:28px 32px;">
          <p style="margin:0 0 10px;font-size:0.75rem;font-weight:700;color:#c8a96e;letter-spacing:3px;text-transform:uppercase;">🎁 Gift Message</p>
          <p style="margin:0 0 6px;color:#888;font-size:0.82rem;">${giftMessage.occasionLabel}</p>
          <p style="margin:0;color:#f0e8d5;font-size:1rem;font-style:italic;line-height:1.6;">"${giftMessage.message}"</p>
        </td></tr>
        <tr><td height="16"></td></tr>
        ` : ''}

        <tr><td height="16"></td></tr>

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

    // ── Business notification email ────────────────────────────────────────
    const orderLinesText = cart
      .map(i => `${i.name}${i.variant ? ` (${i.variant})` : ''} x${i.qty} — $${(i.price * i.qty).toFixed(2)}`)
      .join('<br>')

    const itemsSummary = cart
      .map(i => `${i.name}${i.variant ? ` (${i.variant})` : ''} x${i.qty}`)
      .join(', ')

    // Build confirm URL — encodes order data so clicking it auto-sends the payment link
    const origin = new URL(request.url).origin
    const orderData = btoa(encodeURIComponent(JSON.stringify({
      name:         customer.name,
      email:        customer.email,
      phone:        customer.phone,
      date:         customer.date,
      time:         customer.time,
      method,
      total:        parseFloat(total.toFixed(2)),
      itemsSummary,
    })))
    const confirmUrl = `${origin}/api/send-payment-link?data=${encodeURIComponent(orderData)}`

    const businessHtml = `
<!DOCTYPE html>
<html lang="en">
<body style="font-family:Arial,sans-serif;background:#f9f9f9;padding:32px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e0e0e0;">
    <h2 style="margin:0 0 4px;color:#1a1a1a;">🔔 New Order</h2>
    <p style="color:#888;margin:0 0 24px;font-size:0.9rem;">${methodLabel} · ${customer.date} at ${displayTime}</p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr><td style="padding:6px 0;color:#555;width:120px;">Name</td><td style="font-weight:600;">${customer.name}</td></tr>
      <tr><td style="padding:6px 0;color:#555;">Email</td><td>${customer.email}</td></tr>
      <tr><td style="padding:6px 0;color:#555;">Phone</td><td>${customer.phone}</td></tr>
      <tr><td style="padding:6px 0;color:#555;">Method</td><td>${methodLabel}</td></tr>
      <tr><td style="padding:6px 0;color:#555;">Date</td><td>${customer.date} at ${displayTime}</td></tr>
      ${method === 'delivery' ? `<tr><td style="padding:6px 0;color:#555;">Address</td><td>${customer.address}</td></tr>` : ''}
    </table>

    <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
    <h3 style="margin:0 0 12px;">Order Items</h3>
    <p style="line-height:1.8;color:#333;">${orderLinesText}</p>

    <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
    <p style="margin:4px 0;color:#555;">Subtotal: <strong>$${subtotal.toFixed(2)}</strong></p>
    <p style="margin:4px 0;color:#555;">Tax: <strong>$${tax.toFixed(2)}</strong></p>
    ${deliveryFee > 0 ? `<p style="margin:4px 0;color:#555;">Delivery Fee: <strong>$${deliveryFee.toFixed(2)}</strong></p>` : ''}
    ${serviceFee > 0 ? `<p style="margin:4px 0;color:#555;">Service Fee (3%): <strong>$${serviceFee.toFixed(2)}</strong></p>` : ''}
    <p style="margin:12px 0 0;font-size:1.2rem;color:#1a1a1a;">Total: <strong>$${total.toFixed(2)}</strong></p>

    ${giftMessage ? `
    <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
    <p style="margin:0 0 6px;font-weight:700;color:#1a1a1a;">🎁 Gift Message (${giftMessage.occasionLabel})</p>
    <p style="margin:0;color:#333;font-style:italic;">"${giftMessage.message}"</p>
    ` : ''}

    <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
    <p style="margin:0 0 16px;color:#555;font-size:0.9rem;">Review the order above, then click below to confirm it and automatically send the customer their payment link.</p>
    <a href="${confirmUrl}" style="display:inline-block;background:#2a9d2a;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:1rem;">
      ✅ Confirm &amp; Send Payment Link
    </a>
    <p style="margin:12px 0 0;color:#aaa;font-size:0.8rem;">The customer will receive a secure Stripe payment link for $${total.toFixed(2)}.</p>
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
        subject: `🍪 We Got Your Order, ${customer.name}!`,
        html: customerHtml,
      }),
    })

    if (!custRes.ok) {
      const err = await custRes.text()
      console.error('Resend customer email error:', err)
      return json({ error: 'Failed to send confirmation email.' }, 500)
    }

    // ── Send business notification via Resend → Gmail ─────────────────────
    const orderLinesPlain = cart
      .map(i => `${i.name}${i.variant ? ` (${i.variant})` : ''} x${i.qty} — $${(i.price * i.qty).toFixed(2)}`)
      .join('<br>')

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Dough Dealers Orders <orders@thedoughdealers.com>',
        to: ['doughdealers08@gmail.com'],
        subject: `🔔 New Order — ${customer.name} — ${methodLabel} — ${customer.date}`,
        html: businessHtml,
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
