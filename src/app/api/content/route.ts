import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const content = await prisma.contentPost.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const content = await prisma.contentPost.create({
      data: {
        title: data.title,
        caption: data.caption,
        platform: data.platform,
        url: data.url,
        mediaUrl: data.mediaUrl,
        category: data.category,
        featured: data.featured ?? false,
      }
    });
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const item = await prisma.contentPost.update({
      where: { id: data.id },
      data: {
        title: data.title,
        caption: data.caption,
        platform: data.platform,
        url: data.url,
        mediaUrl: data.mediaUrl,
        category: data.category,
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
    const session = await getServerSession();
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
