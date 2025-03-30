'use client';

import { useState } from 'react';

interface ThreadFormProps {
  onThreadCreated: (thread: any) => void;
  username: string;
}

export default function ThreadForm({ onThreadCreated, username }: ThreadFormProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          authorName: username,
          authorImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create thread');
      }

      const newThread = await response.json();
      onThreadCreated(newThread);
      setContent('');
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white text-gray-900 placeholder-gray-500"
          required
        />
      </div>
      <button
        type="submit"
        disabled={!content.trim() || isLoading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
} 