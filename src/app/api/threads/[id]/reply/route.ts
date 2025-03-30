import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const reply = await prisma.thread.create({
      data: {
        content,
        authorId: session.user.name,
        parentId: params.id,
      } as any, // Type assertion to bypass type checking temporarily
    });

    return NextResponse.json(reply);
  } catch (error) {
    console.error('Error replying to thread:', error);
    return NextResponse.json(
      { error: 'Failed to reply to thread' },
      { status: 500 }
    );
  }
} 