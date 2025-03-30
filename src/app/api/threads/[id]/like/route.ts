import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { username } = await request.json();
    const threadId = params.id;

    // First, ensure the user exists
    const user = await prisma.user.upsert({
      where: { name: username },
      update: {},
      create: {
        name: username,
        email: `${username}@example.com`, // Temporary email for the user
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`,
      },
    });

    // Check if user has already liked the thread
    const existingLike = await prisma.like.findFirst({
      where: {
        threadId,
        userId: user.id,
      },
    });

    if (existingLike) {
      // Remove the like
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      await prisma.thread.update({
        where: { id: threadId },
        data: { likesCount: { decrement: 1 } },
      });
      return NextResponse.json({ liked: false });
    } else {
      // Add the like
      await prisma.like.create({
        data: {
          threadId,
          userId: user.id,
        },
      });
      await prisma.thread.update({
        where: { id: threadId },
        data: { likesCount: { increment: 1 } },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error handling like:', error);
    return NextResponse.json(
      { error: 'Failed to handle like' },
      { status: 500 }
    );
  }
} 