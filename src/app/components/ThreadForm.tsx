'use client';

import { useState } from 'react';
import { useUser } from '../context/UserContext';

interface ThreadFormProps {
  onSubmit?: (content: string) => Promise<void>;
}

export default function ThreadForm({ onSubmit }: ThreadFormProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(content);
        setContent('');
      } else {
        const response = await fetch('/api/threads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content,
            authorName: user?.name || 'Anonymous',
            authorImage: user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous`,
          }),
        });

        if (response.ok) {
          setContent('');
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start space-x-4">
          <img
            src={user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous`}
            alt={user?.name || 'Anonymous'}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
              rows={3}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {user?.name || 'Anonymous'}
              </span>
              <button
                type="submit"
                disabled={!content.trim() || isLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  content.trim() && !isLoading
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
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