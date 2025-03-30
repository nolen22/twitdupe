import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const threadId = params.id;
    const userId = session.user.id;

    // Check if the user has already liked this thread
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_threadId: {
          userId,
          threadId,
        },
      },
    });

    if (existingLike) {
      // Unlike the thread
      await prisma.$transaction([
        prisma.like.delete({
          where: {
            userId_threadId: {
              userId,
              threadId,
            },
          },
        }),
        prisma.thread.update({
          where: { id: threadId },
          data: {
            likeCount: {
              decrement: 1,
            },
          },
        }),
      ]);

      return NextResponse.json({ liked: false });
    } else {
      // Like the thread
      await prisma.$transaction([
        prisma.like.create({
          data: {
            userId,
            threadId,
          },
        }),
        prisma.thread.update({
          where: { id: threadId },
          data: {
            likeCount: {
              increment: 1,
            },
          },
        }),
      ]);

      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error in like route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 