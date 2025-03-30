import { NextResponse } from 'next/server';

// In-memory storage for replies (replace with database later)
const replies = new Map<string, any[]>();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { content, userId, userName, userAvatar } = body;
    const threadId = params.id;

    if (!content || !userId || !userName || !userAvatar) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
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
      authorName: userName,
      authorImage: userAvatar,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    threadReplies.push(newReply);

    return NextResponse.json(newReply, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reply to thread' },
      { status: 500 }
    );
  }
} 