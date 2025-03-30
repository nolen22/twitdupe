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
    const { content } = await request.json();

    if (!content?.trim()) {
      return new NextResponse('Content is required', { status: 400 });
    }

    // Create the reply and update the reply count in a transaction
    const [reply] = await prisma.$transaction([
      prisma.reply.create({
        data: {
          content,
          userId,
          threadId,
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      }),
      prisma.thread.update({
        where: { id: threadId },
        data: {
          replyCount: {
            increment: 1,
          },
        },
      }),
    ]);

    return NextResponse.json(reply);
  } catch (error) {
    console.error('Error in reply route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 