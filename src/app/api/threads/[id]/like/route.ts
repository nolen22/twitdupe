import { NextResponse } from 'next/server';

// In-memory storage for likes (replace with database later)
const likes = new Map<string, Set<string>>();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { userId } = body;
    const threadId = params.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Initialize likes set for this thread if it doesn't exist
    if (!likes.has(threadId)) {
      likes.set(threadId, new Set());
    }

    const threadLikes = likes.get(threadId)!;
    const isLiked = threadLikes.has(userId);

    if (isLiked) {
      threadLikes.delete(userId);
    } else {
      threadLikes.add(userId);
    }

    return NextResponse.json({
      likes: threadLikes.size,
      isLiked: !isLiked,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to like thread' },
      { status: 500 }
    );
  }
} 