'use client';

import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import ThreadForm from './ThreadForm';
import { generateRandomUsername } from '@/lib/utils';

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
  repostCount,
  replies: initialReplies = [],
}: ThreadProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState<ThreadProps[]>(initialReplies);
  const { user } = useUser();
  const [replyUsername, setReplyUsername] = useState<string>('');
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRepostAnimating, setIsRepostAnimating] = useState(false);

  useEffect(() => {
    // Use the same username from localStorage for replies
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setReplyUsername(storedUsername);
    } else {
      // Generate a new username only if one doesn't exist
      const newUsername = generateRandomUsername();
      setReplyUsername(newUsername);
      localStorage.setItem('username', newUsername);
    }
  }, []);

  const handleReply = async (newThread: ThreadProps) => {
    setReplies(prevReplies => [newThread, ...prevReplies]);
    setShowReplyForm(false);
  };

  const handleLike = async () => {
    if (!replyUsername) return;
    
    setIsAnimating(true);
    try {
      const response = await fetch(`/api/threads/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: replyUsername }),
      });

      if (!response.ok) throw new Error('Failed to like thread');

      const { liked } = await response.json();
      setIsLiked(liked);
      setLikes(prev => liked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Error liking thread:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const handleRepost = () => {
    setIsRepostAnimating(true);
    setTimeout(() => setIsRepostAnimating(false), 1000);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const threadDate = new Date(date);
    const day = threadDate.getDate();
    const time = threadDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${day} ${time}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start space-x-4">
        <img
          src={authorImage}
          alt={authorName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-blue-600">{authorName}</span>
            <span className="text-gray-500 text-sm">
              {formatDate(createdAt)}
            </span>
          </div>
          <p className="mt-2 text-gray-900">{content}</p>
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
            >
              Reply
            </button>
            <button 
              onClick={handleLike}
              className={`text-gray-500 hover:text-red-500 transition-all duration-200 relative group ${isAnimating ? 'scale-125' : ''}`}
            >
              <span className="relative">
                ❤️
                {isLiked && (
                  <span className="absolute inset-0 animate-ping text-red-500 opacity-75">
                    ❤️
                  </span>
                )}
              </span>
              <span className="ml-1">{likes}</span>
            </button>
            <button 
              onClick={handleRepost}
              className={`text-gray-500 hover:text-green-500 transition-all duration-200 ${isRepostAnimating ? 'animate-spin' : ''}`}
            >
              🔄 {repostCount}
            </button>
          </div>
          {showReplyForm && (
            <div className="mt-4">
              <div className="mb-2">
                <p className="text-sm text-gray-600">Replying as: <span className="font-medium text-blue-600">{replyUsername}</span></p>
              </div>
              <ThreadForm onThreadCreated={handleReply} username={replyUsername} />
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