import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { log } = await request.json();
    fs.writeFileSync(path.join(process.cwd(), "theaskt_log.txt"), log, "utf8");
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}

export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), "theaskt_log.txt");
  let fileLog = "No log received yet";
  if (fs.existsSync(filePath)) {
    try {
      fileLog = fs.readFileSync(filePath, "utf8");
    } catch (e) {}
  }
  return new NextResponse(fileLog, {
    headers: { "Content-Type": "text/plain" }
  });
}
