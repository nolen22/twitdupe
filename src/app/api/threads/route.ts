import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const threads = await prisma.thread.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        childThreads: true,
      },
    });

    return NextResponse.json(threads);
  } catch (error) {
    console.error('Error fetching threads:', error);
    return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { content, authorName, authorImage } = await request.json();

    if (!content || !authorName || !authorImage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const thread = await prisma.thread.create({
      data: {
        content,
        authorName,
        authorImage,
        likesCount: 0,
        repostCount: 0,
        replyCount: 0,
      },
    });

    return NextResponse.json(thread);
  } catch (error) {
    console.error('Error creating thread:', error);
    return NextResponse.json(
      { error: 'Failed to create thread' },
      { status: 500 }
    );
  }
} 