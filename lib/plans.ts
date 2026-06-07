export const plans = [
  { id: "safe-3h", name: "BGMI SAFE ADDITION", duration: "3 Hours", price: 50 },
  { id: "safe-1d", name: "BGMI SAFE ADDITION", duration: "1 Day", price: 100 },
  { id: "safe-7d", name: "BGMI SAFE ADDITION", duration: "7 Days", price: 400 },
  { id: "safe-30d", name: "BGMI SAFE ADDITION", duration: "30 Days", price: 800 },
  { id: "brutal-3h", name: "BGMI BRUTAL ADDITION", duration: "3 Hours", price: 50 },
  { id: "brutal-1d", name: "BGMI BRUTAL ADDITION", duration: "1 Day", price: 120 },
  { id: "brutal-7d", name: "BGMI BRUTAL ADDITION", duration: "7 Days", price: 500 },
  { id: "brutal-30d", name: "BGMI BRUTAL ADDITION", duration: "30 Days", price: 1000 },
  { id: "brutal-60d", name: "BGMI BRUTAL ADDITION", duration: "60 Days", price: 1500 },
] as const;

export const featuredPlans = [
  {
    title: "SAFE 120M",
    price: 120,
    label: "Stable protection plan",
    href: "/buy?plan=safe-1d",
  },
  {
    title: "BRUTAL 150M",
    price: 150,
    label: "Premium performance plan",
    href: "/buy?plan=brutal-1d",
  },
] as const;

export type PlanId = (typeof plans)[number]["id"];

export function getPlanLabel(planId: string) {
  const plan = plans.find((item) => item.id === planId);
  if (!plan) return planId;
  return `${plan.name} - ${plan.duration} - ₹${plan.price}/Device`;
}
