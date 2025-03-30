import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    const threadId = params.id;

    // Check if like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        threadId_userId: {
          threadId,
          userId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          threadId_userId: {
            threadId,
            userId,
          },
        },
      });

      await prisma.thread.update({
        where: { id: threadId },
        data: {
          likesCount: {
            decrement: 1,
          },
        },
      });
    } else {
      // Like
      await prisma.like.create({
        data: {
          threadId,
          userId,
        },
      });

      await prisma.thread.update({
        where: { id: threadId },
        data: {
          likesCount: {
            increment: 1,
          },
        },
      });
    }

    const updatedThread = await prisma.thread.findUnique({
      where: { id: threadId },
      include: {
        likes: true,
      },
    });

    return NextResponse.json(updatedThread);
  } catch (error) {
    console.error('Error in like route:', error);
    return NextResponse.json(
      { error: 'Failed to process like' },
      { status: 500 }
    );
  }
} 