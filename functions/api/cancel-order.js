export async function onRequestPost({ request, env }) {
  try {
    const { name, email, date, time, method } = await request.json()

    if (!env.RESEND_API_KEY) {
      return json({ error: 'Email service not configured.' }, 500)
    }

    const formatTime = t => {
      if (!t) return ''
      const [h, m] = t.split(':')
      const hr = parseInt(h)
      return `${hr % 12 || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`
    }
    const displayTime = formatTime(time)
    const methodLabel = method === 'pickup' ? 'Pickup' : 'Delivery'

    // ── Customer cancellation confirmation email ───────────────────────────
    const customerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body, html { margin:0; padding:0; background-color:#111111 !important; }
  </style>
</head>
<body bgcolor="#111111" style="margin:0;padding:0;background-color:#111111;font-family:Arial,sans-serif;">
  <table width="100%" bgcolor="#111111" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td width="100%" bgcolor="#111111" align="center" style="width:100%;background-color:#111111;padding:0;margin:0;">
        <img src="https://thedoughdealers.com/logoemail.png" alt="Dough Dealers" width="100%" style="display:block;width:100%;max-width:100%;height:175px;object-fit:cover;object-position:center;" />
      </td>
    </tr>
    <tr><td align="center" bgcolor="#111111" style="background-color:#111111;padding:12px 20px 40px;">
      <table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;">

        <tr><td height="8"></td></tr>

        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;">
          <p style="margin:0 0 12px;font-size:1.3rem;font-weight:800;color:#c8a96e;">Hey ${name || 'there'}!</p>
          <p style="margin:0 0 16px;color:#d4c5a9;line-height:1.75;font-size:1rem;">
            We received your cancellation request for your order on <strong style="color:#f0e8d5;">${date}</strong> at <strong style="color:#f0e8d5;">${displayTime}</strong> (${methodLabel}).
          </p>
          <p style="margin:0;color:#d4c5a9;line-height:1.75;font-size:1rem;">
            We'll reach out shortly to confirm and let you know if any cancellation fees apply based on our policy.
          </p>
        </td></tr>

        <tr><td height="16"></td></tr>

        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:24px 32px;">
          <p style="margin:0 0 12px;font-size:0.75rem;font-weight:700;color:#c8a96e;letter-spacing:3px;text-transform:uppercase;">Cancellation Policy</p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:0.9rem;">
            <tr>
              <td style="padding:6px 0;color:#d4c5a9;border-bottom:1px solid #2a2a2a;">72+ hours before</td>
              <td align="right" style="padding:6px 0;color:#4ade80;font-weight:700;border-bottom:1px solid #2a2a2a;">No fee</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#d4c5a9;border-bottom:1px solid #2a2a2a;">48–72 hours before</td>
              <td align="right" style="padding:6px 0;color:#c8a96e;font-weight:700;border-bottom:1px solid #2a2a2a;">25% fee</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#d4c5a9;border-bottom:1px solid #2a2a2a;">24–48 hours before</td>
              <td align="right" style="padding:6px 0;color:#fb923c;font-weight:700;border-bottom:1px solid #2a2a2a;">50% fee</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#d4c5a9;">Same day</td>
              <td align="right" style="padding:6px 0;color:#f87171;font-weight:700;">Full charge</td>
            </tr>
          </table>
        </td></tr>

        <tr><td height="24"></td></tr>

        <tr><td align="center">
          <p style="color:#555;font-size:0.78rem;margin:0 0 8px;line-height:1.6;">
            Questions? Email us at
            <a href="mailto:Info@thedoughdealers.com" style="color:#c8a96e;text-decoration:none;">Info@thedoughdealers.com</a>
          </p>
          <p style="color:#333;font-size:0.75rem;margin:0;">© 2025 Dough Dealers · All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // ── Business cancel notification email ────────────────────────────────
    const businessHtml = `
<!DOCTYPE html>
<html lang="en">
<body style="font-family:Arial,sans-serif;background:#f9f9f9;padding:32px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e0e0e0;">
    <h2 style="margin:0 0 4px;color:#c0392b;">❌ Cancellation Request</h2>
    <p style="color:#888;margin:0 0 24px;font-size:0.9rem;">${methodLabel} · ${date} at ${displayTime}</p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr><td style="padding:6px 0;color:#555;width:120px;">Name</td><td style="font-weight:600;">${name || '—'}</td></tr>
      <tr><td style="padding:6px 0;color:#555;">Email</td><td>${email || '—'}</td></tr>
      <tr><td style="padding:6px 0;color:#555;">Method</td><td>${methodLabel}</td></tr>
      <tr><td style="padding:6px 0;color:#555;">Order Date</td><td>${date} at ${displayTime}</td></tr>
    </table>

    <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
    <p style="margin:0;color:#555;font-size:0.9rem;">Review the cancellation policy and reach out to the customer to confirm.</p>
  </div>
</body>
</html>`

    // ── Send customer email ───────────────────────────────────────────────
    if (email) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Dough Dealers <orders@thedoughdealers.com>',
          to: [email],
          reply_to: 'Info@thedoughdealers.com',
          subject: `Cancellation Request Received — ${date}`,
          html: customerHtml,
        }),
      }).catch(() => {})
    }

    // ── Send business notification ────────────────────────────────────────
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Dough Dealers Orders <orders@thedoughdealers.com>',
        to: ['doughdealers08@gmail.com'],
        subject: `❌ Cancel Request — ${name || 'Customer'} — ${date}`,
        html: businessHtml,
      }),
    })

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
