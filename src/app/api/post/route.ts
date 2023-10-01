import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const id = request.nextUrl.searchParams.get("id");
  const title = request.nextUrl.searchParams.get("title");

  if (id !== null) return getID(id);
  if (category !== null) return getCategoryPost(category);
  if (title !== null) return getTitle(title);
  if (category === null) return getAllPost();
}

export async function POST(request: Request) {
  try {
    const query = await request.json();
    const data = await prisma.post.create({
      data: {
        description: query.description,
        title: query.title,
        authorId: query.authorId,
        source: query.source,
        category: query.category,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PATCH(request: Request) {
  try {
    const query = await request.json();
    const data = await prisma.post.update({
      where: {
        id: query.id,
      },
      data: {
        title: query.title,
        authorId: query.authorId,
        source: query.source,
        category: query.category,
        description: query.description,
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
    const data = await prisma.post.delete({
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

// get all post
async function getAllPost() {
  const data = await prisma.post.findMany({
    orderBy: {
      createAt: "desc",
    },
    include: {
      author: true,
    },
  });    
  return NextResponse.json(data);
}

// get category post
async function getCategoryPost(category: string | null) {
  const categoryParam: Category = category as Category;
  try {
    const data = await prisma.post.findMany({
      where: {
        category: categoryParam,
      },
      orderBy: {
        createAt: "desc",
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}

// get title function
async function getTitle(title: string | null) {
  try {
    const data = await prisma.post.findFirst({
      where: {
        title: String(title),
      },
      include: {
        pricelist: true,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}

// get id function
async function getID(id: string | null) {
  try {
    const data = await prisma.post.findFirst({
      where: {
        id: String(id),
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}
