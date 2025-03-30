import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { content, authorName, authorImage } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const reply = await prisma.thread.create({
      data: {
        content,
        authorName: authorName || 'Anonymous',
        authorImage: authorImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous`,
        parentId: params.id,
      },
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