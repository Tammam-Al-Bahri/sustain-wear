import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient as _clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma"; // make sure this path is correct

export async function POST(req: Request) {
  try {
    const payload = await req.text();

    // 2️ Extract Svix headers
    const h = await headers();
    const svix_id = h.get("svix-id");
    const svix_timestamp = h.get("svix-timestamp");
    const svix_signature = h.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("❌ Missing svix headers");
      return new Response("Missing svix headers", { status: 400 });
    }

    // 3️ Verify webhook signature using Clerk secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    let event: any;

    try {
      event = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
      console.log("🟢 Webhook signature verified:", event.type);
    } catch (err) {
      console.error("❌ Invalid webhook signature", err);
      return new Response("Invalid signature", { status: 400 });
    }

    // 4️ Handle user.created event
    if (event.type === "user.created") {
      console.log("🟡 Handling user.created event…");

      const userId = event.data.id;
      const email = event.data.email_addresses?.[0]?.email_address;
      const firstName = event.data.first_name;
      const lastName = event.data.last_name;
      const fullName = `${firstName || ""} ${lastName || ""}`.trim();
      const imageUrl = event.data.image_url;

      console.log("🟢👤 New Clerk user data added:", {
      });

      // 5️ Assign donor role inside Clerk metadata
      const clerkClient = await _clerkClient();

      try {
        await clerkClient.users.updateUser(userId, {
          publicMetadata: { role: "donor" },
        });
        console.log("🟢 Assigned role=donor in Clerk");
      } catch (err) {
        console.error("❌ Failed to update Clerk metadata:", err);
      }

      // 6️⃣ Upsert the user into your Prisma database
      try {
        const dbUser = await prisma.user.upsert({
          where: { clerkId: userId }, // unique
          update: {
            email,
            name: fullName,
            imageUrl,
          },
          create: {
            clerkId: userId,
            email,
            name: fullName,
            imageUrl,
          },
        });

        console.log("🟢 User synced to database:", dbUser);
      } catch (err) {
        console.error("❌ Prisma upsert failed:", err);
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error("❌ Webhook handler crashed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
