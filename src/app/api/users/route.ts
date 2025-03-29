import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Implement user fetching from database
  return NextResponse.json({
    users: [
      {
        id: '1',
        name: 'John Doe',
        username: 'johndoe',
        bio: 'Software developer and tech enthusiast',
        image: '/default-avatar.png',
        followers: 100,
        following: 50,
        threads: 25,
      },
    ],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: Implement user creation in database
    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: '1',
        ...body,
        followers: 0,
        following: 0,
        threads: 0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 