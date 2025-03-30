'use client';

import { useState } from 'react';

export default function ThreadForm() {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement thread creation
    console.log('Creating thread:', content);
    setContent('');
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
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
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
} 