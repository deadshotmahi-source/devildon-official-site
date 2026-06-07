"use client";

import { FormEvent, useState } from "react";
import { Download, Search } from "lucide-react";
import { Footer, SiteNav } from "@/components/SiteNav";
import { isFirebaseConfigured } from "@/lib/firebase";
import { findOrdersByPhone, Order } from "@/lib/orders";
import { getPlanLabel } from "@/lib/plans";

export default function StatusPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const results = await findOrdersByPhone(phone);
      setOrders(results);
      if (!results.length) setMessage("No order found for this phone number.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load order status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <SiteNav />
      <section className="section page-title">
        <h1>Order Status</h1>
        <p className="muted">Enter your WhatsApp number to view payment approval, key, and APK access.</p>
      </section>
      <section className="section">
        <form className="form-card" onSubmit={handleSearch}>
          {!isFirebaseConfigured && <p className="notice">Firebase env values are required before status lookup can work.</p>}
          <div className="field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              required
              inputMode="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter WhatsApp number"
            />
          </div>
          <button className="button" disabled={loading || !isFirebaseConfigured} type="submit">
            <Search size={18} />
            {loading ? "Searching..." : "Search Order"}
          </button>
          {message && <p className="notice">{message}</p>}
        </form>

        <div className="orders" style={{ marginTop: 22 }}>
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="section-head">
                <div>
                  <h2>{getPlanLabel(order.plan)}</h2>
                  <p className="muted">{order.customerName}</p>
                </div>
                <span className={`status-pill status-${order.status}`}>{order.status}</span>
              </div>
              <p>
                <strong>Activation Key:</strong>{" "}
                {order.status === "Approved" && order.activationKey ? order.activationKey : "Available after approval"}
              </p>
              {order.status === "Approved" && order.apkDownloadLink && (
                <a className="button" href={order.apkDownloadLink} target="_blank" rel="noreferrer">
                  <Download size={18} />
                  APK Download
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
