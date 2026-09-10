import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const journeyEvents = await prisma.contentPost.findMany({
      where: { category: "journey" },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(journeyEvents);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch journey" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const event = await prisma.contentPost.create({
      data: {
        title: data.title,
        caption: data.caption,
        platform: "journey",
        category: "journey",
        mediaUrl: data.mediaUrl,
        featured: data.featured ?? false,
      }
    });
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create journey event" }, { status: 500 });
  }
}
