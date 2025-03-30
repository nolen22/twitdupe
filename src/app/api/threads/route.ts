import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
  try {
    const threads = await prisma.thread.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(threads);
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
    const { content, authorName, authorImage } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const thread = await prisma.thread.create({
      data: {
        content,
        authorName: authorName || 'Anonymous',
        authorImage: authorImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous`,
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