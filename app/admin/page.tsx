"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, KeyRound, RefreshCw, ShieldCheck, Sparkles, Trash2, UploadCloud, X } from "lucide-react";
import { Footer, SiteNav } from "@/components/SiteNav";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  deleteOrder,
  getPaymentSettings,
  listOrders,
  Order,
  OrderStatus,
  saveQrCode,
  saveUpiId,
  updateOrder,
} from "@/lib/orders";
import { getApkDownloadLink, getPlanLabel } from "@/lib/plans";

const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "change-this-password";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [upiId, setUpiId] = useState("");

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesPhone = !term || order.whatsappNumber.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      return matchesPhone && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const orderStats = useMemo(
    () => ({
      all: orders.length,
      pending: orders.filter((order) => order.status === "Pending").length,
      approved: orders.filter((order) => order.status === "Approved").length,
      rejected: orders.filter((order) => order.status === "Rejected").length,
    }),
    [orders]
  );

  useEffect(() => {
    if (!loggedIn || !isFirebaseConfigured) return;
    refreshOrders();
    getPaymentSettings()
      .then((settings) => {
        setQrCodeUrl(settings.qrCodeUrl ?? "");
        setUpiId(settings.upiId ?? "");
      })
      .catch(() => undefined);
  }, [loggedIn]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === adminPassword) {
      setLoggedIn(true);
      setMessage("");
    } else {
      setMessage("Incorrect admin password.");
    }
  }

  async function refreshOrders() {
    setLoading(true);
    try {
      setOrders(await listOrders());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }

  async function saveOrder(order: Order, updates: Partial<Order>) {
    setMessage("");
    try {
      const permanentApkLink = getApkDownloadLink(order.plan);
      const nextUpdates = {
        ...updates,
        apkDownloadLink: permanentApkLink || updates.apkDownloadLink || order.apkDownloadLink,
      };
      await updateOrder(order.id, nextUpdates);
      setOrders((current) => current.map((item) => (item.id === order.id ? { ...item, ...nextUpdates } : item)));
      setMessage("Order updated.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update order.");
    }
  }

  async function removeOrder(order: Order) {
    if (!confirm(`Delete order for ${order.customerName}?`)) return;
    try {
      await deleteOrder(order.id);
      setOrders((current) => current.filter((item) => item.id !== order.id));
      setMessage("Order deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete order.");
    }
  }

  async function handleQrUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const url = qrFile ? await saveQrCode(qrFile) : qrCodeUrl;
      await saveUpiId(upiId);
      setQrCodeUrl(url);
      setMessage("Payment settings saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save payment settings.");
    } finally {
      setLoading(false);
    }
  }

  if (!loggedIn) {
    return (
      <main className="shell">
        <SiteNav />
        <section className="admin-hero">
          <div className="section admin-hero-inner">
            <p className="admin-kicker">Secure control room</p>
            <h1>Admin Login</h1>
            <p>Password protected dashboard for payment approvals and activation delivery.</p>
          </div>
        </section>
        <section className="section admin-surface">
          <form className="form-card admin-login-card" onSubmit={handleLogin}>
            <div className="admin-card-title">
              <ShieldCheck size={24} />
              <div>
                <h2>Access Dashboard</h2>
                <p className="muted">Enter admin password to continue.</p>
              </div>
            </div>
            <div className="field">
              <label htmlFor="password">Admin Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
              />
            </div>
            <button className="button" type="submit">
              Login
            </button>
            {message && <p className="notice">{message}</p>}
          </form>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="shell">
      <SiteNav />
      <section className="admin-hero">
        <div className="section admin-hero-inner">
          <p className="admin-kicker">DEVIL DON OFFICIAL</p>
          <h1>Admin Dashboard</h1>
          <p>Approve payments, add keys, control APK access, and manage customer orders.</p>
          <a className="admin-vip-key-link" href="https://ragekey.shop/" target="_blank" rel="noreferrer">
            <Sparkles size={18} />
            VIP KEY GENERATOR
          </a>
        </div>
      </section>
      <section className="section admin-surface">
        {!isFirebaseConfigured && <p className="notice">Firebase env values are required before admin actions can work.</p>}
        <div className="admin-stats">
          <button className={`admin-stat ${statusFilter === "All" ? "active" : ""}`} type="button" onClick={() => setStatusFilter("All")}>
            <span>Total Orders</span>
            <strong>{orderStats.all}</strong>
          </button>
          <button className={`admin-stat pending ${statusFilter === "Pending" ? "active" : ""}`} type="button" onClick={() => setStatusFilter("Pending")}>
            <span>Pending</span>
            <strong>{orderStats.pending}</strong>
          </button>
          <button className={`admin-stat approved ${statusFilter === "Approved" ? "active" : ""}`} type="button" onClick={() => setStatusFilter("Approved")}>
            <span>Approved</span>
            <strong>{orderStats.approved}</strong>
          </button>
          <button className={`admin-stat rejected ${statusFilter === "Rejected" ? "active" : ""}`} type="button" onClick={() => setStatusFilter("Rejected")}>
            <span>Rejected</span>
            <strong>{orderStats.rejected}</strong>
          </button>
        </div>
        <div className="admin-row">
          <form className="form-card admin-panel" onSubmit={handleQrUpload}>
            <div className="admin-card-title">
              <UploadCloud size={22} />
              <div>
                <h2>Payment Settings</h2>
                <p className="muted">Update QR and admin payment details.</p>
              </div>
            </div>
            <div className="field">
              <label htmlFor="upiId">UPI ID</label>
              <input id="upiId" value={upiId} onChange={(event) => setUpiId(event.target.value)} placeholder="yourupi@bank" />
            </div>
            <div className="field">
              <label htmlFor="qr">QR Code Image Upload</label>
              <input id="qr" type="file" accept="image/*" onChange={(event) => setQrFile(event.target.files?.[0] ?? null)} />
            </div>
            <button className="button" type="submit" disabled={loading || !isFirebaseConfigured}>
              <UploadCloud size={18} />
              Save QR
            </button>
            {qrCodeUrl && (
              <div className="qr-box" style={{ marginTop: 14, minHeight: 180 }}>
                <img src={qrCodeUrl} alt="Current UPI QR" />
              </div>
            )}
          </form>
          <div className="form-card admin-panel admin-search-panel">
            <div className="admin-card-title">
              <RefreshCw size={22} />
              <div>
                <h2>Search</h2>
                <p className="muted">Find customer orders quickly.</p>
              </div>
            </div>
            <div className="field">
              <label htmlFor="search">Customer Phone Number</label>
              <input id="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search phone" />
            </div>
            <p className="admin-filter-note">
              Showing <strong>{filteredOrders.length}</strong> order{filteredOrders.length === 1 ? "" : "s"}.
            </p>
            <button className="button secondary" type="button" onClick={refreshOrders} disabled={loading || !isFirebaseConfigured}>
              <RefreshCw size={18} />
              Refresh
            </button>
            {message && <p className="notice">{message}</p>}
          </div>
        </div>

        <div className="orders admin-orders">
          {filteredOrders.map((order) => (
            <OrderEditor key={order.id} order={order} onSave={saveOrder} onDelete={removeOrder} />
          ))}
          {!filteredOrders.length && <p className="notice">{loading ? "Loading orders..." : "No orders found."}</p>}
        </div>
      </section>
      <Footer />
    </main>
  );
}

