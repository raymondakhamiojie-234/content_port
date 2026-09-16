import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

import { SendApi, AccountApi, Configuration } from 'hostinger-mail-api-sdk';

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

    if (process.env.HOSTINGER_MAIL_API_KEY) {
      try {
        const config = new Configuration({
            accessToken: process.env.HOSTINGER_MAIL_API_KEY
        });
        
        const accountApi = new AccountApi(config);
        const { data: meData } = await accountApi.getCurrentAccount();
        const mailboxes = meData.data?.mailboxes;
        
        if (mailboxes && mailboxes.length > 0) {
          const mailbox = mailboxes[0];
          const sendApi = new SendApi(config);
          
          await sendApi.sendEmail(mailbox.resourceId, {
            to: [process.env.NOTIFICATION_EMAIL || mailbox.address],
            subject: `New Enquiry from ${data.fullName}`,
            text: `You have received a new contact enquiry on your website.\n\nName: ${data.fullName}\nCompany: ${data.company || 'N/A'}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nType: ${data.opportunityType}\nBudget: ${data.budgetRange}\n\nMessage:\n${data.message}\n`,
            displayName: "Queenfineshii Website"
          } as any);
        }
      } catch (mailError) {
        console.error("Failed to send email via Hostinger:", mailError);
      }
    }

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
