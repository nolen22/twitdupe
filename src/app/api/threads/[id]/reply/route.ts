import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// In-memory storage for replies (replace with database later)
const replies = new Map<string, any[]>();

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

    // Initialize replies array for this thread if it doesn't exist
    if (!replies.has(threadId)) {
      replies.set(threadId, []);
    }

    const threadReplies = replies.get(threadId)!;
    const newReply = {
      id: Date.now().toString(),
      content,
      authorId: userId,
      authorName: session.user.name,
      authorImage: session.user.image,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    threadReplies.push(newReply);

    // Create the reply in the database
    const reply = await prisma.reply.create({
      data: {
        content,
        userId,
        threadId,
      },
    });

    // Increment the reply count on the thread
    await prisma.thread.update({
      where: { id: threadId },
      data: {
        replies: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(reply);
  } catch (error) {
    console.error('Error in reply route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 