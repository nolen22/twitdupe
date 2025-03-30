'use client';

import { useState } from 'react';
import { useUser } from '../context/UserContext';
import ThreadForm from './ThreadForm';

interface ThreadProps {
  id: string;
  content: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  likes: number;
  repostCount: number;
  replies?: ThreadProps[];
  authorId?: string;
  updatedAt?: Date;
}

export default function Thread({
  id,
  content,
  authorName,
  authorImage,
  createdAt,
  likes: initialLikes,
  repostCount: initialRepostCount,
  replies = [],
}: ThreadProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [repostCount, setRepostCount] = useState(initialRepostCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { user } = useUser();

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/threads/${id}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error('Error liking thread:', error);
    }
  };

  const handleRepost = async () => {
    try {
      const response = await fetch(`/api/threads/${id}/repost`, {
        method: 'POST',
      });
      if (response.ok) {
        setRepostCount(prev => isReposted ? prev - 1 : prev + 1);
        setIsReposted(!isReposted);
      }
    } catch (error) {
      console.error('Error reposting thread:', error);
    }
  };

  const handleReply = async (replyContent: string) => {
    try {
      const response = await fetch(`/api/threads/${id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: replyContent,
          authorName: user?.name || 'Anonymous',
          authorImage: user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous`,
        }),
      });
      if (response.ok) {
        const newReply = await response.json();
        replies.push(newReply);
        setShowReplyForm(false);
      }
    } catch (error) {
      console.error('Error replying to thread:', error);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex gap-3">
        <img
          src={authorImage}
          alt={authorName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{authorName}</span>
            <span className="text-gray-500 text-sm">
              {formatTimeAgo(new Date(createdAt))}
            </span>
          </div>
          <p className="mt-1">{content}</p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors ${
                isLiked ? 'text-red-500' : ''
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={isLiked ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likes}</span>
            </button>
            <button
              onClick={handleRepost}
              className={`flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors ${
                isReposted ? 'text-green-500' : ''
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={isReposted ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span>{repostCount}</span>
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>{replies.length}</span>
            </button>
          </div>
          {showReplyForm && (
            <div className="mt-4">
              <ThreadForm onSubmit={handleReply} />
            </div>
          )}
          {replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {replies.map((reply) => (
                <Thread
                  key={reply.id}
                  {...reply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 