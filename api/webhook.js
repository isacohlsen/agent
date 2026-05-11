export const config = {
  api: {
    bodyParser: false,
  },
};
 
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
 
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
 
  // Get raw body as buffer
  const rawBody = await getRawBody(req);
  const payload = JSON.parse(rawBody.toString());
 
  const event = payload;
 
  // Handle both checkout.session.completed and customer.subscription.created
  if (event.type === 'checkout.session.completed' || event.type === 'customer.subscription.created') {
    let email = null;
 
    if (event.type === 'checkout.session.completed') {
      email = event.data.object.customer_email
        || event.data.object.customer_details?.email;
    } else if (event.type === 'customer.subscription.created') {
      // Fetch customer from Stripe to get email
      const customerId = event.data.object.customer;
      try {
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        const customerRes = await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
          headers: { 'Authorization': `Bearer ${stripeKey}` }
        });
        const customer = await customerRes.json();
        email = customer.email;
      } catch(e) {
        console.error('Failed to fetch customer:', e);
      }
    }
 
    if (email) {
      console.log('Creating Supabase user for:', email);
      try {
        const response = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          },
          body: JSON.stringify({
            email,
            email_confirm: true,
            send_confirmation_email: true
          })
        });
        const data = await response.json();
        console.log('Supabase response:', data);
      } catch(e) {
        console.error('Supabase error:', e);
      }
    } else {
      console.log('No email found in event:', event.type);
    }
  }
 
  res.json({ received: true });
}
 
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
