import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const enquiries = await prisma.contactEnquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const enquiry = await prisma.contactEnquiry.create({
      data: {
        fullName: data.fullName,
        company: data.company,
        email: data.email,
        phone: data.phone,
        opportunityType: data.opportunityType,
        budgetRange: data.budgetRange,
        message: data.message
      }
    });
    return NextResponse.json(enquiry);
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const item = await prisma.contactEnquiry.update({
      where: { id: data.id },
      data: {
        status: data.status,
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

    await prisma.contactEnquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
