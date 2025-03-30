'use client';

import { useState } from 'react';
import { useUser } from '../context/UserContext';

interface ThreadFormProps {
  onThreadCreated?: (thread: any) => void;
}

export default function ThreadForm({ onThreadCreated }: ThreadFormProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

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
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to create thread');
      }

      const newThread = await response.json();
      setContent('');
      onThreadCreated?.(newThread);
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-start space-x-4">
          <img
            src={user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'anonymous'}`}
            alt={user?.name || 'Anonymous'}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500 resize-none"
              disabled={isLoading}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {user?.name || 'Anonymous'}
              </span>
              <button
                type="submit"
                disabled={!content.trim() || isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 