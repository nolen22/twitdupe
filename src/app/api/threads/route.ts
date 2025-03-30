import { NextResponse } from 'next/server';

// In-memory storage for threads (replace with database later)
let threads = [
  {
    id: '1',
    content: 'This is a sample thread!',
    authorId: '1',
    authorName: 'John Doe',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    createdAt: new Date().toISOString(),
    likes: 0,
    replies: [],
  },
  {
    id: '2',
    content: 'Another sample thread!',
    authorId: '2',
    authorName: 'Jane Smith',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    createdAt: new Date().toISOString(),
    likes: 0,
    replies: [],
  },
];

export async function GET() {
  return NextResponse.json(threads);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const newThread = {
      id: Date.now().toString(),
      content,
      authorId: '1', // Replace with actual user ID from auth
      authorName: 'Current User', // Replace with actual user name
      authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    threads = [newThread, ...threads];
    return NextResponse.json(newThread, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create thread' },
      { status: 500 }
    );
  }
} 