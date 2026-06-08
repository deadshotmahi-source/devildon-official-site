const safeApkDownloadLink =
  "https://firebasestorage.googleapis.com/v0/b/devildonofficial.firebasestorage.app/o/apk%2FDevil%20Don%204.4%20120%20M5.apk?alt=media&token=a7a543be-6895-4d69-9b39-b3eb0fd5dd3e";

const brutalApkDownloadLink =
  "https://firebasestorage.googleapis.com/v0/b/devildonofficial.firebasestorage.app/o/apk%2FDevil%20Don%204.4%20150%20M5.apk?alt=media&token=7387d123-bbc3-4e38-a883-0a469f7b80d8";

export const plans = [
  { id: "safe-3h", name: "BGMI SAFE MODE", duration: "3 Hours", price: 50, apkDownloadLink: safeApkDownloadLink },
  { id: "safe-1d", name: "BGMI SAFE MODE", duration: "1 Day", price: 100, apkDownloadLink: safeApkDownloadLink },
  { id: "safe-7d", name: "BGMI SAFE MODE", duration: "7 Days", price: 400, apkDownloadLink: safeApkDownloadLink },
  { id: "safe-30d", name: "BGMI SAFE MODE", duration: "30 Days", price: 800, apkDownloadLink: safeApkDownloadLink },
  { id: "brutal-3h", name: "BGMI BRUTAL MODE", duration: "3 Hours", price: 50, apkDownloadLink: brutalApkDownloadLink },
  { id: "brutal-1d", name: "BGMI BRUTAL MODE", duration: "1 Day", price: 120, apkDownloadLink: brutalApkDownloadLink },
  { id: "brutal-7d", name: "BGMI BRUTAL MODE", duration: "7 Days", price: 500, apkDownloadLink: brutalApkDownloadLink },
  { id: "brutal-30d", name: "BGMI BRUTAL MODE", duration: "30 Days", price: 1000, apkDownloadLink: brutalApkDownloadLink },
  { id: "brutal-60d", name: "BGMI BRUTAL MODE", duration: "60 Days", price: 1500, apkDownloadLink: brutalApkDownloadLink },
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
  return `${plan.name} - ${plan.duration} - Rs ${plan.price}/Device`;
}

export function getApkDownloadLink(planId: string) {
  return plans.find((item) => item.id === planId)?.apkDownloadLink ?? "";
}
