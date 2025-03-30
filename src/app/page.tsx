'use client';

import { useState, useEffect } from 'react';
import ThreadForm from './components/ThreadForm';
import Thread from './components/Thread';
import { signIn, useSession } from 'next-auth/react';

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
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    try {
      const result = await signIn('credentials', {
        name: name.trim(),
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      setError('An error occurred while signing in');
      console.error('Sign in error:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-4">
        {status === 'unauthenticated' ? (
          <div className="bg-white rounded-lg shadow p-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Enter your name to sign in
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </form>
          </div>
        ) : (
          <ThreadForm onThreadCreated={handleNewThread} />
        )}
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
