'use client';

import { useEffect, useState } from 'react';
import Thread from './Thread';

interface Thread {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  likes: number;
  replies: Thread[];
}

export default function ThreadList() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement thread fetching
    const fetchThreads = async () => {
      try {
        // Simulated data for now
        const mockThreads: Thread[] = [
          {
            id: '1',
            content: 'This is a sample thread!',
            authorId: '1',
            authorName: 'John Doe',
            authorImage: '/default-avatar.png',
            createdAt: new Date(),
            likes: 0,
            replies: [],
          },
          // Add more mock threads as needed
        ];
        setThreads(mockThreads);
      } catch (error) {
        console.error('Error fetching threads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  if (loading) {
    return <div className="p-4">Loading threads...</div>;
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  );
} 