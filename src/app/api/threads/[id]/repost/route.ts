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

    // Check if the user has already reposted this thread
    const existingRepost = await prisma.repost.findUnique({
      where: {
        userId_threadId: {
          userId,
          threadId,
        },
      },
    });

    if (existingRepost) {
      // Remove the repost
      await prisma.repost.delete({
        where: {
          userId_threadId: {
            userId,
            threadId,
          },
        },
      });

      await prisma.thread.update({
        where: { id: threadId },
        data: {
          reposts: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({ reposted: false });
    } else {
      // Create the repost
      await prisma.repost.create({
        data: {
          userId,
          threadId,
        },
      });

      await prisma.thread.update({
        where: { id: threadId },
        data: {
          reposts: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({ reposted: true });
    }
  } catch (error) {
    console.error('Error in repost route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 