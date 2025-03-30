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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex items-start space-x-3">
        <img
          src={thread.authorImage}
          alt={thread.authorName}
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-bold text-gray-900">{thread.authorName}</h4>
            <span className="text-gray-500 text-sm">
              {new Date(thread.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-1 text-gray-800">{thread.content}</p>
          <div className="mt-2 flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span>{likes}</span>
            </button>
            <button className="text-gray-500 hover:text-blue-500 flex items-center space-x-1">
              <span>💬</span>
              <span>{thread.replies.length}</span>
            </button>
            <button className="text-gray-500 hover:text-green-500">
              🔄 Repost
            </button>
            <button className="text-gray-500 hover:text-blue-500">
              📤 Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 