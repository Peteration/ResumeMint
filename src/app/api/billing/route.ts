import { NextResponse } from "next/server";
import Stripe from "stripe";
import axios from "axios";
import { supabase } from "@/lib/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

export async function POST(req: Request) {
  try {
    const { plan, email, amount, method, userId } = await req.json();

    if (!plan || !email || !amount || !method || !userId) {
      return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });
    }

    // ---- Stripe ----
    if (method === "stripe") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: `${plan} Plan - ResumeMint` },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: email,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success&userId=${userId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=cancel`,
      });

      return NextResponse.json({ success: true, method, url: session.url });
    }

    // ---- Paystack ----
    if (method === "paystack") {
      const res = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email,
          amount: amount * 100,
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success&userId=${userId}`,
        },
        { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json" } }
      );

      return NextResponse.json({ success: true, method, url: res.data.data.authorization_url });
    }

    return NextResponse.json({ success: false, error: "Invalid payment method" }, { status: 400 });
  } catch (error: any) {
    console.error("BILLING ERROR:", error.response?.data || error.message);
    return NextResponse.json({ success: false, error: "Payment initialization failed" }, { status: 500 });
  }
}
