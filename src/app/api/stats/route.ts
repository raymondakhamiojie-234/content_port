import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [enquiriesCount, musicCount, contentCount] = await Promise.all([
      prisma.contactEnquiry.count(),
      prisma.song.count(),
      prisma.contentPost.count({ where: { platform: { not: "journey" } } })
    ]);

    return NextResponse.json({
      enquiries: enquiriesCount,
      music: musicCount,
      content: contentCount
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
