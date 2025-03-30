import ThreadForm from './components/ThreadForm';
import Thread from './components/Thread';
import prisma from '@/lib/prisma';

async function getThreads() {
  const threads = await prisma.thread.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      replies: true,
    },
  }) as any;
  return threads.map((thread: any) => ({
    ...thread,
    likes: thread.likesCount,
    repostCount: thread.repostCount,
    replies: thread.replies.map((reply: any) => ({
      ...reply,
      likes: reply.likesCount,
      repostCount: reply.repostCount,
    }))
  }));
}

export default async function Home() {
  const threads = await getThreads();

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-4">
        <ThreadForm />
        <div className="space-y-4">
          {threads.map((thread: any) => (
            <Thread
              key={thread.id}
              {...thread}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
