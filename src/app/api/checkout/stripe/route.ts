import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const { items, email: providedEmail } = await req.json();
    console.log('Checkout Items:', items);
    const finalEmail = session?.user?.email || providedEmail;

    const line_items = items.map((item: any) => {
      // Stripe requires public URLs for images. If local or base64, use a modern tech placeholder.
      const imageUrl = (item.image && item.image.startsWith('http')) 
        ? item.image 
        : 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300';

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: [imageUrl],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout/cancel`,
      customer_email: finalEmail,
      metadata: {
        userId: session?.user?.id || '',
        items: JSON.stringify(items.map((i: any) => ({ 
          id: i.id || i._id || 'unknown', 
          name: i.name,
          quantity: i.quantity, 
          price: i.price,
          image: i.image || ''
        }))),
      },
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH', 'IN', 'US', 'GB', 'CA', 'AU', 'FR', 'ES', 'IT'],
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error: any) {
    console.error('Stripe Full Error:', error);
    return NextResponse.json({ error: error.message || 'Payment engine error' }, { status: 500 });
  }
}
