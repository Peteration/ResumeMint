import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper to update user subscription
async function updateUser(email: string, plan: string) {
  try {
    const { error } = await supabase
      .from("users")
      .update({ plan, updated_at: new Date().toISOString() })
      .eq("email", email);

    if (error) console.error("SUPABASE UPDATE ERROR:", error.message);
  } catch (err) {
    console.error("SUPABASE ERROR:", err);
  }
}

// ---- STRIPE WEBHOOK ----
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const email = session.customer_email;
      await updateUser(email, "premium");
      console.log("✅ Stripe payment verified:", email);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Stripe Webhook Error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}

// ---- PAYSTACK WEBHOOK ----
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const event = body.event;

    if (event === "charge.success") {
      const email = body.data.customer.email;
      await updateUser(email, "premium");
      console.log("✅ Paystack payment verified:", email);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("❌ Paystack Webhook Error:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
}
