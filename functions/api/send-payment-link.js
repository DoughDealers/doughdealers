export async function onRequestGet({ request, env }) {
  const url    = new URL(request.url)
  const encoded = url.searchParams.get('data')

  if (!encoded) return htmlPage('Missing order data.', true)

  let order
  try { order = JSON.parse(decodeURIComponent(atob(encoded))) }
  catch { return htmlPage('Invalid order data.', true) }

  const { name, email, phone, date, time, method, total, itemsSummary } = order

  if (!env.STRIPE_SECRET_KEY) return htmlPage('Stripe not configured.', true)
  if (!env.RESEND_API_KEY)    return htmlPage('Email service not configured.', true)

  const formatTime = t => {
    if (!t) return ''
    const [h, m] = t.split(':')
    const hr = parseInt(h)
    return `${hr % 12 || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`
  }
  const displayTime  = formatTime(time)
  const methodLabel  = method === 'pickup' ? 'Pickup' : 'Delivery'

  // ── Step 1: Create a Stripe Price ─────────────────────────────────────────
  const priceRes = await fetch('https://api.stripe.com/v1/prices', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'currency': 'usd',
      'unit_amount': String(Math.round(total * 100)),
      'product_data[name]': `Dough Dealers Order — ${name} · ${methodLabel} · ${date} at ${displayTime}`,
    }).toString(),
  })
  const price = await priceRes.json()
  if (price.error) return htmlPage(`Stripe error: ${price.error.message}`, true)

  // ── Step 2: Create the Payment Link ───────────────────────────────────────
  const linkRes = await fetch('https://api.stripe.com/v1/payment_links', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'line_items[0][price]':    price.id,
      'line_items[0][quantity]': '1',
      'after_completion[type]':  'hosted_confirmation',
      'after_completion[hosted_confirmation][custom_message]':
        `Your payment is confirmed! Your Dough Dealers order is set for ${date}. We'll see you then!`,
    }).toString(),
  })
  const link = await linkRes.json()
  if (link.error) return htmlPage(`Stripe error: ${link.error.message}`, true)

  // ── Step 3: Email customer with payment link ───────────────────────────────
  const paymentHtml = `
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

    <!-- Logo -->
    <tr>
      <td class="logo-banner" width="100%" bgcolor="#111111" align="center" style="width:100%;background-color:#111111;padding:0;margin:0;">
        <img src="https://thedoughdealers.com/logoemail.png" alt="Dough Dealers" width="100%" style="display:block;width:100%;max-width:100%;height:175px;object-fit:cover;object-position:center;filter:none;" />
      </td>
    </tr>

    <tr><td align="center" bgcolor="#111111" style="background-color:#111111;padding:12px 20px 40px;">
      <table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;">

        <tr><td height="8"></td></tr>

        <!-- Hero -->
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;">
          <p style="margin:0 0 12px;font-size:1.4rem;font-weight:800;color:#c8a96e;">Your deal's been approved, ${name}!</p>
          <p style="margin:0;color:#d4c5a9;line-height:1.75;font-size:1rem;">
            We ran it by the crew and you're locked in. Tap below to lock in your dough!
          </p>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Order summary -->
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;">
          <p style="margin:0 0 16px;font-size:0.75rem;font-weight:700;color:#c8a96e;letter-spacing:3px;text-transform:uppercase;">Order Summary</p>
          <p style="margin:0 0 10px;color:#d4c5a9;font-size:0.95rem;">📅 <strong style="color:#f0e8d5;">${date}</strong> at <strong style="color:#f0e8d5;">${displayTime}</strong></p>
          <p style="margin:0 0 16px;color:#d4c5a9;font-size:0.95rem;">📦 <strong style="color:#f0e8d5;">${methodLabel}</strong></p>
          <p style="margin:0;color:#888;font-size:0.9rem;line-height:1.7;">${itemsSummary}</p>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Total + Pay button -->
        <tr><td bgcolor="#1a1a1a" style="background-color:#1a1a1a;border-radius:12px;padding:32px;text-align:center;">
          <p style="margin:0 0 4px;color:#888;font-size:0.85rem;text-transform:uppercase;letter-spacing:2px;">Amount Due</p>
          <p style="margin:0 0 24px;font-size:2rem;font-weight:800;color:#c8a96e;">$${total.toFixed(2)}</p>
          <a href="${link.url}"
            style="display:inline-block;background:#c8a96e;color:#111;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:800;font-size:1.05rem;letter-spacing:0.5px;">
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

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Dough Dealers <orders@thedoughdealers.com>',
      to: [email],
      reply_to: 'Info@thedoughdealers.com',
      subject: `💳 Your Dough Dealers Payment Link — $${total.toFixed(2)} Due`,
      html: paymentHtml,
    }),
  })

  if (!emailRes.ok) {
    const err = await emailRes.text()
    return htmlPage(`Failed to send email: ${err}`, true)
  }

  // ── Return success page to business owner ─────────────────────────────────
  return htmlPage(`
    <div style="font-size:3rem;margin-bottom:16px;">✅</div>
    <h1 style="color:#c8a96e;margin:0 0 12px;font-size:1.6rem;">Order Confirmed!</h1>
    <p style="color:#aaa;margin:0 0 20px;">Payment link emailed to <strong style="color:#fff;">${email}</strong></p>

    <div style="background:#1a1a1a;border-radius:10px;padding:20px;margin-bottom:20px;text-align:left;">
      <p style="margin:0 0 4px;font-size:0.7rem;color:#c8a96e;letter-spacing:2px;text-transform:uppercase;">Customer</p>
      <p style="margin:0 0 2px;color:#fff;font-weight:700;">${name}</p>
      <p style="margin:0 0 2px;color:#aaa;font-size:0.9rem;">${email}</p>
      ${phone ? `<p style="margin:0;font-size:1rem;"><a href="sms:${phone.replace(/\D/g,'')}" style="color:#c8a96e;text-decoration:none;font-weight:700;">📱 Text ${phone}</a></p>` : ''}
    </div>

    <div style="background:#1a1a1a;border-radius:10px;padding:20px;margin-bottom:20px;text-align:left;">
      <p style="margin:0 0 4px;font-size:0.7rem;color:#c8a96e;letter-spacing:2px;text-transform:uppercase;">Order</p>
      <p style="margin:0 0 2px;color:#fff;">${date} at ${displayTime} &nbsp;·&nbsp; ${methodLabel}</p>
      <p style="margin:0;color:#c8a96e;font-weight:800;font-size:1.1rem;">$${total.toFixed(2)}</p>
    </div>

    <div style="background:#1a1a1a;border-radius:10px;padding:20px;text-align:left;">
      <p style="margin:0 0 8px;font-size:0.7rem;color:#c8a96e;letter-spacing:2px;text-transform:uppercase;">Payment Link</p>
      <p style="margin:0 0 10px;color:#aaa;font-size:0.8rem;">If the email didn't reach them, copy this link and text it to ${phone || 'the customer'}:</p>
      <div style="background:#111;border-radius:6px;padding:10px 14px;word-break:break-all;">
        <a href="${link.url}" style="color:#c8a96e;font-size:0.85rem;text-decoration:none;">${link.url}</a>
      </div>
      <button onclick="navigator.clipboard.writeText('${link.url}').then(()=>{this.textContent='Copied!';setTimeout(()=>this.textContent='Copy Link',2000)})"
        style="margin-top:10px;background:#c8a96e;color:#111;border:none;padding:8px 20px;border-radius:6px;font-weight:700;cursor:pointer;font-size:0.9rem;">
        Copy Link
      </button>
    </div>
  `)
}

function htmlPage(content, isError = false) {
  const body = content.includes('<h1') ? content : `<p style="color:${isError ? '#e07070' : '#aaa'}">${content}</p>`
  return new Response(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Dough Dealers</title></head>
<body style="font-family:Arial,sans-serif;background:#111111;color:#fff;text-align:center;padding:80px 24px;margin:0;">
  <div style="max-width:420px;margin:0 auto;">${body}</div>
</body>
</html>`, {
    status: isError ? 400 : 200,
    headers: { 'Content-Type': 'text/html;charset=utf-8' },
  })
}
