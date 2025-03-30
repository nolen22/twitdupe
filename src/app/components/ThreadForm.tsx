'use client';

import { useState } from 'react';

export default function ThreadForm() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError('');

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

      setContent('');
      // Trigger a page refresh to show the new thread
      window.location.reload();
    } catch (err) {
      setError('Failed to create thread. Please try again.');
      console.error('Error creating thread:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-gray-200 p-4">
      <div className="flex space-x-3">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          alt="Your avatar"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
            rows={3}
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
          <div className="mt-2 flex justify-between items-center">
            <div className="flex space-x-4">
              <button type="button" className="text-gray-500 hover:text-blue-500">
                📷 Photo
              </button>
              <button type="button" className="text-gray-500 hover:text-blue-500">
                🎥 Video
              </button>
              <button type="button" className="text-gray-500 hover:text-blue-500">
                📍 Location
              </button>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className={`px-4 py-2 rounded-full ${
                isSubmitting || !content.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
} 