function OrderEditor({
  order,
  onSave,
  onDelete,
}: {
  order: Order;
  onSave: (order: Order, updates: Partial<Order>) => Promise<void>;
  onDelete: (order: Order) => Promise<void>;
}) {
  const [draft, setDraft] = useState(order);
  const statuses: OrderStatus[] = ["Pending", "Approved", "Rejected"];

  useEffect(() => setDraft(order), [order]);
  const permanentApkLink = getApkDownloadLink(draft.plan) || draft.apkDownloadLink;

  return (
    <article className="order-card admin-order-card">
      <div className="section-head">
        <div>
          <h2>{draft.customerName}</h2>
          <p className="muted">{draft.whatsappNumber}</p>
        </div>
        <span className={`status-pill status-${draft.status}`}>{draft.status}</span>
      </div>
      <div className="admin-order-meta">
        <span>
          <strong>Plan:</strong> {getPlanLabel(draft.plan)}
        </span>
        <a className="screenshot-link" href={draft.paymentScreenshot} target="_blank" rel="noreferrer">
          View payment screenshot
        </a>
      </div>
      <div className="grid two">
        <div className="field">
          <label>Status</label>
          <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as OrderStatus })}>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Activation Key</label>
          <input value={draft.activationKey} onChange={(event) => setDraft({ ...draft, activationKey: event.target.value })} />
        </div>
      </div>
      <div className="field">
        <label>Permanent APK Download Link</label>
        <input value={permanentApkLink} readOnly />
      </div>
      <div className="admin-actions">
        <button className="button" type="button" onClick={() => onSave(order, { ...draft, apkDownloadLink: permanentApkLink })}>
          <KeyRound size={18} />
          Save
        </button>
        <button className="button secondary" type="button" onClick={() => onSave(order, { status: "Approved", apkDownloadLink: permanentApkLink })}>
          <Check size={18} />
          Approve
        </button>
        <button className="button reject" type="button" onClick={() => onSave(order, { status: "Rejected" })}>
          <X size={18} />
          Reject
        </button>
        <button className="button danger" type="button" onClick={() => onDelete(order)}>
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </article>
  );
}
