import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const journeyItems = await prisma.contentPost.findMany({
      where: { platform: "journey" },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(journeyItems);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch journey items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const item = await prisma.contentPost.create({
      data: {
        title: data.title,
        caption: data.caption,
        category: data.category,
        mediaUrl: data.mediaUrl,
        platform: "journey",
        featured: data.featured ?? false,
      }
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create journey item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const item = await prisma.contentPost.update({
      where: { id: data.id },
      data: {
        title: data.title,
        caption: data.caption,
        category: data.category,
        mediaUrl: data.mediaUrl,
        featured: data.featured ?? false,
      }
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

    await prisma.contentPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
