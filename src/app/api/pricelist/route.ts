import { prisma } from "@/lib/prisma";
import { Pricelist } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id !== null) return getIdPricelist(id);
  return getAllPricelist();
}

export async function POST(request: Request) {
  try {
    const query: Pricelist = await request.json();
    const data = await prisma.pricelist.create({
      data: {
        title: query.title,
        price: parseInt(query.price.toString()),
        print: parseInt(query.print.toString()),
        size: query.size,
        postId: query.postId,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PATCH(request: Request) {
  try {
    const query: Pricelist = await request.json();
    const data = await prisma.pricelist.update({
      where: {
        id: query.id,
      },
      data: {
        title: query.title,
        price: parseInt(query.price.toString()),
        print: parseInt(query.print.toString()),
        size: query.size,
        postId: query.postId,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const data = await prisma.pricelist.delete({
      where: {
        id: String(id),
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}

// ======================

// get all pricelist
async function getAllPricelist() {
  try {
    const data = await prisma.pricelist.findMany({
      include: {
        post: true,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}

//get id pricelist
async function getIdPricelist(id: string) {
  try {
    const data = await prisma.pricelist.findFirst({
      where: {
        id: String(id),
      },
      include: {
        post: true,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}
