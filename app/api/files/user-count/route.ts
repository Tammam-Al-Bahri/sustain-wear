import { NextResponse } from "next/server";
import { countUsersByRole } from "@/lib/clerk";

export async function GET() {
  const count = await countUsersByRole("donor");
  return NextResponse.json({ count });
}