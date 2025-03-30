'use client';

import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function ThreadForm() {
  const [content, setContent] = useState('');
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          authorName: user.name,
          authorImage: user.image,
        }),
      });

      if (!response.ok) throw new Error('Failed to create thread');

      setContent('');
      // Trigger a refresh
      window.location.reload();
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-4 mb-4">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Sign in to start a thread
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-4 mb-4">
      <div className="flex gap-3">
        <img
          src={user.image || 'https://via.placeholder.com/40'}
          alt={user.name || 'User'}
          className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-800"
        />
        <div className="flex-1">
          <div className="mb-2">
            <span className="font-medium text-gray-900 dark:text-white">
              {user.name || 'Anonymous'}
            </span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start a thread..."
            className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 resize-none"
            rows={3}
          />
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-800">
            <div className="flex gap-2">
              <button type="button" className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button type="button" className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <button
              type="submit"
              disabled={!content.trim() || isLoading}
              className={`px-4 py-1.5 rounded-full font-medium ${
                content.trim() && !isLoading
                  ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              } transition-colors`}
            >
              {isLoading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
} 