import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { SendApi, AccountApi, Configuration } from 'hostinger-mail-api-sdk';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Simple in-memory sliding window rate limiter: max 5 submissions per 15 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 1000).unref();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
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
    // 1. IP Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "anonymous";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many enquiries submitted from this IP. Please wait 15 minutes." },
        { status: 429 }
      );
    }

    const data = await request.json();

    // 2. Honeypot check (reject automated bots filling hidden field)
    if (data._gotcha || data.website) {
      return NextResponse.json({ success: true });
    }

    // 3. Input Validation & Sanitization
    const fullName = typeof data.fullName === "string" ? data.fullName.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";
    const company = typeof data.company === "string" ? data.company.trim().slice(0, 100) : "";
    const phone = typeof data.phone === "string" ? data.phone.trim().slice(0, 30) : "";
    const opportunityType = typeof data.opportunityType === "string" ? data.opportunityType.trim().slice(0, 50) : "Other";
    const budgetRange = typeof data.budgetRange === "string" ? data.budgetRange.trim().slice(0, 50) : "";

    if (!fullName || fullName.length < 2 || fullName.length > 100) {
      return NextResponse.json({ error: "Full name must be between 2 and 100 characters." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > 255 || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!message || message.length < 5 || message.length > 3000) {
      return NextResponse.json({ error: "Message must be between 5 and 3000 characters." }, { status: 400 });
    }

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        fullName,
        company: company || null,
        email,
        phone: phone || null,
        opportunityType,
        budgetRange: budgetRange || null,
        message,
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
            subject: `New Enquiry from ${fullName}`,
            text: `You have received a new contact enquiry on your website.\n\nName: ${fullName}\nCompany: ${company || 'N/A'}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nType: ${opportunityType}\nBudget: ${budgetRange}\n\nMessage:\n${message}\n`,
            displayName: "Queenfineshii Website"
          } as any);
        }
      } catch (mailError) {
        console.error("Failed to send email notification:", mailError);
      }
    }

    return NextResponse.json(enquiry);
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
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
    const session = await getServerSession(authOptions);
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
