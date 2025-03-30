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

    // Check if repost already exists
    const existingRepost = await prisma.repost.findUnique({
      where: {
        threadId_userId: {
          threadId,
          userId,
        },
      },
    });

    if (existingRepost) {
      // Unrepost
      await prisma.repost.delete({
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
          repostCount: {
            decrement: 1,
          },
        },
      });
    } else {
      // Repost
      await prisma.repost.create({
        data: {
          threadId,
          userId,
        },
      });

      await prisma.thread.update({
        where: { id: threadId },
        data: {
          repostCount: {
            increment: 1,
          },
        },
      });
    }

    const updatedThread = await prisma.thread.findUnique({
      where: { id: threadId },
      include: {
        reposts: true,
      },
    });

    return NextResponse.json(updatedThread);
  } catch (error) {
    console.error('Error in repost route:', error);
    return NextResponse.json(
      { error: 'Failed to process repost' },
      { status: 500 }
    );
  }
} 