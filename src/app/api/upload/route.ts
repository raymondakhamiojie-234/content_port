import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import crypto from "crypto";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Whitelist of allowed MIME types and extensions
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "audio/mpeg",
  "audio/wav",
]);

const ALLOWED_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "mp4",
  "webm",
  "mp3",
  "wav",
]);

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB limit

// Helper to verify magic bytes for common media types
function isValidMagicBytes(buffer: Buffer, ext: string): boolean {
  if (buffer.length < 8) return false;

  switch (ext) {
    case "jpg":
    case "jpeg":
      return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case "png":
      return (
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47
      );
    case "gif":
      return (
        buffer[0] === 0x47 &&
        buffer[1] === 0x49 &&
        buffer[2] === 0x46 &&
        buffer[3] === 0x38
      );
    case "webp":
      return (
        buffer.toString("ascii", 0, 4) === "RIFF" &&
        buffer.toString("ascii", 8, 12) === "WEBP"
      );
    case "mp4":
      return buffer.toString("ascii", 4, 8) === "ftyp";
    case "mp3":
      return (
        buffer.toString("ascii", 0, 3) === "ID3" ||
        (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0)
      );
    case "wav":
      return (
        buffer.toString("ascii", 0, 4) === "RIFF" &&
        buffer.toString("ascii", 8, 12) === "WAVE"
      );
    case "webm":
      return (
        buffer[0] === 0x1a &&
        buffer[1] === 0x45 &&
        buffer[2] === 0xdf &&
        buffer[3] === 0xa3
      );
    default:
      return true;
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.formData();
    const file = data.get("file") as unknown as File | null;

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Enforce file size limit
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.` },
        { status: 400 }
      );
    }

    // Validate MIME type
    const mimeType = file.type?.toLowerCase() || "";
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        { error: "Invalid file type. Only standard images, audio, and videos are permitted." },
        { status: 400 }
      );
    }

    // Extract and validate extension
    const originalName = file.name || "";
    const rawExtension = originalName.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXTENSIONS.has(rawExtension)) {
      return NextResponse.json(
        { error: "Invalid file extension." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Verify file content headers match expected format
    if (!isValidMagicBytes(buffer, rawExtension)) {
      return NextResponse.json(
        { error: "Corrupted or spoofed file content detected." },
        { status: 400 }
      );
    }

    // Generate cryptographically unique, safe filename
    const safeUniqueName = `${Date.now()}-${crypto.randomUUID()}.${rawExtension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, safeUniqueName);
    await writeFile(filepath, buffer);

    return NextResponse.json({ url: `/uploads/${safeUniqueName}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to process upload" }, { status: 500 });
  }
}
