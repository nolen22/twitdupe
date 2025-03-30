'use client';

import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { formatDistanceToNow } from 'date-fns';

interface Thread {
  id: string;
  content: string;
  authorName: string;
  authorImage: string;
  createdAt: string;
  likes: number;
  replies: number;
  reposts: number;
  isLiked?: boolean;
  isReposted?: boolean;
}

export default function ThreadList() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const response = await fetch('/api/threads');
      if (!response.ok) throw new Error('Failed to fetch threads');
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (threadId: string) => {
    if (!user) {
      const event = new CustomEvent('showProfileModal');
      window.dispatchEvent(event);
      return;
    }

    try {
      const response = await fetch(`/api/threads/${threadId}/like`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to like thread');
      
      setThreads(threads.map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            likes: thread.isLiked ? thread.likes - 1 : thread.likes + 1,
            isLiked: !thread.isLiked,
          };
        }
        return thread;
      }));
    } catch (error) {
      console.error('Error liking thread:', error);
    }
  };

  const handleRepost = async (threadId: string) => {
    if (!user) {
      const event = new CustomEvent('showProfileModal');
      window.dispatchEvent(event);
      return;
    }

    try {
      const response = await fetch(`/api/threads/${threadId}/repost`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to repost thread');
      
      setThreads(threads.map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            reposts: thread.isReposted ? thread.reposts - 1 : thread.reposts + 1,
            isReposted: !thread.isReposted,
          };
        }
        return thread;
      }));
    } catch (error) {
      console.error('Error reposting thread:', error);
    }
  };

  const handleReply = async (threadId: string) => {
    if (!user) {
      const event = new CustomEvent('showProfileModal');
      window.dispatchEvent(event);
      return;
    }
    setReplyingTo(threadId);
  };

  const submitReply = async (threadId: string) => {
    if (!replyContent.trim()) return;

    try {
      const response = await fetch(`/api/threads/${threadId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: replyContent }),
      });
      if (!response.ok) throw new Error('Failed to reply to thread');
      
      setThreads(threads.map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            replies: thread.replies + 1,
          };
        }
        return thread;
      }));
      
      setReplyContent('');
      setReplyingTo(null);
      await fetchThreads(); // Refresh the thread list to show the new reply
    } catch (error) {
      console.error('Error replying to thread:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-4 animate-pulse">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <article key={thread.id} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-4">
          <div className="flex gap-3">
            <img
              src={thread.authorImage}
              alt={thread.authorName}
              className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-800"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900 dark:text-white">{thread.authorName}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-gray-900 dark:text-white mb-3">{thread.content}</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleLike(thread.id)}
                  className={`group flex items-center gap-1 transition-colors ${
                    thread.isLiked 
                      ? 'text-red-500' 
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill={thread.isLiked ? "currentColor" : "none"} stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-sm">{thread.likes}</span>
                </button>
                <button 
                  onClick={() => handleReply(thread.id)}
                  className="group flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-sm">{thread.replies}</span>
                </button>
                <button 
                  onClick={() => handleRepost(thread.id)}
                  className={`group flex items-center gap-1 transition-colors ${
                    thread.isReposted 
                      ? 'text-green-500' 
                      : 'text-gray-500 hover:text-green-500'
                  }`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span className="text-sm">{thread.reposts}</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
              </div>
              {replyingTo === thread.id && (
                <div className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-4">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 resize-none"
                    rows={2}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="px-4 py-1.5 rounded-full font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => submitReply(thread.id)}
                      disabled={!replyContent.trim()}
                      className={`px-4 py-1.5 rounded-full font-medium ${
                        replyContent.trim()
                          ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      } transition-colors`}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
} 