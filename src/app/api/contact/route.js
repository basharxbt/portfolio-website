import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getDb } from "@/lib/mongodb";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isAdmin(req) {
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const key = process.env.ADMIN_KEY || "";
  if (!key || !token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Visitors send a message
export async function POST(req) {
  try {
    const body = await req.json();

    // Honeypot: real people never fill this hidden field, bots do.
    if (body.website) return NextResponse.json({ ok: true });

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 },
      );
    }
    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: "One of the fields is too long." },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 },
      );
    }

    const db = await getDb();
    await db.collection("messages").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

// You read messages (needs your ADMIN_KEY)
export async function GET(req) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = await getDb();
    const docs = await db
      .collection("messages")
      .find({})
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();

    return NextResponse.json({
      messages: docs.map((d) => ({
        id: d._id.toString(),
        name: d.name,
        email: d.email,
        message: d.message,
        createdAt: d.createdAt,
      })),
    });
  } catch (err) {
    console.error("Contact GET error:", err);
    return NextResponse.json(
      { error: "Could not load messages." },
      { status: 500 },
    );
  }
}
