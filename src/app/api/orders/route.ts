import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const orderSchema = z.object({
  planId: z.enum(["starter", "pro", "business", "enterprise"]),
  billingCycle: z.enum(["monthly", "yearly"]),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  businessName: z.string().min(2),
  businessType: z.string().min(1),
  paymentMethod: z.enum(["transfer", "credit_card", "qris"]),
});

const PLAN_PRICES: Record<string, { monthly: number | null; yearly: number | null }> = {
  starter: { monthly: 99000, yearly: 79000 },
  pro: { monthly: 299000, yearly: 239000 },
  business: { monthly: 699000, yearly: 559000 },
  enterprise: { monthly: null, yearly: null },
};

function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LPK-${timestamp}-${random}`;
}

// In-memory store (resets on cold start — replace with a DB for production)
const ordersStore: Record<string, unknown>[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

    const prices = PLAN_PRICES[data.planId];
    const basePrice = data.billingCycle === "yearly" ? prices.yearly : prices.monthly;
    const totalAmount = basePrice !== null ? Math.round(basePrice * 1.11) : null;

    const order = {
      orderId: generateOrderId(),
      ...data,
      basePrice,
      totalAmount,
      status: "pending_payment",
      trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    ordersStore.push(order);

    return NextResponse.json(
      { success: true, orderId: order.orderId, message: "Pesanan berhasil dibuat" },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Data tidak valid", details: err.issues },
        { status: 400 }
      );
    }
    console.error("Order creation error:", err);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan internal" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (orderId) {
    const order = ordersStore.find((o) => (o as { orderId: string }).orderId === orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: "Pesanan tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  }

  return NextResponse.json({ success: true, total: ordersStore.length, orders: ordersStore });
}
