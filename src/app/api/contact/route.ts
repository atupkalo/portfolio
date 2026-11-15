const recipient = "t.anatolii@hotmail.com";
const failure = "Your message could not be sent. Please try again later.";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Request not allowed." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Invalid request." }, { status: 415 });
  }
  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return Response.json({ error: "Message is too long." }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    data = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (data.website) return Response.json({ error: "Request not allowed." }, { status: 400 });
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (!name || name.length > 120 || /[\r\n]/.test(name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || phone.length > 40 || !message || message.length > 5000) {
    return Response.json({ error: "Please provide your name, a valid email address, and a message." }, { status: 400 });
  }
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return Response.json({ error: failure }, { status: 503 });
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok) return Response.json({ error: failure }, { status: 502 });
    const sent = await result.json();
    if (!sent.id) return Response.json({ error: failure }, { status: 502 });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: failure }, { status: 502 });
  }
}
