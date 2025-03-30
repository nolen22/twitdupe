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
  reposts: number;
}

export default function Thread({ thread }: { thread: Thread }) {
  const { user } = useUser();
  const [likes, setLikes] = useState(thread.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [reposts, setReposts] = useState(thread.reposts || 0);
  const [isReposted, setIsReposted] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleLike = async () => {
    if (!user) {
      const event = new CustomEvent('showProfileModal');
      window.dispatchEvent(event);
      return;
    }

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

  const handleRepost = async () => {
    if (!user) {
      const event = new CustomEvent('showProfileModal');
      window.dispatchEvent(event);
      return;
    }

    try {
      const response = await fetch(`/api/threads/${thread.id}/repost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to repost thread');
      }

      setReposts(prev => isReposted ? prev - 1 : prev + 1);
      setIsReposted(!isReposted);
    } catch (error) {
      console.error('Error reposting thread:', error);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      const event = new CustomEvent('showProfileModal');
      window.dispatchEvent(event);
      return;
    }

    if (!replyContent.trim()) return;

    try {
      const response = await fetch(`/api/threads/${thread.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: replyContent,
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reply to thread');
      }

      setReplyContent('');
      setShowReplyForm(false);
      // Refresh the page to show the new reply
      window.location.reload();
    } catch (error) {
      console.error('Error replying to thread:', error);
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
            <button 
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">💬</span>
              <span className="text-sm">{thread.replies.length}</span>
            </button>
            <button 
              onClick={handleRepost}
              className={`flex items-center space-x-1 group ${
                isReposted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">🔄</span>
              <span className="text-sm">{reposts}</span>
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

          {showReplyForm && (
            <form onSubmit={handleReply} className="mt-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
                rows={2}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!replyContent.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Reply
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 