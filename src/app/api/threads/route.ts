import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const threads = await prisma.thread.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        replies: true,
      },
    }) as any;

    return NextResponse.json(
      threads.map((thread: any) => ({
        id: thread.id,
        content: thread.content,
        authorName: thread.authorName,
        authorImage: thread.authorImage,
        createdAt: thread.createdAt,
        likes: thread.likesCount,
        repostCount: thread.repostCount,
        replies: thread.replies.map((reply: any) => ({
          id: reply.id,
          content: reply.content,
          authorName: reply.authorName,
          authorImage: reply.authorImage,
          createdAt: reply.createdAt,
          likes: reply.likesCount,
          repostCount: reply.repostCount,
          replies: [],
        })),
      }))
    );
  } catch (error) {
    console.error('Error fetching threads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch threads' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.name) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const thread = await prisma.thread.create({
      data: {
        content,
        authorId: session.user.name,
        authorName: session.user.name,
        authorImage: session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`,
        likesCount: 0,
        repostCount: 0,
        replyCount: 0,
      },
    }) as any;

    return NextResponse.json({
      id: thread.id,
      content: thread.content,
      authorName: thread.authorName,
      authorImage: thread.authorImage,
      createdAt: thread.createdAt,
      likes: thread.likesCount,
      repostCount: thread.repostCount,
      replies: [],
    });
  } catch (error) {
    console.error('Error creating thread:', error);
    return NextResponse.json(
      { error: 'Failed to create thread' },
      { status: 500 }
    );
  }
} 