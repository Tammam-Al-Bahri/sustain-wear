import { pinata } from "@/lib/pinata";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        console.log(file.name);
        const uploadData = await pinata.upload.public.file(file);
        const url = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${uploadData.cid}`;
        return NextResponse.json({ url }, { status: 200 });
    } catch (e) {
        console.log(e);
        NextResponse.json(
            {
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
