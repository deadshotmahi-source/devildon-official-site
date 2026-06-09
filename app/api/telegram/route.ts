import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      { ok: false, error: "Telegram environment variables are missing." },
      { status: 200 }
    );
  }

  try {
    const body = (await request.json()) as {
      customerName?: string;
      whatsappNumber?: string;
      plan?: string;
      paymentScreenshot?: string;
    };

    const message = [
      "NEW ORDER RECEIVED",
      "",
      `Name: ${body.customerName ?? "N/A"}`,
      `WhatsApp: ${body.whatsappNumber ?? "N/A"}`,
      `Plan: ${body.plan ?? "N/A"}`,
      "",
      "Payment Screenshot Uploaded",
      body.paymentScreenshot ? `Screenshot: ${body.paymentScreenshot}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        disable_web_page_preview: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Telegram API failed:", errorText);
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram notification failed:", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
