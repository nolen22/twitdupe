import { NextResponse } from 'next/server';

// In-memory storage for reposts (replace with database later)
const reposts = new Map<string, Set<string>>();

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

    // Initialize reposts set for this thread if it doesn't exist
    if (!reposts.has(threadId)) {
      reposts.set(threadId, new Set());
    }

    const threadReposts = reposts.get(threadId)!;
    const isReposted = threadReposts.has(userId);

    if (isReposted) {
      threadReposts.delete(userId);
    } else {
      threadReposts.add(userId);
    }

    return NextResponse.json({
      reposts: threadReposts.size,
      isReposted: !isReposted,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to repost thread' },
      { status: 500 }
    );
  }
} 