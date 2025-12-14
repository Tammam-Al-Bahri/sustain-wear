export const runtime = "nodejs";

import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  // 1️⃣ Read raw body
  const payload = await req.text();

  // 2️⃣ Await headers (FIX #1)
  const h = await headers();
  const svix_id = h.get("svix-id");
  const svix_timestamp = h.get("svix-timestamp");
  const svix_signature = h.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Missing svix headers");
    return new Response("Bad Request", { status: 400 });
  }

  // 3️⃣ Verify webhook
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const event = wh.verify(payload, {
    "svix-id": svix_id,
    "svix-timestamp": svix_timestamp,
    "svix-signature": svix_signature,
  }) as any;

  console.log("🟢 Webhook received:", event.type);

  // 4️⃣ Handle new user signup
  if (event.type === "user.created") {
    const userId = event.data.id;
    const email = event.data.email_addresses?.[0]?.email_address;

    // 5️⃣ Call clerkClient() (FIX #2)
    const client = await clerkClient();

    await client.users.updateUser(userId, {
      publicMetadata: { role: "donor" },
    });

    // 6️⃣ Sync user to database
    await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        email,
      },
    });

    console.log("🟢 User created & donor role assigned");
  }

  return new Response("OK", { status: 200 });
}
