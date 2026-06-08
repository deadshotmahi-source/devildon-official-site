"use client";

import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, CreditCard, Download, ListChecks, ShieldCheck, UploadCloud } from "lucide-react";
import { Footer, SiteNav } from "@/components/SiteNav";
import { isFirebaseConfigured } from "@/lib/firebase";
import { createOrder, getPaymentSettings } from "@/lib/orders";
import { getPlanLabel, plans } from "@/lib/plans";

const buySteps = [
  { title: "Select Plan", text: "Choose SAFE or BRUTAL plan from the form.", icon: ListChecks },
  { title: "Pay", text: "Scan the QR code and complete payment.", icon: CreditCard },
  { title: "Upload Screenshot", text: "Upload your payment screenshot for checking.", icon: UploadCloud },
  { title: "Wait Approval", text: "Admin verifies payment and adds your activation key.", icon: ShieldCheck },
  { title: "Download APK", text: "Check status and download APK after approval.", icon: Download },
];

export default function BuyPage() {
  return (
    <Suspense fallback={<BuyShell />}>
      <BuyContent />
    </Suspense>
  );
}

function BuyShell() {
  return (
    <main className="shell">
      <SiteNav />
      <section className="section page-title">
        <h1>Buy APK Plan</h1>
        <p className="muted">Complete payment and upload screenshot for verification.</p>
      </section>
      <Footer />
    </main>
  );
}

function BuyContent() {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plan") ?? plans[0].id;
  const [form, setForm] = useState({ customerName: "", whatsappNumber: "", plan: selectedPlan });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const planLabel = useMemo(() => getPlanLabel(form.plan), [form.plan]);

  useEffect(() => {
    setForm((current) => ({ ...current, plan: selectedPlan }));
  }, [selectedPlan]);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    getPaymentSettings()
      .then((settings) => {
        setQrCodeUrl(settings.qrCodeUrl ?? "");
      })
      .catch(() => undefined);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!screenshot) {
      setStatus("Upload your payment screenshot before submitting.");
      return;
    }

    setLoading(true);
    setStatus("");
    try {
      await createOrder({ ...form, screenshot });
      setStatus("Payment submitted. Check order status after admin verification.");
      setForm({ customerName: "", whatsappNumber: "", plan: selectedPlan });
      setScreenshot(null);
      event.currentTarget.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not submit payment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <SiteNav />
      <section className="section page-title">
        <h1>Buy APK Plan</h1>
        <p className="muted">Complete payment and upload screenshot for verification.</p>
      </section>
      <section className="section">
        <div className="form-layout">
          <form className="form-card" onSubmit={handleSubmit}>
            {!isFirebaseConfigured && (
              <p className="notice">Firebase env values are required before live submissions can work.</p>
            )}
            <div className="field">
              <label htmlFor="customerName">Full Name</label>
              <input
                id="customerName"
                required
                value={form.customerName}
                onChange={(event) => setForm({ ...form, customerName: event.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div className="field">
              <label htmlFor="whatsappNumber">WhatsApp Number</label>
              <input
                id="whatsappNumber"
                required
                inputMode="tel"
                value={form.whatsappNumber}
                onChange={(event) => setForm({ ...form, whatsappNumber: event.target.value })}
                placeholder="Enter WhatsApp number"
              />
            </div>
            <div className="field">
              <label htmlFor="plan">Select Plan</label>
              <select
                id="plan"
                value={form.plan}
                onChange={(event) => setForm({ ...form, plan: event.target.value })}
              >
                {plans.map((plan) => (
                  <option value={plan.id} key={plan.id}>
                    {getPlanLabel(plan.id)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="screenshot">Payment Screenshot Upload</label>
              <input
                id="screenshot"
                required
                type="file"
                accept="image/*"
                onChange={(event) => setScreenshot(event.target.files?.[0] ?? null)}
              />
            </div>
            <button className="button" type="submit" disabled={loading || !isFirebaseConfigured}>
              <UploadCloud size={18} />
              {loading ? "Submitting..." : "Submit Payment"}
            </button>
            {status && <p className="notice">{status}</p>}
          </form>

          <aside className="form-card">
            <h2>UPI Payment</h2>
            <p className="muted">{planLabel}</p>
            <div className="qr-box">
              {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="UPI payment QR code" />
              ) : (
                <span className="muted">QR code will appear here after admin upload.</span>
              )}
            </div>
            <p className="notice">
              <CheckCircle2 size={16} /> Complete payment and upload screenshot for verification.
            </p>
          </aside>
        </div>
        <div className="how-to-buy">
          <div className="section-head">
            <div>
              <h2>How To Buy</h2>
              <p className="muted">Follow these steps to get your APK access after payment approval.</p>
            </div>
          </div>
          <div className="buy-steps">
            {buySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article className="buy-step" key={step.title}>
                  <span className="step-number">{index + 1}</span>
                  <Icon size={22} />
                  <div>
                    <h3>{step.title}</h3>
                    <p className="muted">{step.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
