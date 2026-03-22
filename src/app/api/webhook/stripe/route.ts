import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { sendOrderConfirmation } from '@/lib/mail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27-acacia' as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const rawSession = event.data.object as any;
    
    // Retrieve the full session to ensure data is fresh
    const session = await stripe.checkout.sessions.retrieve(rawSession.id, {
      expand: ['payment_intent'],
    }) as any;

    const customerEmail = session.customer_details?.email || '';
    const customerName = session.customer_details?.name || 'Unknown';
    const total = session.amount_total ? session.amount_total / 100 : 0;
    const items = JSON.parse(session.metadata?.items || '[]');
    const userId = session.metadata?.userId;

    // Multi-source address capture for absolute reliability
    const shipping = session.shipping_details || session.shipping || session.payment_intent?.shipping;
    const phone = session.customer_details?.phone || shipping?.phone || '';

    const existingUser = await prisma.user.findUnique({ 
      where: { email: customerEmail } 
    });

    try {
      const order = await prisma.order.create({
        data: {
          customer: customerName,
          email: customerEmail,
          items: items,
          total: total,
          status: 'PAID',
          address: shipping?.address || null,
          phoneNumber: phone || null,
          userId: existingUser?.id || (userId && userId !== '' ? userId : null),
        },
      });
      console.log(`Order saved and linked to user: ${existingUser ? 'Yes' : 'No (Guest)'}`);

      // Send Order Confirmation Email
      await sendOrderConfirmation(customerEmail, order);

    } catch (dbError) {
      console.error('Error saving order/sending email:', dbError);
    }
  }

  return NextResponse.json({ received: true });
}
