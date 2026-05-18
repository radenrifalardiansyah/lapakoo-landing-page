export type PlanId = "starter" | "pro" | "business" | "enterprise";
export type BillingCycle = "monthly" | "yearly";

export interface Plan {
  id: PlanId;
  name: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface OrderData {
  // Step 1 - Plan
  planId: PlanId;
  billingCycle: BillingCycle;
  // Step 2 - Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  // Step 3 - Payment
  paymentMethod: "transfer" | "credit_card" | "qris";
  // Meta
  orderId?: string;
  createdAt?: string;
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 99000,
    yearlyPrice: 79000,
    description: "Untuk penjual baru yang ingin memulai",
    features: ["2 Toko marketplace", "500 produk", "200 pesanan/bulan", "Support email"],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 299000,
    yearlyPrice: 239000,
    description: "Untuk penjual serius yang ingin naik level",
    features: [
      "10 Toko marketplace",
      "5.000 produk",
      "Pesanan tak terbatas",
      "AI Analytics",
      "Support 24/7",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    monthlyPrice: 699000,
    yearlyPrice: 559000,
    description: "Untuk bisnis volume tinggi & tim besar",
    features: [
      "Unlimited toko",
      "Unlimited produk",
      "Manajemen tim (10 user)",
      "API access",
      "Account manager",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "Solusi custom untuk perusahaan besar",
    features: ["Semua fitur Business", "Infrastructure khusus", "White-label", "On-site support"],
  },
];
