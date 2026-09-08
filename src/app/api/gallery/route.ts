import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const image = await prisma.galleryImage.create({
      data: {
        url: data.url,
        caption: data.caption,
        category: data.category,
        featured: data.featured ?? false,
      }
    });
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create image" }, { status: 500 });
  }
}
