import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

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
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(threads);
  } catch (error) {
    console.error('Error in GET /api/threads:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { content } = await request.json();
    if (!content?.trim()) {
      return new NextResponse('Content is required', { status: 400 });
    }

    const thread = await prisma.thread.create({
      data: {
        content,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(thread);
  } catch (error) {
    console.error('Error in POST /api/threads:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 