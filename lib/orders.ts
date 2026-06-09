import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";
import { getApkDownloadLink, getPlanLabel } from "./plans";

export type OrderStatus = "Pending" | "Approved" | "Rejected";

export type Order = {
  id: string;
  customerName: string;
  whatsappNumber: string;
  plan: string;
  paymentScreenshot: string;
  status: OrderStatus;
  activationKey: string;
  apkDownloadLink: string;
  createdTime?: Timestamp;
};

export type AdminSettings = {
  qrCodeUrl?: string;
  upiId?: string;
};

function requireFirebase() {
  if (!db || !storage) {
    throw new Error("Firebase is not configured. Add your NEXT_PUBLIC_FIREBASE_* values.");
  }

  return { db, storage };
}

async function notifyTelegram(input: {
  customerName: string;
  whatsappNumber: string;
  plan: string;
  paymentScreenshot: string;
}) {
  try {
    await fetch("/api/telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
  } catch (error) {
    console.error("Telegram notification failed:", error);
  }
}

export async function uploadFile(path: string, file: File) {
  const services = requireFirebase();
  const fileRef = ref(services.storage, `${path}/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}

export async function createOrder(input: {
  customerName: string;
  whatsappNumber: string;
  plan: string;
  screenshot: File;
}) {
  const services = requireFirebase();
  const paymentScreenshot = await uploadFile("payment-screenshots", input.screenshot);
  const apkDownloadLink = getApkDownloadLink(input.plan);

  await addDoc(collection(services.db, "orders"), {
    customerName: input.customerName,
    whatsappNumber: input.whatsappNumber,
    plan: input.plan,
    paymentScreenshot,
    status: "Pending",
    activationKey: "",
    apkDownloadLink,
    createdTime: serverTimestamp(),
  });

  await notifyTelegram({
    customerName: input.customerName,
    whatsappNumber: input.whatsappNumber,
    plan: getPlanLabel(input.plan),
    paymentScreenshot,
  });
}

export async function listOrders() {
  const services = requireFirebase();
  const snapshot = await getDocs(query(collection(services.db, "orders"), orderBy("createdTime", "desc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as Order[];
}

export async function findOrdersByPhone(phone: string) {
  const services = requireFirebase();
  const snapshot = await getDocs(
    query(collection(services.db, "orders"), where("whatsappNumber", "==", phone.trim()))
  );
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as Order[];
}

export async function updateOrder(id: string, updates: Partial<Omit<Order, "id" | "createdTime">>) {
  const services = requireFirebase();
  await updateDoc(doc(services.db, "orders", id), updates);
}

export async function deleteOrder(id: string) {
  const services = requireFirebase();
  await deleteDoc(doc(services.db, "orders", id));
}

export async function saveQrCode(file: File) {
  const services = requireFirebase();
  const qrCodeUrl = await uploadFile("admin", file);
  await setDoc(doc(services.db, "settings", "payment"), { qrCodeUrl }, { merge: true });
  return qrCodeUrl;
}

export async function saveUpiId(upiId: string) {
  const services = requireFirebase();
  await setDoc(doc(services.db, "settings", "payment"), { upiId }, { merge: true });
}

export async function getPaymentSettings() {
  const services = requireFirebase();
  const snapshot = await getDoc(doc(services.db, "settings", "payment"));
  return (snapshot.exists() ? snapshot.data() : {}) as AdminSettings;
}
