'use client';

import { useState, useEffect } from 'react';
import ThreadForm from './components/ThreadForm';
import Thread from './components/Thread';
import { generateRandomUsername } from '@/lib/utils';

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
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    // Check if there's a stored username
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Generate a new username only if one doesn't exist
      const newUsername = generateRandomUsername();
      setUsername(newUsername);
      localStorage.setItem('username', newUsername);
    }
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
        <div className="bg-white rounded-lg shadow p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Posting as: <span className="font-medium text-blue-600">{username}</span></p>
          </div>
          <ThreadForm onThreadCreated={handleNewThread} username={username} />
        </div>
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
