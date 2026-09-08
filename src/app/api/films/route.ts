import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const films = await prisma.filmProject.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(films);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch films" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const film = await prisma.filmProject.create({
      data: {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate ? new Date(data.releaseDate) : null,
        posterUrl: data.posterUrl,
        trailerUrl: data.trailerUrl,
        videoUrl: data.videoUrl,
        credits: data.credits,
        featured: data.featured ?? false,
      }
    });
    return NextResponse.json(film);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create film" }, { status: 500 });
  }
}
