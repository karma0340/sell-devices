import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27-acacia' as any, // Use the latest API version or a stable one
});

export async function POST(req: Request) {
  try {
    const { items, email } = await req.json();

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',
        'sepa_debit',
        'sofort',
        'giropay',
        'paypal'
      ],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout/cancel`,
      customer_email: email,
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH'], // Focused on Berlin/Germany + neighbors
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
