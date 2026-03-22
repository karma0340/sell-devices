import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmation } from '@/lib/mail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27-acacia' as any,
});

export async function POST(req: Request) {
  console.log('--- 🔔 STRIPE WEBHOOK RECEIVED ---');
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log(`✅ Event Authenticated: ${event.type}`);
  } catch (err: any) {
    console.error(`❌ Webhook Signature Verification Failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    console.log('📦 Processing Checkout Completion...');
    const rawSession = event.data.object as any;
    
    try {
      // Retrieve the full session to ensure data is fresh
      const session = await stripe.checkout.sessions.retrieve(rawSession.id, {
        expand: ['payment_intent'],
      }) as any;

      const metaEmail = session.metadata?.userEmail || '';
      const customerEmail = session.customer_details?.email || metaEmail || '';
      const customerName = session.customer_details?.name || 'Customer';
      const total = session.amount_total ? session.amount_total / 100 : 0;
      const items = JSON.parse(session.metadata?.items || '[]');
      const userId = session.metadata?.userId;

      // Multi-source address capture
      const shipping = session.shipping_details || (session as any).shipping;
      const customerAddr = session.customer_details?.address;
      const phone = session.customer_details?.phone || '';
      const finalAddress = shipping?.address || customerAddr || null;

      console.log(`🔍 Linking order: email=${customerEmail}, address=${JSON.stringify(finalAddress)}, phone=${phone}`);

      // Find user by email (most reliable method)
      const existingUser = await prisma.user.findUnique({ 
        where: { email: customerEmail } 
      }) || (userId ? await prisma.user.findUnique({ where: { id: userId } }).catch(() => null) : null);

      const order = await prisma.order.create({
        data: {
          customer: customerName,
          email: customerEmail,
          items: items,
          total: total,
          status: 'PAID',
          address: finalAddress,
          phoneNumber: phone || null,
          userId: existingUser?.id || (userId && userId !== '' ? userId : null),
        },
      });

      console.log(`✨ Order Created Successfully: ${order.id}`);

      // Send Order Confirmation Email
      try {
        await sendOrderConfirmation(customerEmail, order);
        console.log(`📧 Confirmation email sent to ${customerEmail}`);
      } catch (mailErr) {
        console.error('⚠️ Could not send confirmation email:', mailErr);
      }

    } catch (processError: any) {
      console.error('❌ Error processing webhook data:', processError.message);
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
