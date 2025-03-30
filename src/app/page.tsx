import ThreadForm from './components/ThreadForm';
import Thread from './components/Thread';
import prisma from '@/lib/prisma';

async function getThreads() {
  const threads = await prisma.thread.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      childThreads: true,
    },
  });
  return threads;
}

export default async function Home() {
  const threads = await getThreads();

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-4">
        <ThreadForm />
        <div className="space-y-4">
          {threads.map((thread) => (
            <Thread
              key={thread.id}
              {...thread}
              replies={thread.childThreads}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
