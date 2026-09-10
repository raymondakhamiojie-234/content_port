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
