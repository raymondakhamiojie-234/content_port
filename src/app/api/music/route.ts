import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const songs = await prisma.song.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(songs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch songs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const song = await prisma.song.create({
      data: {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate ? new Date(data.releaseDate) : null,
        coverUrl: data.coverUrl,
        spotifyUrl: data.spotifyUrl,
        appleUrl: data.appleUrl,
        youtubeUrl: data.youtubeUrl,
        featured: data.featured ?? false,
      }
    });
    return NextResponse.json(song);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create song" }, { status: 500 });
  }
}
