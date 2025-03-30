'use client';

import { useState } from 'react';
import { useUser } from '../context/UserContext';

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

export default function Thread({ thread }: { thread: Thread }) {
  const { user } = useUser();
  const [likes, setLikes] = useState(thread.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/threads/${thread.id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to like thread');
      }

      setLikes(prev => isLiked ? prev - 1 : prev + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error liking thread:', error);
    }
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return past.toLocaleDateString();
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-start space-x-3">
        <img
          src={thread.authorImage}
          alt={thread.authorName}
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-bold text-gray-900">{thread.authorName}</h4>
            <span className="text-gray-500">@{thread.authorName.toLowerCase().replace(/\s+/g, '')}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{timeAgo(thread.createdAt)}</span>
          </div>
          <p className="mt-1 text-gray-900">{thread.content}</p>
          <div className="mt-2 flex items-center space-x-6">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 group">
              <span className="text-xl group-hover:scale-110 transition-transform">💬</span>
              <span className="text-sm">{thread.replies.length}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 group">
              <span className="text-xl group-hover:scale-110 transition-transform">🔄</span>
              <span className="text-sm">0</span>
            </button>
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 group ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                {isLiked ? '❤️' : '🤍'}
              </span>
              <span className="text-sm">{likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 group">
              <span className="text-xl group-hover:scale-110 transition-transform">📤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 