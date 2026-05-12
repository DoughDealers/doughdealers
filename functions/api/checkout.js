export async function onRequestPost({ request, env }) {
  try {
    const { cart, customer, method, deliveryFee, processingFee = 0 } = await request.json()

    if (!env.STRIPE_SECRET_KEY) {
      return json({ error: 'Payment not configured.' }, 500)
    }

    const origin = new URL(request.url).origin
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
    const tax = subtotal * 0.0825

    const body = new URLSearchParams()

    // Cart line items
    cart.forEach((item, i) => {
      body.append(`line_items[${i}][price_data][currency]`, 'usd')
      body.append(`line_items[${i}][price_data][product_data][name]`, item.name)
      body.append(`line_items[${i}][price_data][unit_amount]`, String(Math.round(item.price * 100)))
      body.append(`line_items[${i}][quantity]`, String(item.qty))
    })

    let idx = cart.length

    // Tax line item
    if (tax > 0) {
      body.append(`line_items[${idx}][price_data][currency]`, 'usd')
      body.append(`line_items[${idx}][price_data][product_data][name]`, 'Tax (8.25%)')
      body.append(`line_items[${idx}][price_data][unit_amount]`, String(Math.round(tax * 100)))
      body.append(`line_items[${idx}][quantity]`, '1')
      idx++
    }

    // Delivery fee line item
    if (deliveryFee > 0) {
      body.append(`line_items[${idx}][price_data][currency]`, 'usd')
      body.append(`line_items[${idx}][price_data][product_data][name]`, 'Delivery Fee')
      body.append(`line_items[${idx}][price_data][unit_amount]`, String(Math.round(deliveryFee * 100)))
      body.append(`line_items[${idx}][quantity]`, '1')
      idx++
    }

    // Processing fee line item
    if (processingFee > 0) {
      body.append(`line_items[${idx}][price_data][currency]`, 'usd')
      body.append(`line_items[${idx}][price_data][product_data][name]`, 'Processing Fee (3%)')
      body.append(`line_items[${idx}][price_data][unit_amount]`, String(Math.round(processingFee * 100)))
      body.append(`line_items[${idx}][quantity]`, '1')
    }

    body.append('mode', 'payment')
    body.append('customer_email', customer.email)
    body.append('success_url', `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`)
    body.append('cancel_url', `${origin}/?payment=cancel`)
    body.append('payment_intent_data[description]', `Dough Dealers — ${method === 'pickup' ? 'Pickup' : 'Delivery'} on ${customer.date} at ${customer.time}`)

    // Order metadata (shown in Stripe dashboard)
    body.append('metadata[name]',   customer.name.slice(0, 500))
    body.append('metadata[email]',  customer.email.slice(0, 500))
    body.append('metadata[phone]',  customer.phone.slice(0, 500))
    body.append('metadata[method]', method)
    body.append('metadata[date]',   customer.date)
    body.append('metadata[time]',   customer.time)
    if (customer.address) body.append('metadata[address]', customer.address.slice(0, 500))

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    const session = await stripeRes.json()

    if (session.error) {
      return json({ error: session.error.message }, 400)
    }

    return json({ url: session.url })
  } catch (err) {
    return json({ error: 'Server error: ' + err.message }, 500)
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
