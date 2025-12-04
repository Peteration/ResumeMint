// src/app/api/billing/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: ("2024-06-20" as unknown) as any,
});

export async function POST(req: Request) {
  try {
    // Use native request.json() instead of micro buffer
    const body = await req.text(); // get raw text
    const sig = req.headers.get("stripe-signature")!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed":
        console.log("✅ Payment completed:", event.data.object);
        break;
      case "invoice.paid":
        console.log("💰 Invoice paid:", event.data.object);
        break;
      case "invoice.payment_failed":
        console.log("❌ Payment failed:", event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("WEBHOOK ERROR:", err.message);
    return NextResponse.json({ error: "Webhook handling failed" }, { status: 400 });
  }
}
