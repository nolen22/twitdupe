'use client';

import { useEffect, useState } from 'react';
import Thread from './Thread';

interface Thread {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: string;
  likes: number;
  replies: Thread[];
}

export default function ThreadList() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch('/api/threads');
        if (!response.ok) {
          throw new Error('Failed to fetch threads');
        }
        const data = await response.json();
        setThreads(data);
      } catch (error) {
        console.error('Error fetching threads:', error);
        setError('Failed to load threads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading threads...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (threads.length === 0) {
    return <div className="p-4 text-center text-gray-500">No threads yet. Be the first to post!</div>;
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  );
} 