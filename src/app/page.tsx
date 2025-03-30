'use client';

import { useState, useEffect } from 'react';
import ThreadForm from './components/ThreadForm';
import Thread from './components/Thread';

interface ThreadData {
  id: string;
  content: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  likes: number;
  repostCount: number;
  replies: ThreadData[];
}

export default function Home() {
  const [threads, setThreads] = useState<ThreadData[]>([]);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    const response = await fetch('/api/threads');
    const data = await response.json();
    setThreads(data);
  };

  const handleNewThread = (newThread: ThreadData) => {
    setThreads(prevThreads => [newThread, ...prevThreads]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-4">
        <ThreadForm onThreadCreated={handleNewThread} />
        <div className="space-y-4">
          {threads.map((thread) => (
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
