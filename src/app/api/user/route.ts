import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {    
    const id = request.nextUrl.searchParams.get("id");
    try {
      const data = await prisma.user.findFirst({
        where: {
          id: String(id),
        },
      });
      return NextResponse.json(data);
    } catch (err) {
      return NextResponse.json(err);
    }
  }