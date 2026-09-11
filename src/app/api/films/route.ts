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

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const item = await prisma.film.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate ? new Date(data.releaseDate) : null,
        coverUrl: data.coverUrl,
        videoUrl: data.videoUrl,
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

    await prisma.film.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
